"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    about: false,
    services: false,
    quiz: false,
    contact: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <nav
      style={{
        position: "fixed", // Fix the navbar to the top
        top: "0", // Align it to the top
        width: "98%", // Make it span the full width
        zIndex: "1000", // Ensure it stays above other elements
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#0a0b59", // Navbar background color
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better visual
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          style={{ cursor: "pointer" }}
        />
        <span>Next Level Academy</span>
      </div>

      {/* Links Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => toggleDropdown("services")}
          onMouseLeave={() => toggleDropdown("services")}
        >
          Services
          {dropdownOpen.services && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                left: "0",
                backgroundColor: "#fff",
                color: "#333",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Link
                href="#consulting"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Consulting
              </Link>
              <Link
                href="#workshops"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Workshops
              </Link>
            </div>
          )}
        </div>
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => toggleDropdown("quiz")}
          onMouseLeave={() => toggleDropdown("quiz")}
        >
          Quiz
          {dropdownOpen.quiz && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                left: "0",
                backgroundColor: "#fff",
                color: "#333",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Link
                href="#quiz-1"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Quiz 1
              </Link>
              <Link
                href="#quiz-2"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Quiz 2
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/contact"
          style={{ color: "white", textDecoration: "none" }}
        >
          Contact
        </Link>
      </div>

      {/* Search and Login Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "5px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "3px",
          }}
        />
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#555",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "3px",
          }}
        >
          Search
        </button>
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "3px",
          }}
          onClick={() => alert("Redirecting to Login Page...")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
