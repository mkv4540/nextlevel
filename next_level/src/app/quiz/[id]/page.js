"use client";

import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { rewardQuizData } from "../../../utils/rewardQuizData";
import NameEmailDialog from "../../../components/NameEmailDialog";

export default function QuizPage() {
  const { isLoaded, userId } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showNameEmailDialog, setShowNameEmailDialog] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  // Find quiz details
  useEffect(() => {
    const quizId = params.id;
    for (const category of Object.values(rewardQuizData)) {
      const foundQuiz = category.find(q => q.id === quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeLeft(foundQuiz.duration * 60);
        // Don't fetch questions here, wait for user details
        break;
      }
    }
  }, [params.id]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Fetch questions from API
  const fetchQuestions = async (numQuestions) => {
    try {
      // Always fetch 10 questions regardless of numQuestions parameter
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple`
      );
      const data = await response.json();
      const formattedQuestions = data.results.map(q => ({
        question: q.question,
        correct_answer: q.correct_answer,
        options: shuffleArray([...q.incorrect_answers, q.correct_answer])
      }));
      setQuestions(formattedQuestions);
      setAnswers(new Array(formattedQuestions.length).fill(null));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  // Shuffle array helper function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmitQuiz = async () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.options[answers[index]] === q.correct_answer) {
        score++;
      }
    });

    // Pass the quiz reward as prize pool instead of calculating reward here
    router.push(
      `/quiz/result?score=${score}&total=${questions.length}&reward=${quiz.reward}&username=${encodeURIComponent(userDetails.name)}`
    );
  };

  const handleUserDetailsSubmit = (details) => {
    setUserDetails(details);
    setShowNameEmailDialog(false);
    // Start fetching questions after user details are submitted
    if (quiz) {
      fetchQuestions(quiz.questions);
    }
  };

  if (loading && !showNameEmailDialog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-8">
      {showNameEmailDialog && (
        <NameEmailDialog onSubmit={handleUserDetailsSubmit} />
      )}
      
      {!showNameEmailDialog && (
        <div className="max-w-4xl mx-auto px-4">
          {/* Quiz Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl text-gray-800 font-bold">{quiz?.title}</h1>
              <div className="text-purple-600 font-medium">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-4">
              <span className="text-gray-800 font-bold">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <h2 className="text-gray-800 font-medium mt-2">
                {questions[currentQuestion]?.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 font-sm text-gray-800">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 rounded border transition-colors
                    ${selectedAnswer === index 
                      ? 'border-purple-600 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Submit Quiz?</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to submit your quiz? You can't change your answers after submission.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 