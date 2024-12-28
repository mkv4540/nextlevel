
"use client";

import React, { useEffect, useState } from "react";
import ytquizData from "../../utils/ytquizData";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();

  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch answers from localStorage
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
    setAnswers(storedAnswers);

    // Calculate score
    const calculatedScore = storedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === ytquizData[index].correct ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
  }, []);

  const handleRetakeQuiz = () => {
    localStorage.removeItem("quizAnswers"); // Clear previous answers
    router.push("/ytquiz"); // Redirect to the quiz page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-green-600">Quiz Result</h1>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Your Score: {score} / {ytquizData.length}
        </h2>

        <ul className="space-y-4">
          {ytquizData.map((question, index) => (
            <li key={index} className="p-4 border rounded-md shadow-sm">
              <p className="text-lg font-medium">
                {index + 1}. {question.question}
              </p>

              <div className="mt-2">
                {question.options.map((option, optionIndex) => (
                  <p
                    key={optionIndex}
                    className={`py-1 px-2 rounded-md ${
                      optionIndex === question.correct
                        ? "bg-green-100 text-green-700"
                        : optionIndex === answers[index]
                        ? "bg-red-100 text-red-700"
                        : ""
                    }`}
                  >
                    {optionIndex + 1}. {option}
                  </p>
                ))}
              </div>

              {answers[index] === question.correct ? (
                <p className="text-green-600 mt-2 font-bold">Correct</p>
              ) : (
                <p className="text-red-600 mt-2 font-bold">Incorrect</p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleRetakeQuiz}
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Retake Quiz
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Go Back to Home
          </button>

'use client'
import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultPage ()  {
  const [answers, setAnswers] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Ensuring access to localStorage only in the client-side (browser)
  useEffect(() => {
    setIsClient(true); // Indicate that the component is now mounted in the client
    if (typeof window !== "undefined") {
      const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
      setAnswers(storedAnswers);
    }
  }, []); // Empty dependency array to run only on component mount

  // Sample correct answers (replace with your own logic)
  const correctAnswers = [0, 1, 2, 3, 0, 0, 0, 1, 2, 1];

  // Calculate correct and incorrect answers
  const correctCount = answers.filter((answer, index) => answer === correctAnswers[index]).length;
  const incorrectCount = answers.length - correctCount;

  // Pie chart data
  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [correctCount, incorrectCount],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  // Render only after the component has mounted and localStorage data is available
  if (!isClient) {
    return null; // Prevents server-side rendering issues
  }

  return (
    <div className="result-container">
      <div className="result-content">
        {/* Left Side: Quiz Result */}
        <div className="quiz-results">
          <h2>Quiz Result</h2>
          <div className="result-item">
            <strong>Correct Answers:</strong>
            <p>{correctCount}</p>
          </div>
          <div className="result-item">
            <strong>Incorrect Answers:</strong>
            <p>{incorrectCount}</p>
          </div>
        </div>

        {/* Right Side: Pie Chart */}
        <div className="chart-container">
          <Pie data={data} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            maintainAspectRatio: false,  // Allow resizing
          }} height={250} />  {/* Reduced the size of Pie chart */}

        </div>
      </div>
    </div>
  );
};


export default ResultPage;

