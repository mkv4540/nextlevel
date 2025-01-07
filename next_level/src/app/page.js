"use client";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import DynamicButton from "../components/DynamicButton";
import HeroSection from "../components/HeroSection";
import QuizCard from "../components/QuizCard";
import { quizData } from "../utils/quizData";

export default function Home() {
  // const { isLoaded, userId } = useAuth();

  // // Show a loader until authentication is loaded
  // if (!isLoaded) return <div>Loading...</div>;

  // // Redirect unauthenticated users to sign-in page
  // if (!userId) {
  //   return <RedirectToSignIn />;
  // }

  // Render the authenticated content
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-bold text-black text-center animate-fadeInDown">
          EXPLORE OUR COURSES
        </h1>
      </div>

      <DynamicButton />

      <div className="px-4 py-6 md:py-8">
        <h2 className="text-xl md:text-3xl font-bold text-black text-center animate-slideInLeft">
          Practice Quizzes
        </h2>
      </div>

      <QuizCard quizData={quizData} />

      <div className="p-4 md:p-5">
        <h1 className="text-lg md:text-xl font-bold mb-2">Contact Us</h1>
        <p className="text-sm md:text-base text-gray-700">Contact details go here...</p>
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

