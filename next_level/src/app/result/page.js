'use client';

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { decode } from 'html-entities';


// Registering ChartJS components for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

function ResultPage() {
  const [result, setResult] = useState(null); // State to store quiz results

  useEffect(() => {
    // Fetch quiz results from localStorage when the component mounts
    const savedResult = JSON.parse(localStorage.getItem("quizResults"));
    setResult(savedResult);
  }, []);

  // Show loading spinner if results are not available yet
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Constants and derived data
  const totalQuestions =  result.questions?.length || 0; // Total number of quiz questions
  const attempted = result.answers?.filter( 
    answer => answer.givenAnswer !== null && answer.givenAnswer !== undefined
  ).length || 0; // Count of attempted questions
  const correct = result.answers?.filter(
    answer => answer.givenAnswer === answer.correctAnswer
  ).length || 0; // Count of correct answers
  const incorrect = attempted - correct; // Count of incorrect answers
  const notAttempted = totalQuestions - attempted; // Count of unattempted questions
  const score = (correct - (incorrect * 0.01)).toFixed(2); // Final score calculation

  // Data configuration for the Pie chart
  const data = {
    labels: ["Not Attempted", "Correct", "Incorrect"],
    datasets: [
      {
        data: [notAttempted, correct, incorrect], // Data values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for sections
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Hover effect colors
      },
    ],
  };

  // Helper function to determine answer status
  const getAnswerStatus = (answer) => {
    if (!answer.givenAnswer) return "Not Attempted";
    return answer.givenAnswer === answer.correctAnswer ? "Correct" : "Wrong";
  };

  // Helper function to calculate marks for an answer
  const getMarks = (answer) => {
    if (!answer.givenAnswer) return "0";
    return answer.givenAnswer === answer.correctAnswer ? "1" : "-0.01";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="p-6 border-b mt-16">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>
        </div>

        {/* Summary Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="w-full">
              <div className="h-[300px] relative">
                <Pie
                  data={data}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom' // Position of the legend
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Stats Table */}
            <div className="w-full">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {/* Displaying summary stats */}
                    {[
                      { label: "Total Questions", value: totalQuestions },
                      { label: "Total Attempted Questions", value: attempted },
                      { label: "Correct Answers", value: correct },
                      { label: "Incorrect Answers", value: incorrect },
                      { label: "Not Attempted", value: notAttempted },
                      { label: "Negative Marking Percentage", value: "1%" },
                      { label: "Marks for Correct Answer", value: "1" },
                      { label: "Your Score", value: score }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 pr-4 text-gray-700">{item.label}</td>
                        <td className="py-3 text-right text-gray-900">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="p-6 border-t">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Detailed Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Given Answer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Correct Answer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Displaying detailed answers */}
                {result.answers && result.answers.length > 0 ? (
                  result.answers.map((answer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-lg break-words">
                          {decode(result.questions[index]?.text || "Question not found")}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                        {answer.givenAnswer ? decode(answer.givenAnswer) : "Not Attempted"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                        {decode(answer.correctAnswer || "N/A")}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          answer.givenAnswer === answer.correctAnswer
                            ? "bg-green-100 text-green-800"
                            : !answer.givenAnswer
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}>
                          {answer.givenAnswer === answer.correctAnswer
                            ? "Correct"
                            : !answer.givenAnswer
                              ? "Not Attempted"
                              : "Wrong"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {answer.givenAnswer === answer.correctAnswer ? "1" : 
                         answer.givenAnswer ? "-0.01" : "0"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No answers available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
