'use client';

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import React, { useState, useEffect,Suspense  } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NameDialog from "../../components/NameDialog";
import CountdownTimer from "../../components/CountdownTimer";
import { decode } from 'html-entities';

// Quiz API URL
const TRANSCRIPT_API_URL = '/api/transcript';
const QUIZ_API_URL = '/api/generate-quiz';

function QuizPageContent() {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const videoId = searchParams.get('videoId');
    const [quizState, setQuizState] = useState({
        questions: [],
        answers: [],
        markedForReview: [],
        loading: true,
        shuffledOptions: [],
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [showNameDialog, setShowNameDialog] = useState(true);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [shouldNavigate, setShouldNavigate] = useState(false);


    const handleNameSubmit = (name) => {
        console.log('Submitted Name:', name);
        if (name) {
            setShowNameDialog(false);
        } else {
            router.push("/");
        }
    };

    const handleAnswerSelect = (selectedAnswerIndex) => {
        setQuizState(prev => ({
            ...prev,
            answers: prev.answers.map((ans, i) =>
                i === currentQuestion ? selectedAnswerIndex : ans
            ),
        }));
    };

    const handleMarkForReview = () => {
        setQuizState(prev => ({
            ...prev,
            markedForReview: prev.markedForReview.map((mark, i) =>
                i === currentQuestion ? !mark : mark
            ),
        }));
        handleNext();
    };

    const handleNext = () => {
        if (currentQuestion < quizState.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSaveNext = () => {
        if (quizState.answers[currentQuestion] !== null) {
            handleNext();
        }
    };

    const handleFinish = () => {
        const result = {
            videoId: videoId,
            answers: quizState.answers.map((answerIndex, questionIndex) => {
                if (answerIndex === null) {
                    return {
                        givenAnswer: null,
                        correctAnswer: quizState.questions[questionIndex].correct_answer,
                        isCorrect: false
                    };
                }

                const selectedAnswer = quizState.shuffledOptions[questionIndex][answerIndex];
                return {
                    givenAnswer: selectedAnswer,
                    correctAnswer: quizState.questions[questionIndex].correct_answer,
                    isCorrect: selectedAnswer === quizState.questions[questionIndex].correct_answer
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
        setShouldNavigate(true);
    };

    const handleReportSubmit = () => {
        console.log("Report Submitted:", {
            reason: reportReason,
            additionalInfo: additionalInfo,
        });
        setShowReportDialog(false);
        setReportReason("");
        setAdditionalInfo("");
    };

    // Effects
    useEffect(() => {
        if (!videoId && !showNameDialog) {
            console.error('No video ID provided');
            router.push('/');
            return;
        }
    }, [videoId, showNameDialog, router]);

    useEffect(() => {
        if (!showNameDialog) {
            async function fetchQuestions() {
                try {
                    const transcriptResponse = await fetch(TRANSCRIPT_API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            videoId: videoId
                        })
                    });

                    if (!transcriptResponse.ok) {
                        throw new Error(`Transcript fetch error: ${transcriptResponse.status}`);
                    }

                    const transcriptData = await transcriptResponse.json();
                    console.log('Transcript Data:', transcriptData);
                    const transcript = transcriptData.transcript;

                    const quizResponse = await fetch(QUIZ_API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ transcript })
                    });

                    if (!quizResponse.ok) {
                        throw new Error(`Quiz fetch error: ${quizResponse.status}`);
                    }

                    const data = await quizResponse.json();
                    console.log('Quiz Data:', data);

                    // Map the API response to the required format
                    const allQuestions = data.questions.map((question, index) => ({
                        question: question,
                        correct_answer: data.answers[index],
                        incorrect_answers: data.options[index].filter(opt => opt !== data.answers[index])
                    }));

                    // Create shuffled options
                    const shuffledOptionsArray = data.options;

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

    useEffect(() => {
        if (!showNameDialog && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showNameDialog, timeLeft]);

    useEffect(() => {
        if (shouldNavigate) {
            router.push("/result");
        }
    }, [shouldNavigate, router]);

    // Loading state
    if (!isLoaded || !videoId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
            </div>
        );
    }

    // Authentication check
    if (!userId) {
        return <RedirectToSignIn />;
    }

    // Name dialog
    if (showNameDialog) {
        return <NameDialog onSubmit={handleNameSubmit} />;
    }

    // Loading questions
    if (quizState.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
            </div>
        );
    }


    const getQuestionCounts = (state) => {
        return {
            answered: state.answers.filter(a => a !== null).length,
            notAnswered: state.answers.filter(a => a === null).length,
            markedForReview: state.markedForReview.filter(mark => mark).length,
            answeredAndMarked: state.answers.filter((a, i) => 
                a !== null && state.markedForReview[i]
            ).length,
            notVisited: state.answers.filter((a, i) => 
                a === null && !state.markedForReview[i]
            ).length
        };
    };

    return (

      <div className="min-h-screen bg-gray-50">
            {/* Header with Timer */}
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
                {quizState.questions.map((_, index) => {
                    const isAnswered = quizState.answers[index] !== null;
                    const isMarked = quizState.markedForReview[index];
                    const isCurrent = index === currentQuestion;
                    
                    let buttonClass = "h-10 w-full rounded text-sm font-medium ";
                    
                    if (isAnswered && isMarked) {
                        buttonClass += "bg-purple-500 text-white"; // Answered and marked
                    } else if (isAnswered) {
                        buttonClass += "bg-green-500 text-white"; // Answered
                    } else if (isMarked) {
                        buttonClass += "bg-blue-500 text-white"; // Marked for review
                    } else if (isCurrent) {
                        buttonClass += "bg-yellow-500 text-black"; // Current question
                    } else {
                        buttonClass += "bg-gray-200 text-black"; // Not visited
                    }
                    
                    return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                            className={buttonClass}
                >
                  {index + 1}
                </button>
                    );
                })}
            </div>

            <div className="space-y-2 border-t pt-4">
              {[
                {
                        label: "Answered",
                        color: "bg-green-500",
                        count: getQuestionCounts(quizState).answered
                    },
                    {
                        label: "Not Answered",
                        color: "bg-red-500",
                        count: getQuestionCounts(quizState).notAnswered
                    },
                    {
                        label: "Marked for Review",
                        color: "bg-blue-500",
                        count: getQuestionCounts(quizState).markedForReview
                    },
                    {
                        label: "Answered & Marked for Review",
                        color: "bg-purple-500",
                        count: getQuestionCounts(quizState).answeredAndMarked
                    }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${item.color} rounded`} />
                        <span className="text-sm text-gray-600">
                            {item.label}: {item.count}
                        </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full mt-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Submit Quiz
            </button>
          </aside>
        </div>
      </main>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Submit Quiz?</h2>
                <div className="space-y-2 mb-6">
                    <p className="text-gray-600">
                        Answered Questions: {getQuestionCounts(quizState).answered}
                    </p>
                    <p className="text-gray-600">
                        Not Attempted Questions: {getQuestionCounts(quizState).notAnswered}
                    </p>
                    <p className="text-gray-600">
                        Questions Marked for Review: {getQuestionCounts(quizState).markedForReview}
                    </p>
                </div>
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
                        Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
}



export default function QuizPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <QuizPageContent />
      </Suspense>
    );
  }

