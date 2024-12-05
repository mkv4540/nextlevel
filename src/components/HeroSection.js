"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "600px",
        // backgroundColor: "#e8d0f2",
        backgroundImage: "linear-gradient(190deg,#fff,#7c7ef7)",
      }}
    >
      {/* Left Content */}
      <div
        style={{
          flex: "1",
          justifyContent: "start",
          padding: "0px 0px 0px 30px",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
          <div>
            <h1 style={{ fontSize: "60px", fontWeight: "bold", color: "#000" }}>
              NEXT LEVEL ACADEMY
            </h1>
            <p style={{ fontSize: "20px" }}>
              Learn <span style={{ fontSize: "24px", color: "Green" }}>►</span>{" "}
              Practice{" "}
              <span style={{ fontSize: "24px", color: "Green" }}>►</span>{" "}
              Improve{" "}
              <span style={{ fontSize: "24px", color: "Green" }}>►</span>{" "}
              Succeed
            </p>
          </div>
          <div>
            <p style={{ fontSize: "20px", marginBottom: "10px" }}>
              Start your preparation for selections. For Free!
            </p>
            <div>
              <button
                style={{
                  backgroundColor: "green",
                  padding: "15px 30px", // Larger size
                  fontSize: "18px", // Larger text
                  color: "white",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Get Started For Free Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div
        style={{
          flex: "1",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Image
          src="/try.png" // Use a public folder image
          alt="Hero Image"
          width={500}
          height={400}
        />
      </div>
    </div>
  );
};

export default HeroSection;
