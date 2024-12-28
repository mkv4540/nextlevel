"use client";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="font-open-sans leading-relaxed p-5 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-10 mt-12">
        <h1 className="text-5xl font-bold text-blue-600 animate-fadeInDown">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Empowering Aspirants to Succeed in Government Exams
        </p>
      </header>

      {/* Content Section */}
      <section>
        {/* Who We Are */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-blue-900 animate-fadeInLeft">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            At <strong>NEXT LEVEL ACADEMY</strong>, we are a team of passionate
            educators and professionals committed to helping students achieve
            their dreams through structured study materials, quizzes, and video
            content.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-10 bg-blue-50 rounded-lg p-5">
          <h2 className="text-2xl font-bold text-blue-600 text-center animate-fadeInUp">
            What We Offer
          </h2>
          <ul className="text-lg text-gray-600 mt-5 space-y-3 list-none">
            <li>
              <strong>High-Quality Study Materials:</strong> Expertly curated
              notes and resources covering the entire syllabus for government
              exams.
            </li>
            <li>
              <strong>Quizzes to Sharpen Your Skills:</strong> Choose from free
              and paid quizzes designed to mimic real exam patterns.
            </li>
            <li>
              <strong>Engaging YouTube Channel:</strong> Learn from video
              lessons, tips, and strategies to ace your exams.
            </li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-blue-900 animate-fadeInRight">
            Why Choose Us?
          </h2>
          <ul className="text-lg text-gray-600 mt-5 space-y-3 list-disc list-inside">
            <li>Affordable learning options for all budgets.</li>
            <li>
              Comprehensive coverage of all major government exams, including
              SSC, UPSC, Banking, Railways, and State Exams.
            </li>
            <li>Interactive learning through quizzes and video content.</li>
            <li>Expert guidance from experienced educators.</li>
          </ul>
        </div>

        {/* Vision Section */}
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-2xl font-bold text-blue-600 text-center animate-zoomIn">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 text-center mt-2">
            To revolutionize the way students prepare for government exams by
            making learning accessible, affordable, and engaging. Together,
            let’s reach the <strong>Next Level</strong> in your career journey!
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <button
          className="bg-blue-600 text-white py-3 px-6 text-lg rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          onClick={() => router.push("/quiz")}
        >
          Explore Quizzes
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
