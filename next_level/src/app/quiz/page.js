'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NameDialog from "../../components/NameDialog";
import CountdownTimer from "../../components/CountdownTimer";
import { decode } from 'html-entities';

// Quiz API URL
const API_URL = 'https://opentdb.com/api.php?amount=50&type=multiple';

function QuizPage() {
    const router = useRouter();

    // State to manage quiz questions, answers, and related information
    const [quizState, setQuizState] = useState({
        questions: [], // Stores the list of quiz questions
        answers: [], // User-selected answers for each question
        markedForReview: [], // Flags for questions marked for review
        loading: true, // Indicates whether questions are loading
        shuffledOptions: [], // Shuffled options for each question
    });

    const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
    const [timeLeft, setTimeLeft] = useState(3600); // Time remaining for the quiz
    const [showNameDialog, setShowNameDialog] = useState(true); // Show/hide name dialog
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Show/hide confirmation dialog
    const [showReportDialog, setShowReportDialog] = useState(false); // Show/hide report dialog
    const [reportReason, setReportReason] = useState(""); // Reason for reporting a question
    const [additionalInfo, setAdditionalInfo] = useState(""); // Additional information for reporting
    const [shouldNavigate, setShouldNavigate] = useState(false); // Navigation flag after quiz completion

    // Fetch questions from API once the name dialog is closed
    useEffect(() => {
        if (!showNameDialog) {
            async function fetchQuestions() {
                try {
                    const response = await fetch(API_URL);
                    const data = await response.json();
                    const allQuestions = data.results;

                    // Helper function to shuffle array elements
                    function shuffleArray(array) {
                        let currentIndex = array.length, randomIndex;
                        while (currentIndex !== 0) {
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex--;
                            [array[currentIndex], array[randomIndex]] =
                                [array[randomIndex], array[currentIndex]];
                        }
                        return array;
                    }

                    // Shuffle options for each question
                    const shuffledOptionsArray = allQuestions.map(question => {
                        const options = [...question.incorrect_answers, question.correct_answer];
                        return shuffleArray(options);
                    });

                    setQuizState({
                        questions: allQuestions,
                        answers: Array(allQuestions.length).fill(null),
                        markedForReview: Array(allQuestions.length).fill(false),
                        loading: false,
                        shuffledOptions: shuffledOptionsArray,
                    });
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    setQuizState(prev => ({ ...prev, loading: false }));
                }
            }

            fetchQuestions();
        }
    }, [showNameDialog]);

    // Countdown timer effect
    useEffect(() => {
        if (!showNameDialog && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleFinish(); // Automatically finish quiz when time runs out
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showNameDialog, timeLeft]);

    // Handle name submission from NameDialog
    const handleNameSubmit = (name) => {
        console.log('Submitted Name:', name);
        if (name) {
            setShowNameDialog(false);
        } else {
            router.push("/"); // Navigate to home if no name is provided
        }
    };

    // Handle selection of an answer
    const handleAnswerSelect = (selectedAnswerIndex) => {
        setQuizState(prev => ({
            ...prev,
            answers: prev.answers.map((ans, i) =>
                i === currentQuestion ? selectedAnswerIndex : ans
            ),
        }));
    };

    // Toggle marking the current question for review
    const handleMarkForReview = () => {
        setQuizState(prev => ({
            ...prev,
            markedForReview: prev.markedForReview.map((mark, i) =>
                i === currentQuestion ? !mark : mark
            ),
        }));
        handleNext(); // Automatically navigate to the next question
    };

    // Navigate to the next question
    const handleNext = () => {
        if (currentQuestion < quizState.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    // Navigate to the previous question
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Save the current answer and navigate to the next question
    const handleSaveNext = () => {
        if (quizState.answers[currentQuestion] !== null) {
            handleNext();
        }
    };

    // Finish the quiz and calculate results
    const handleFinish = () => {
        const result = {
            answers: quizState.answers.map((answerIndex, questionIndex) => {
                const question = quizState.questions[questionIndex];
                if (answerIndex === null) {
                    return {
                        givenAnswer: null,
                        correctAnswer: question.correct_answer,
                        isCorrect: false
                    };
                }

                const selectedAnswer = quizState.shuffledOptions[questionIndex][answerIndex];
                return {
                    givenAnswer: selectedAnswer,
                    correctAnswer: question.correct_answer,
                    isCorrect: selectedAnswer === question.correct_answer
                };
            }),
            questions: quizState.questions.map(q => ({
                text: q.question,
                correct_answer: q.correct_answer
            })),
            markedForReview: quizState.markedForReview,
            timeSpent: 3600 - timeLeft,
        };

        localStorage.setItem("quizResults", JSON.stringify(result));
        setShouldNavigate(true); // Trigger navigation to results page
    };

    // Navigate to the result page after quiz completion
    useEffect(() => {
        if (shouldNavigate) {
            router.push("/result");
        }
    }, [shouldNavigate, router]);

    // Render NameDialog when quiz starts
    if (showNameDialog) {
        return <NameDialog onSubmit={handleNameSubmit} />;
    }

    // Render a loader while questions are being fetched
    if (quizState.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
            </div>
        );
    }

    // Handle question reporting
    const handleReportSubmit = () => {
        console.log("Report Submitted:", {
            reason: reportReason,
            additionalInfo: additionalInfo,
        });

        // Example: Send report to a server
        setShowReportDialog(false);
        setReportReason("");
        setAdditionalInfo("");
    };


    return (

      <div className="min-h-screen bg-gray-50">
            {/* Fixed Header with Timer */}
            <div >
                <div className="max-w-7xl mx-auto p-4">
                    <CountdownTimer timeLeft={timeLeft} />
                    <div>
                     {/* Report Button */}
                    <button
                          onClick={() => setShowReportDialog(true)}
                          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                          Report Question
                      </button>
                      </div>
            
                </div>
            </div>
            {/* Report Dialog */}
            {showReportDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Report Question Problem</h2>
                        
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Reason:</label>
                                <div className="space-y-2 text-gray-800">
                                    <label>
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value="I think the answer is wrong"
                                            onChange={(e) => setReportReason(e.target.value)}
                                            className="mr-2"
                                        />
                                        I think the answer is wrong
                                    </label>
                                    <label className="flex item-center">
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value="There are multiple correct answers"
                                            onChange={(e) => setReportReason(e.target.value)}
                                            className="mr-2"
                                        />
                                        There are multiple correct answers
                                    </label>
                                    <label className="flex item-center">
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value="There is a typing error"
                                            onChange={(e) => setReportReason(e.target.value)}
                                            className="mr-2"
                                        />
                                        There is a typing error
                                    </label>
                                    <label className="flex item-center">
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value="Image or text is not displayed properly"
                                            onChange={(e) => setReportReason(e.target.value)}
                                            className="mr-2"
                                        />
                                        Image or comprehension text is not displaying properly
                                    </label>
                                    <label className="flex item-center">
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value="Something else"
                                            onChange={(e) => setReportReason(e.target.value)}
                                            className="mr-2"
                                        />
                                        Something else (please specify below)
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Additional Information:</label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    className="w-full border rounded p-2 text-gray-800"
                                    rows="4"
                                />
                            </div>
                        </form>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowReportDialog(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleReportSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Send Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2">

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Question Number {currentQuestion + 1}
              </h2>

              <div className="mb-6">
                <p className="text-gray-700">
                  {decode(quizState.questions[currentQuestion]?.question || '')}
                </p>
              </div>

              <div className="space-y-3">
                {quizState.shuffledOptions[currentQuestion]?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-4 rounded border transition-all
                                ${quizState.answers[currentQuestion] === index
                                    ? 'border-blue-500 bg-blue-50 text-black'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-black'}`}
                        >
                            {decode(option)}
                        </button>
                    ))}
                </div>   

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Next
                </button>
                <button
                  onClick={handleMarkForReview}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mark for Review & Next
                </button>
                <button
                  onClick={handleSaveNext}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </section>

          <aside className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Palette</h3>
            <div className="grid grid-cols-6 gap-2 mb-6">
              {Array(50).fill(null).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-10 w-full rounded text-sm font-medium
                    ${quizState.answers[index] !== null && quizState.markedForReview[index]
                      ? 'bg-blue-500 text-white'
                      : quizState.answers[index] !== null
                        ? 'bg-green-500 text-white'
                        : quizState.markedForReview[index]
                          ? 'bg-purple-500 text-white'
                          : index === currentQuestion
                            ? 'bg-yellow-500 text-black'
                            : 'bg-gray-200 text-black'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              {[
                {
                  label: 'Answered',
                  color: 'bg-green-500',
                  count: quizState.answers.filter((a) => a !== null).length,
                },
                {
                  label: 'Not Answered',
                  color: 'bg-red-500',
                  count: quizState.answers.filter((a) => a === null && !quizState.markedForReview[quizState.answers.indexOf(a)]).length,
                },
                {
                  label: 'Marked for Review',
                  color: 'bg-purple-500',
                  count: quizState.markedForReview.filter((mark) => mark).length,
                },
                {
                  label: 'Not Visited',
                  color: 'bg-gray-300',
                  count: quizState.answers.filter((a, index) => a === null && !quizState.markedForReview[index]).length,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${item.color} rounded`} />
                  <span className="text-sm text-gray-600">{item.label}: {item.count}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full mt-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Stop This Quiz
            </button>
          </aside>
        </div>
      </main>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Are you sure?</h2>
            <p className="mb-6 text-gray-600">
              Your not attempted questions: {quizState.answers.filter(a => a === null).length}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
}

export default QuizPage;
