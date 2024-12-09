"use client";

import React from "react";

const StudyMaterial = () => {
  return (
    <div className="font-open-sans leading-relaxed p-5 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 animate-fadeIn mt-12">
          Study Material
        </h1>
        <p className="text-lg text-gray-600 mt-2 animate-fadeIn">
          Learn and prepare for government exams with resources from our YouTube
          channel, <strong>NEXT LEVEL ACADEMY</strong>.
        </p>
      </header>

      {/* YouTube Section */}
      <section>
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-5 animate-slideIn">
          Video Tutorials
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          <iframe
            className="animate-fadeInUp"
            width="300"
            height="200"
            src="https://www.youtube.com/embed/VIDEO_ID1"
            title="Government Exam Preparation - Topic 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            className="animate-fadeInUp"
            width="300"
            height="200"
            src="https://www.youtube.com/embed/VIDEO_ID2"
            title="Government Exam Preparation - Topic 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            className="animate-fadeInUp"
            width="300"
            height="200"
            src="https://www.youtube.com/embed/VIDEO_ID3"
            title="Government Exam Preparation - Topic 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Images Section */}
      <section>
        <h2 className="text-2xl font-bold text-blue-900 text-center mt-10 mb-5 animate-slideIn">
          Visual Resources
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          <img
            src="/image1.jpg"
            alt="Study Resource 1"
            className="w-[300px] h-[200px] rounded-lg shadow-lg animate-zoomIn"
          />
          <img
            src="/image2.jpg"
            alt="Study Resource 2"
            className="w-[300px] h-[200px] rounded-lg shadow-lg animate-zoomIn"
          />
          <img
            src="/image3.jpg"
            alt="Study Resource 3"
            className="w-[300px] h-[200px] rounded-lg shadow-lg animate-zoomIn"
          />
        </div>
      </section>

      {/* Text Content Section */}
      <section>
        <h2 className="text-2xl font-bold text-blue-900 text-center mt-10 mb-5 animate-fadeIn">
          Why Choose NEXT LEVEL ACADEMY?
        </h2>
        <p className="text-lg text-gray-600 text-justify leading-relaxed animate-fadeIn">
          At NEXT LEVEL ACADEMY, we believe in providing high-quality and
          accessible resources for every aspirant preparing for government
          exams. Our YouTube videos cover topics in depth, with expert guidance
          to make your preparation effective and efficient. Explore detailed
          tutorials, downloadable study materials, and practice quizzes that
          help you excel in competitive exams like SSC, UPSC, Banking, and more.
        </p>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default StudyMaterial;
