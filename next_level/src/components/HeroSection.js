"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter(); // Initialize the router
  
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[400px] md:h-[600px] bg-gradient-to-t from-white to-cyan-100 px-4 py-8 md:py-0">
      {/* Left Content */}
      <div className="flex-1 flex justify-center md:justify-start items-center md:pl-8">
        <div className="flex flex-col gap-6 md:gap-10">
          <div>
            <h1 className="text-3xl md:text-[60px] font-bold text-black font-open-sans flex flex-col md:flex-row md:gap-2 text-center md:text-left md:ml-8 perspective-1000">
              <span
                className="inline-block animate-moveToScreen"
                style={{
                  animationDelay: "0s",
                }}
              >
                NEXT
              </span>
              <span
                className="inline-block animate-moveToScreen"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                LEVEL
              </span>
              <span
                className="inline-block animate-moveToScreen"
                style={{
                  animationDelay: "0.6s",
                }}
              >
                ACADEMY
              </span>
            </h1>
            <p className="text-base md:text-lg mb-1 text-center md:text-left md:ml-9">
              Learn <span className="text-xl text-green-600">►</span> Practice{" "}
              <span className="text-xl text-green-600">►</span> Improve{" "}
              <span className="text-xl text-green-600">►</span> Succeed
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg mb-2 mt-1 md:ml-8">
              Start your preparation for selections. For Free!
            </p>
            <button
              onClick={() => router.push("/quiz")}
              className="bg-green-600 text-white px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-full shadow-md mt-4 md:mt-5 md:ml-8 hover:bg-green-700 transition duration-300 w-full md:w-auto"
            >
              Get Started For Free Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
        <Image
          src="/try1.png"
          alt="Hero Image"
          width={500}
          height={400}
          className="animate-imageZoom w-full max-w-[300px] md:max-w-[500px]"
        />
      </div>

      <style jsx>{`
        @keyframes moveToScreen {
          0% {
            transform: translateZ(500px) scale(2);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateZ(0) scale(1);
          }
        }

        @keyframes imageZoom {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        :global(.animate-imageZoom) {
          animation: imageZoom 1.5s ease-in-out;
        }

        :global(.animate-moveToScreen) {
          animation: moveToScreen 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
