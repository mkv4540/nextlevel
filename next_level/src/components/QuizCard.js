"use client";

export default function QuizCard({ quizData }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-5">
      {quizData.map((quiz, index) => (
        <div
          key={index}
          className="w-full p-4 text-center transition-transform duration-200 ease-in-out border border-gray-300 rounded-lg shadow-md cursor-pointer md:p-5 bg-gray-50 hover:scale-105 hover:shadow-lg"
        >
          <div className="mb-3 text-base font-bold text-gray-800 md:text-lg">
            {quiz.title}
          </div>

          <div className="mb-3 text-xs text-gray-600 md:text-sm">
            {quiz.description}
          </div>

          <button
            className="w-full px-4 py-2 text-sm font-bold text-white transition duration-300 bg-blue-700 rounded-md md:w-auto hover:bg-blue-800"
            onClick={() => window.open(quiz.link, "_blank")}
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
}
