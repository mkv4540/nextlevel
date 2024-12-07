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


