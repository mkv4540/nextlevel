import DynamicButton from "../components/DynamicButton";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import QuizCard from "../components/QuizCard";
import { quizData } from "../utils/quizData";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DynamicButton />
      <h2
        style={{
          marginTop: "30px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#333",
          display: "flex", // Use flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically (if needed)
          textAlign: "center",
        }}
      >
        Practice Quizzes
      </h2>
      <QuizCard quizData={quizData} />
      <div style={{ padding: "20px" }}>
        <h1>Contact Us</h1>
        <p>Contact details go here...</p>
      </div>
    </>
  );
}
