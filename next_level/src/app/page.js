// "use client";
// import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
// import DynamicButton from "../components/DynamicButton";
// import HeroSection from "../components/HeroSection";

// import QuizCard from "../components/QuizCard";
// import { quizData } from "../utils/quizData";

// export default function Home() {
//   const { isLoaded, userId } = useAuth();

//   // Show a loader until authentication is loaded
//   if (!isLoaded) return <div>Loading...</div>;

//   // Redirect unauthenticated users to sign-in page
//   if (!userId) {
//     return <RedirectToSignIn />;
//   }

//   // Render the authenticated content
//   return (
//     <>
//       <HeroSection />
//       <div>
//         <h1
//           style={{
//             textAlign: "center",
//             background: "#94a5f2",
//             color: "white",
//             fontSize: "40px",
//           }}
//         >
//           EXPLORE OUR COURSES
//         </h1>
//       </div>
//       <DynamicButton />
//       <h2
//         style={{
//           marginTop: "30px",
//           fontSize: "30px",
//           fontWeight: "bold",
//           color: "white",
//           display: "flex", // Use flexbox for centering
//           justifyContent: "center", // Center horizontally
//           alignItems: "center", // Center vertically (if needed)
//           textAlign: "center",
//           background: "#94a5f2",
//         }}
//       >
//         Practice Quizzes
//       </h2>
//       <QuizCard quizData={quizData} />
//       <div style={{ padding: "20px" }}>
//         <h1>Contact Us</h1>
//         <p>Contact details go here...</p>
//       </div>
//     </>
//   );
// }


"use client";
import { useAuth } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
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
      <h2
        style={{
          marginTop: "30px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "#94a5f2",
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
