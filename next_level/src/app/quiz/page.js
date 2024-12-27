
export default function Quiz() {
  return <h1>Contact Us</h1>;
}

'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage  ()  {
  const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], correct: 0 },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "100,000 km/s"], correct: 0 },
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
    { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Tesla"], correct: 1 },
    { question: "Which country has the largest population?", options: ["USA", "India", "China", "Brazil"], correct: 2 },
    { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], correct: 1 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const router = useRouter();

  const handleOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/result");
  };

  const handleNavigation = (index) => {
    setCurrentQuestion(index);
  };

  // Count the summary stats
  const answeredCount = answers.filter((a) => a !== null).length;
  const notVisitedCount = currentQuestion === 0 ? 10 : 10 - currentQuestion - 1;
  const notAnsweredCount = answers.filter((a) => a === null).length - notVisitedCount;
  const markedForReviewCount = 0; // Logic for marked for review can be added

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2 className="quiz-heading">Question</h2>
        <div className="question-container">
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${answers[currentQuestion] === index ? "selected" : ""}`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            <button onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))} className="nav-button">
              Previous
            </button>
            <button onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, 9))} className="nav-button">
              Next
            </button>
            <button className="mark-next-button">Mark for Answer and Next</button>
            <button className="save-next-button">Save and Next</button>
          </div>
        </div>
      </div>

      <div className="question-palette">
        <h2 className="palette-heading">Question Palette</h2>
        <div className="palette-buttons">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`palette-button ${
                answers[index] !== null
                  ? "answered"
                  : index === currentQuestion
                  ? "current"
                  : "not-visited"
              }`}
              onClick={() => handleNavigation(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {/* Updated Summary Row */}
        <div className="summary-row">
          <div className="summary-left">
            <div className="summary-item">Answered: {answeredCount}</div>
            <div className="summary-item">Not Answered: {notAnsweredCount}</div>
          </div>
          <div className="summary-right">
            <div className="summary-item">Not Visited: {notVisitedCount}</div>
            <div className="summary-item">Marked for Review: {markedForReviewCount}</div>
          </div>
        </div>
        <button className="finish-button" onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};


