import ScoreCalculator from '@/lib/utils/scoreCalculator.js';
import { QUIZ_STATUS } from '../../constants/quiz.js';
import Contest from '../../models/Contest.js';
import QuizRegistration from '../../models/QuizRegistration.js';
import Voucher from '../../models/Voucher.js';
import logger from '../../utils/logger.js';
import { BaseAPI } from './BaseAPI.js';
import { seconds_per_minute } from './constant.js';

// In-memory lock to prevent concurrent leaderboard calculations
const leaderboardLocks = new Map();

// Dynamic timeout based on participant count with reasonable limits
const calculateLockTimeout = (participantCount = 100) => {
  const baseTime = 60000; // 1 minute minimum
  const perUserTime = 50; // 50ms per user
  const maxTime = 600000; // 10 minutes maximum

  return Math.min(baseTime + participantCount * perUserTime, maxTime);
};

/**
 * API class for handling leaderboard operations
 *
 * This class provides methods for:
 * - Fetching leaderboard data for a specific contest
 * - Handling unsupported operations (POST, PUT, DELETE)
 *
 * @class LeaderboardAPI
 * @extends BaseAPI
 */
export class LeaderboardAPI extends BaseAPI {
  static modelName = 'leaderboard';
  // Required fields for leaderboard
  static requiredFields = ['contest_id'];

  /**
   * Override sendSuccessResponse to use prepareResponseData
   */
  sendSuccessResponse(
    data = {},
    message = 'Success',
    status = null,
    keyName = false,
    metadata = null
  ) {
    const preparedData = data; // prepareResponseData is called separately
    return super.sendSuccessResponse(
      preparedData,
      message,
      status,
      keyName,
      metadata
    );
  }

  // All allowed fields for leaderboard
  static allowedFields = [
    'contest_id',
    'user_id',
    'score',
    'time_taken',
    'reward',
    'name',
    'email',
  ];

  /**
   * Prepares leaderboard data by calculating ranks and rewards
   * @param {Array} registrations - Array of quiz registrations
   * @param {Map} userMap - Map of user details
   * @param {Object} contest - Contest details
   * @returns {Array} Prepared leaderboard data
   */
  static prepareResponseData(leaderboardData, contest) {
    return leaderboardData.map(item => ({
      registration_id: item.registration_id,
      user_id: item.user_id,
      user_name: item.user_name,
      user_email: item.user_email,
      user_image: item.user_image,
      percentage_score: item.percentage_score,
      score: item.score,
      rank: item.rank,
      time_taken: item.time_taken,
      has_reward:
        item.rank && item.rank <= Math.floor(leaderboardData.length * 0.4),
      reward:
        item.rank && item.rank <= Math.floor(leaderboardData.length * 0.4)
          ? parseFloat(contest.reward || 0)
          : 0,
    }));
  }

  /**
   * Validates the request parameters for leaderboard
   * @param {Object} params - Request parameters to validate
   * @throws {ValidationError} If validation fails
   */
  validateRequest(params) {
    this.validateRequiredFields(params, LeaderboardAPI.requiredFields);
  }

  static async allocateRewardsForLeaderboard(
    sorted_quiz_registrations,
    reward_amount
  ) {
    const rewarded_count =
      sorted_quiz_registrations.length >= 2
        ? Math.floor(sorted_quiz_registrations.length * 0.4)
        : 0;
    const winners = sorted_quiz_registrations
      .slice(0, rewarded_count)
      .filter(reg => reg.id);

    const available_vouchers = await Voucher.get_all(
      {
        amount: reward_amount,
        status: 'available',
      },
      {
        orderBy: 'created_at',
        orderDirection: 'ASC',
        limit: rewarded_count,
      }
    );

    if (available_vouchers.length < winners.length) {
      throw new Error('Not enough vouchers available');
    }

    // Use batch update for vouchers to prevent race conditions
    const voucherUpdates = winners.map((winner, index) => ({
      id: available_vouchers[index].id,
      data: {
        registration_id: winner.id,
        status: 'claimed',
        claimed_at: new Date().toISOString(),
      },
    }));

    logger.info('Starting voucher allocation', {
      contestId: sorted_quiz_registrations[0]?.contest_id,
      winnersCount: winners.length,
      voucherUpdates: voucherUpdates.length,
      rewardAmount: reward_amount
    });

    // Use batchUpdate method - vouchers must use their own model
    await Voucher.batchUpdate(voucherUpdates);

    logger.info('Voucher allocation completed successfully', {
      contestId: sorted_quiz_registrations[0]?.contest_id,
      allocatedVouchers: voucherUpdates.length,
      rewardAmount: reward_amount
    });
  }

