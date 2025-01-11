"use client";

import { useAuth } from "@clerk/nextjs";
import RewardQuizCard from "../../components/RewardQuizCard";
import { rewardQuizData, userInitialBalance } from "../../utils/rewardQuizData";

export default function RewardQuizPage() {
  const { isLoaded, userId } = useAuth();

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-black text-center mb-8">
          Prize Money Quizzes
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Participate in quizzes and win real money prizes!
        </p>
        <RewardQuizCard 
          quizData={rewardQuizData} 
          userBalance={userInitialBalance}
        />
      </div>
    </main>
  );
} 