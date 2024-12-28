"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ytquizData from "../../utils/ytquizData"; // Import ytquizData

export default function QuizPage() {
  const questions = ytquizData; // Use ytquizData for questions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const router = useRouter();

  const handleOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleSaveAndNext = () => {
    setVisitedQuestions(new Set([...visitedQuestions, currentQuestion]));
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleMarkAndNext = () => {
    setVisitedQuestions(new Set([...visitedQuestions, currentQuestion]));
    handleSaveAndNext();
  };

  const handleNavigation = (index) => {
    setVisitedQuestions(new Set([...visitedQuestions, index]));
    setCurrentQuestion(index);
  };

  const handleFinish = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/result");
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const notVisitedCount = questions.length - visitedQuestions.size;

  return (
    <div className="flex flex-row justify-between items-start bg-gray-100 p-8 min-h-screen pt-20">
      {/* Left Section */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Question {currentQuestion + 1}: {questions[currentQuestion].question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`py-2 px-4 text-left rounded-lg border ${
                answers[currentQuestion] === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              } hover:bg-blue-100`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-around mt-6">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            className="py-2 px-4 bg-blue-500 text-white text-lg font-bold rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={handleMarkAndNext}
            className="py-2 px-4 bg-blue-700 text-white text-lg font-bold rounded-lg"
          >
            Mark for Answer and Next
          </button>
          <button
            onClick={handleSaveAndNext}
            className="py-2 px-4 bg-green-500 text-white text-lg font-bold rounded-lg"
          >
            Save and Next
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 ml-4">
        <h3 className="text-xl font-bold mb-4">Question Palette</h3>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 text-lg font-bold rounded-full ${
                answers[index] !== null
                  ? "bg-blue-500 text-white"
                  : visitedQuestions.has(index)
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleNavigation(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="text-sm space-y-2">
          <p className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"></span>
            Answered: {answeredCount}
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 bg-gray-300 rounded-full inline-block mr-2"></span>
            Not Answered: {questions.length - answeredCount - notVisitedCount}
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 bg-gray-200 rounded-full inline-block mr-2"></span>
            Not Visited: {notVisitedCount}
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 bg-yellow-400 rounded-full inline-block mr-2"></span>
            Visited: {visitedQuestions.size}
          </p>
        </div>
        <button
          onClick={handleFinish}
          className="w-full py-2 px-4 bg-red-500 text-white text-lg font-bold rounded-lg mt-6"
        >
          Stop This Quiz
        </button>
      </div>
    </div>
  );
}
