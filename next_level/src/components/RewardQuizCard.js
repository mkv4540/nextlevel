"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBalance } from "../context/BalanceContext";

export default function RewardQuizCard({ quizData }) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { balance, updateBalance } = useBalance();
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);

  const handleStartQuiz = (quiz) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    if (balance < quiz.entryCost) {
      setShowInsufficientModal(true);
      return;
    }

    // Deduct entry cost from balance
    updateBalance(-quiz.entryCost, 'entry');
    router.push(`/quiz/${quiz.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Balance Banner */}
      <div className="bg-white p-6 rounded-lg mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-800 font-medium">Your Balance:</span>
            <span className="text-gray-800 font-bold">₹{balance}</span>
          </div>
          <button
            onClick={() => router.push('/wallet')}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Add Money
          </button>
        </div>
      </div>
  
      {/* Quiz Categories */}
      <div className="space-y-8">
        {Object.entries(quizData).map(([category, quizzes]) => (
          <div key={category}>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {quiz.description}
                  </p>
  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>Entry:</span>
                      <span className="text-red-600 font-bold">₹{quiz.entryCost}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>Reward:</span>
                      <span className="text-green-600 font-bold">₹{quiz.reward}</span>
                    </div>
                  </div>
  
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full bg-green-600 text-white py-2 rounded-md"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
  
      {/* Insufficient Balance Modal */}
      {showInsufficientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Insufficient Balance
            </h3>
            <p className="text-gray-600 mb-4">
              You don't have enough balance to start this quiz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInsufficientModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowInsufficientModal(false);
                  router.push('/wallet');
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-medium"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 