"use client";

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import DynamicButton from "../components/DynamicButton";
import HeroSection from "../components/HeroSection";
import QuizCard from "../components/QuizCard";
import { quizData } from "../utils/quizData";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  // Show a loader until authentication is loaded
  if (!isLoaded) return <div>Loading...</div>;

  // Redirect unauthenticated users to sign-in page
  if (!userId) {
    return <RedirectToSignIn />;
  }

  // Render the authenticated content
  return (
    <>
      <HeroSection />
      <div>

        <h1 className="text-center text-black text-4xl animate-fadeInDown">
        <h1
          style={{
            textAlign: "center",
            background: "#94a5f2",
            color: "white",
            fontSize: "40px",
          }}
        >

          EXPLORE OUR COURSES
        </h1>
      </div>
      <DynamicButton />

      <h2 className="mt-8 text-3xl font-bold text-black flex justify-center text-center animate-slideInLeft">
      <h2
        style={{
          marginTop: "30px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "white",
          display: "flex", // Use flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically (if needed)
          textAlign: "center",
          background: "#94a5f2",
        }}
      >

        Practice Quizzes
      </h2>
      <QuizCard quizData={quizData} />
      <div className="p-5">
        <h1 className="text-xl font-bold">Contact Us</h1>
        <p className="text-gray-700">Contact details go here...</p>
      </div>

      {/* Animations */}
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
    </>
  );
}
