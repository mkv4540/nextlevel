"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useBalance } from "../../../context/BalanceContext";

export default function QuizResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateBalance } = useBalance();

  const score = parseInt(searchParams.get("score"), 10);
  const total = parseInt(searchParams.get("total"), 10);
  const prizePool = parseFloat(searchParams.get("reward"));
  const username = searchParams.get("username");

  const [leaderboard, setLeaderboard] = useState([]);
  const [rewardAdded, setRewardAdded] = useState(false);

  useEffect(() => {
    // Generate mock leaderboard data with more realistic scores
    const mockPlayers = Array.from({ length: 20 }, (_, i) => {
      if (i === 0) {
        return {
          id: i + 1,
          name: username,
          score: score
        };
      }
      const randomScore = Math.floor(Math.random() * (total + 1));
      return {
        id: i + 1,
        name: `Player ${i + 1}`,
        score: randomScore
      };
    });

    // Sort players by score in descending order
    const sortedPlayers = mockPlayers.sort((a, b) => {
      if (b.score === a.score) {
        return a.name === username ? -1 : 1;
      }
      return b.score - a.score;
    });

    // Calculate rewards based on rank with prize pool distribution
    const rewardedPlayers = sortedPlayers.map((player, index) => {
      const rank = index + 1;
      let playerReward = 0;

      if (rank === 1) {
        playerReward = prizePool * 0.30;
      } else if (rank === 2) {
        playerReward = prizePool * 0.20;
      } else if (rank === 3) {
        playerReward = prizePool * 0.15;
      } else if (rank <= 10) {
        const remainingPool = prizePool * 0.25;
        const position = rank - 3;
        playerReward = (remainingPool * (8 - position)) / 28;
      } else {
        playerReward = (prizePool * 0.10) / 10;
      }

      return {
        ...player,
        rank,
        reward: Math.round(playerReward)
      };
    });

    setLeaderboard(rewardedPlayers);

    // Add user's reward to their balance only once
    const userPlayer = rewardedPlayers.find(player => player.name === username);
    if (userPlayer && !rewardAdded) {
      updateBalance(userPlayer.reward, 'reward');
      setRewardAdded(true);
    }
  }, [username, score, total, prizePool, updateBalance, rewardAdded]);

  // Find user's reward from the leaderboard
  const userReward = leaderboard.find(player => player.name === username)?.reward || 0;

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-12">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Quiz Complete!</h1>

          <div className="space-y-4 mb-8">
            <div>
              <p className="text-gray-600">Your Score</p>
              <p className="text-3xl font-bold text-purple-600">
                {score}/{total}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Reward Earned</p>
              <p className="text-3xl font-bold text-green-600">
                ₹{userReward}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/reward-quiz")}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Back to Quizzes
          </button>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800">Rank</th>
                  <th className="px-4 py-2 text-left text-gray-800">Player</th>
                  <th className="px-4 py-2 text-center text-gray-800">Score</th>
                  <th className="px-4 py-2 text-right text-gray-800">Reward</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player) => (
                  <tr
                    key={player.id}
                    className={`border-t hover:bg-gray-50 text-gray-800 ${
                      player.name === username ? 'bg-purple-50 text-gray-800' : ''
                    }`}
                  >
                    <td className="px-4 py-2">{player.rank}</td>
                    <td className="px-4 py-2">
                      {player.name === username ? (
                        <span className="font-medium text-purple-600">
                          {player.name} (You)
                        </span>
                      ) : (
                        player.name
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{player.score}</td>
                    <td className="px-4 py-2 text-right text-green-600">
                      ₹{player.reward}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}