"use client";

export default function  QuizCard  ({ quizData })  {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-5">
      {quizData.map((quiz, index) => (
        <div
          key={index}
          className="w-full p-4 md:p-5 border border-gray-300 rounded-lg shadow-md bg-gray-50 text-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <div className="text-base md:text-lg font-bold text-gray-800 mb-3">
            {quiz.title}
          </div>

          <div className="text-xs md:text-sm text-gray-600 mb-3">
            {quiz.description}
          </div>

          <button
            className="w-full md:w-auto px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-bold transition duration-300 hover:bg-blue-800"
            onClick={() => window.open(quiz.link, "_blank")}
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
};


