"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter(); // Initialize the router
  return (
    <div className="flex flex-row w-full h-[600px] bg-gradient-to-t from-white to-cyan-100">
      {/* Left Content */}
      <div className="flex-1 flex justify-start items-center pl-8">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-[60px] font-bold text-black font-open-sans flex gap-2 ml-8 perspective-1000">
              <span
                className="inline-block"
                style={{
                  animationName: "moveToScreen",
                  animationDuration: "1s",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: "0s",
                  animationFillMode: "forwards",
                }}
              >
                NEXT
              </span>
              <span
                className="inline-block"
                style={{
                  animationName: "moveToScreen",
                  animationDuration: "1s",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                LEVEL
              </span>
              <span
                className="inline-block"
                style={{
                  animationName: "moveToScreen",
                  animationDuration: "1s",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: "0.6s",
                  animationFillMode: "forwards",
                }}
              >
                ACADEMY
              </span>
            </h1>
            <p className="text-lg mb-1 ml-9">
              Learn <span className="text-xl text-green-600">►</span> Practice{" "}
              <span className="text-xl text-green-600">►</span> Improve{" "}
              <span className="text-xl text-green-600">►</span> Succeed
            </p>
          </div>
          <div>
            <p className="text-lg mb-2 mt-1 ml-8">
              Start your preparation for selections. For Free!
            </p>
            <div>
              <button
                onClick={() => router.push("/quiz")}
                className="bg-green-600 text-white px-6 py-4 text-lg rounded-full shadow-md mt-5 ml-8 hover:bg-green-700 transition duration-300"
              >
                Get Started For Free Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src="/try1.png" // Use a public folder image
          alt="Hero Image"
          width={500}
          height={400}
          className="animate-imageZoom"
        />
      </div>

      {/* CSS Animation */}
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

        .animate-imageZoom {
          animation: imageZoom 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
