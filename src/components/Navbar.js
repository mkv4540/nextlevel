"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // State to manage dropdown visibility
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#0a0b59",
        color: "#fff",
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
        {/* About Us Dropdown */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => toggleDropdown("about")}
          onMouseLeave={() => toggleDropdown("about")}
        >
          About Us
          {dropdownOpen.about && (
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
                href="#our-team"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Our Team
              </Link>
              <Link
                href="#our-mission"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Our Mission
              </Link>
            </div>
          )}
        </div>

        {/* Services Dropdown */}
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

        {/* Quiz Dropdown */}
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

        {/* Contact Dropdown */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => toggleDropdown("contact")}
          onMouseLeave={() => toggleDropdown("contact")}
        >
          Contact
          {dropdownOpen.contact && (
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
                href="#email"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Email
              </Link>
              <Link
                href="#phone"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Phone
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
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
            marginLeft: "5px",
            backgroundColor: "#555",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "3px",
          }}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
