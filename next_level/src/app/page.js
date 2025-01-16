"use client";
import { useAuth } from "@clerk/nextjs";
import DynamicButton from "../components/DynamicButton";
import HeroSection from "../components/HeroSection";
import QuizCard from "../components/QuizCard";
import { quizData } from "../utils/quizData";
import { useRouter } from 'next/navigation';
import YouTubePlayer from "../components/YoutubePlayer";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();



  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold text-center text-black md:text-4xl animate-fadeInDown">
          EXPLORE OUR COURSES
        </h1>
      </div>
    
    {/* <YouTubePlayer/> */}
    
      <DynamicButton />

      {/* Free Quizzes Section */}
      <div className="px-4 py-6 md:py-8">
        <h2 className="text-xl font-bold text-center text-black md:text-3xl">
          Practice Quizzes
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Improve your knowledge with our free practice quizzes
        </p>
        <QuizCard quizData={quizData} />
      </div>

      <div className="p-4 md:p-5">
        <h1 className="mb-2 text-lg font-bold md:text-xl">Contact Us</h1>
        <p className="text-sm text-gray-700 md:text-base">Contact details go here...</p>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

