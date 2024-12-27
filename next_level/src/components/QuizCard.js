"use client";

const QuizCard = ({ quizData }) => {
  return (
    <div className="flex flex-wrap justify-start items-start gap-5 px-5 py-5">
      {quizData.map((quiz, index) => (
        <div
          key={index}
          className="w-[300px] p-5 border border-gray-300 rounded-lg shadow-md bg-gray-50 text-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          {/* Title */}
          <div className="text-lg font-bold text-gray-800 mb-3">
            {quiz.title}
          </div>

          {/* Description */}
          <div className="text-sm text-gray-600 mb-3">{quiz.description}</div>

          {/* Button */}
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-bold transition duration-300 hover:bg-blue-800"
            onClick={() => window.open(quiz.link, "_blank")}
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