  static async calculateRanksForLeaderboard(
    quiz_registrations,
    TransactionModel = null
  ) {
    // Validate all scores before sorting - throw error if any are invalid
    for (const reg of quiz_registrations) {
      if (reg.score === null || reg.score === undefined || isNaN(reg.score)) {
        logger.error('Invalid score found during ranking calculation', {
          registrationId: reg.id,
          score: reg.score,
          contestId: reg.contest_id,
        });
        throw new Error(
          `Registration ${reg.id} has invalid score: ${reg.score}`
        );
      }
    }

    // Sort registrations by score and time
    let sorted_quiz_registrations = [...quiz_registrations].sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Descending order
      }
      return a.time_taken - b.time_taken; // Ascending order
    });

    // Prepare batch update data for atomic rank assignment
    const updates = sorted_quiz_registrations.map(
      (quiz_registration, index) => ({
        id: quiz_registration.id,
        data: { contest_rank: index + 1 },
      })
    );

    // Use batchUpdate method within transaction
    const Model = TransactionModel || QuizRegistration;
    logger.info('Starting batch rank update', {
      contestId: quiz_registrations[0]?.contest_id,
      updateCount: updates.length
    });

    await Model.batchUpdate(updates);

    logger.info('Batch rank update completed successfully', {
      contestId: quiz_registrations[0]?.contest_id,
      updatedCount: updates.length
    });

    return sorted_quiz_registrations;
  }

  static async calculateScoreForLeaderboard(
    quiz_registrations,
    duration,
    TransactionModel = null
  ) {
    // Calculate scores for all registrations first
    const scoreUpdates = [];

    for (const quiz_registration of quiz_registrations) {
      try {
        const scoreAnalytics = await ScoreCalculator.calculateScore(
          quiz_registration.answers,
          quiz_registration.contest_id
        );
        logger.debug('Score calculation completed', {
          registrationId: quiz_registration.id,
          score: scoreAnalytics.score,
          contestId: quiz_registration.contest_id,
        });

        scoreUpdates.push({
          id: quiz_registration.id,
          data: {
            score: scoreAnalytics.score,
            analytics_summary: scoreAnalytics.analytics_summary,
            status: QUIZ_STATUS.COMPLETED,
            time_taken: Math.min(
              quiz_registration.time_taken || duration,
              duration
            ),
          },
        });
      } catch (error) {
        logger.error('Score calculation failed', {
          registrationId: quiz_registration.id,
          contestId: quiz_registration.contest_id,
          error: error.message,
          stack: error.stack,
        });
        // Use default score of 0 if calculation fails
        scoreUpdates.push({
          id: quiz_registration.id,
          data: {
            score: 0,
            analytics_summary: { error: 'Score calculation failed' },
            status: QUIZ_STATUS.COMPLETED,
            time_taken: Math.min(
              quiz_registration.time_taken || duration,
              duration
            ),
          },
        });
      }
    }

    // Batch update all scores atomically
    const Model = TransactionModel || QuizRegistration;
    logger.info('Starting batch score update', {
      contestId: quiz_registrations[0]?.contest_id,
      updateCount: scoreUpdates.length
    });

    await Model.batchUpdate(scoreUpdates);

    logger.info('Batch score update completed successfully', {
      contestId: quiz_registrations[0]?.contest_id,
      updatedCount: scoreUpdates.length
    });
  }

  /**
   * Pure calculation method - performs the actual leaderboard calculation
   * @param {string} contest_id - Contest ID
   * @param {Array} live_contest_statuses - Valid contest statuses
   * @param {number} duration - Contest duration in seconds
   * @param {Object} contest - Contest object
   * @returns {Promise<void>}
   */
  static async performLeaderboardCalculation(
    contest_id,
    live_contest_statuses,
    duration,
    contest
  ) {
    // Pre-check: Verify sufficient vouchers are available before processing
    const participant_count = await QuizRegistration.count({
      contest_id: contest_id,
      status: live_contest_statuses,
    });

    if (participant_count === 0) {
      return; // No participants, nothing to process
    }

    // Calculate required vouchers (40% of participants, minimum 2 participants needed)
    const required_vouchers =
      participant_count >= 2 ? Math.floor(participant_count * 0.4) : 0;

    if (required_vouchers > 0) {
      // Check available vouchers before starting transaction
      const available_vouchers = await Voucher.count({
        amount: contest.reward,
        status: 'available',
      });

      if (available_vouchers < required_vouchers) {
        console.warn(
          `Insufficient vouchers for contest ${contest_id}: need ${required_vouchers}, have ${available_vouchers}`
        );
        throw new Error(
          `Not enough vouchers available. Required: ${required_vouchers}, Available: ${available_vouchers}`
        );
      }
    }

    await QuizRegistration.transaction(async TransactionModel => {
      let quiz_registrations = await TransactionModel.get_all({
        contest_id: contest_id,
        status: live_contest_statuses,
      });

      logger.info(
        'quiz_registrations before score calculation',
        quiz_registrations
      );

      await LeaderboardAPI.calculateScoreForLeaderboard(
        quiz_registrations,
        duration,
        TransactionModel
      );

      // Refetch from database after score calculation
      logger.debug('Refetching registrations after score calculation');
      quiz_registrations = await TransactionModel.get_all({
        contest_id: contest_id,
        status: live_contest_statuses,
      });
      logger.debug('Score refetch completed', {
        contestId: contest_id,
        count: quiz_registrations.length
      });

      await LeaderboardAPI.calculateRanksForLeaderboard(
        quiz_registrations,
        TransactionModel
      );

      // Refetch from database after rank calculation
      logger.debug('Refetching registrations after rank calculation');
      quiz_registrations = await TransactionModel.get_all({
        contest_id: contest_id,
        status: live_contest_statuses,
      });
      logger.debug('Rank refetch completed', {
        contestId: contest_id,
        count: quiz_registrations.length
      });

      logger.info(
        'quiz_registrations after ranks calculation',
        quiz_registrations
      );

      await LeaderboardAPI.allocateRewardsForLeaderboard(
        quiz_registrations,
        contest.reward
      );
    });
  }

  /**
   * Handles concurrent calculation with locking mechanism
   * @param {string} contest_id - Contest ID
   * @param {Array} live_contest_statuses - Valid contest statuses
   * @param {number} duration - Contest duration in seconds
   * @param {Object} contest - Contest object
   * @param {number} participantCount - Number of participants for timeout calculation
   * @returns {Promise<void>}
   */
  static async handleConcurrentCalculation(
    contest_id,
    live_contest_statuses,
    duration,
    contest,
    participantCount
  ) {
    // Check if calculation is already in progress for this contest
    if (leaderboardLocks.has(contest_id)) {
      // Another user is calculating - wait with timeout
      const timeout = calculateLockTimeout(participantCount);

      try {
        await Promise.race([
          leaderboardLocks.get(contest_id),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Lock timeout')), timeout)
          ),
        ]);
      } catch (error) {
        // If timeout or lock fails, remove stale lock and proceed
        console.error(`Lock timeout for contest ${contest_id}:`, error);
        leaderboardLocks.delete(contest_id);
        throw new Error('Leaderboard calculation timeout - please try again');
      }
    } else {
      // This user will perform the calculation - set lock first
      const lockPromise = (async () => {
        // Double-check: ranks might have been calculated while waiting for lock
        const recheck = await QuizRegistration.getLeaderboardWithUsers(
          contest_id,
          { statuses: live_contest_statuses }
        );

        if (
          recheck.some(item => item.rank === null || item.rank === undefined)
        ) {
          // Still need calculation - proceed with transaction
          await LeaderboardAPI.performLeaderboardCalculation(
            contest_id,
            live_contest_statuses,
            duration,
            contest
          );
        }
      })();

      leaderboardLocks.set(contest_id, lockPromise);

      try {
        // Apply timeout to the calculation itself
        const timeout = calculateLockTimeout(participantCount);
        await Promise.race([
          lockPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Calculation timeout')), timeout)
          ),
        ]);
      } catch (error) {
        console.error(`Calculation timeout for contest ${contest_id}:`, error);
        throw new Error('Leaderboard calculation failed - please try again');
      } finally {
        leaderboardLocks.delete(contest_id);
      }
    }
  }

  /**
   * Gets leaderboard data for a contest
   * @param {string} contest_id - Contest ID
   * @returns {Promise<Object>} Leaderboard data and contest info
   */
  static async getLeaderboardData(contest_id) {
    const live_contest_statuses = [
      QUIZ_STATUS.COMPLETED,
      QUIZ_STATUS.STARTED,
      QUIZ_STATUS.REGISTERED,
    ];

    return await QuizRegistration.getLeaderboardWithUsers(contest_id, {
      statuses: live_contest_statuses,
    });
  }

  /**
   * Main method - calculates and gets leaderboard with concurrency control
   * @param {string} contest_id - Contest ID
   * @returns {Promise<Object>} Leaderboard data and contest info
   */
  static async calculateAndGetLeaderboard(contest_id) {
    const contest = await Contest.get_by_id(contest_id);

    // Return empty leaderboard if contest hasn't ended
    if (contest.end_time > new Date().toISOString()) {
      return {
        leaderboardData: [],
        contest,
      };
    }

    const duration = parseInt(contest.toJSON().duration) * seconds_per_minute;
    const live_contest_statuses = [
      QUIZ_STATUS.COMPLETED,
      QUIZ_STATUS.STARTED,
      QUIZ_STATUS.REGISTERED,
    ];

    let leaderboardData = await LeaderboardAPI.getLeaderboardData(contest_id);

    // Check if calculation is needed
    if (
      leaderboardData.length > 0 &&
      leaderboardData.some(
        item => item.rank === null || item.rank === undefined
      )
    ) {
      try {
        // Handle concurrent calculation with locking
        await LeaderboardAPI.handleConcurrentCalculation(
          contest_id,
          live_contest_statuses,
          duration,
          contest,
          leaderboardData.length
        );

        // Fetch final calculated results
        leaderboardData = await LeaderboardAPI.getLeaderboardData(contest_id);
      } catch (error) {
        logger.warn('Returning empty leaderboard due to error', {
          contestId: contest_id,
          error: error.message,
        });
        return {
          leaderboardData: [],
          contest,
          error: 'Insufficient vouchers for reward allocation',
        };
      }
    }

    return {
      leaderboardData,
      contest,
    };
  }

  /**
   * Handles GET request for leaderboard
   * @param {Request} request - The incoming request
   * @returns {Response} JSON response with leaderboard data
   */
  async processGetRequest(request) {
    try {
      const { searchParams } = new URL(request.url);
      const contest_id = searchParams.get('contest_id');

      // Validate request parameters
      this.validateRequest({ contest_id: contest_id });

      let { leaderboardData, contest } =
        await LeaderboardAPI.calculateAndGetLeaderboard(contest_id);

      const leaderboardDataResponse = LeaderboardAPI.prepareResponseData(
        leaderboardData,
        contest
      );

      return this.sendSuccessResponse(
        leaderboardDataResponse,
        'Leaderboard fetched successfully',
        200,
        false,
        null
      );
    } catch (error) {
      console.error('LeaderboardAPI Error:', error);
      return this.sendError(error, 'Failed to fetch leaderboard data');
    }
  }

  /**
   * Handle POST request (not supported)
   * @returns {Response} JSON response with error message
   */
  async handlePostRequest() {
    return new Response(JSON.stringify({ error: 'Leaderboard is read-only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Handle PUT request (not supported)
   * @returns {Response} JSON response with error message
   */
  async handlePutRequest() {
    return new Response(JSON.stringify({ error: 'Leaderboard is read-only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Handle DELETE request (not supported)
   * @returns {Response} JSON response with error message
   */
  async handleDeleteRequest() {
    return new Response(JSON.stringify({ error: 'Leaderboard is read-only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
