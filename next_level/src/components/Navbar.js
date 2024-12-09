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
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-3 bg-green-700 text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-2 rounded-full">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="cursor-pointer"
        />
        <span>Next Level Academy</span>
      </div>

      {/* Links Section */}
      <div className="flex items-center gap-12">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="text-white hover:text-gray-300">
          About
        </Link>
        <Link href="/studymaterial" className="text-white hover:text-gray-300">
          Study Material
        </Link>
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => toggleDropdown("quiz")}
          onMouseLeave={() => toggleDropdown("quiz")}
        >
          Quiz
          {dropdownOpen.quiz && (
            <div className="absolute top-8 left-0 bg-white text-gray-800 p-3 flex flex-col gap-2 rounded-md shadow-lg">
              <Link href="#quiz-1" className="hover:text-green-600">
                Quiz 1
              </Link>
              <Link href="#quiz-2" className="hover:text-green-600">
                Quiz 2
              </Link>
            </div>
          )}
        </div>
        <Link href="/contact" className="text-white hover:text-gray-300">
          Contact
        </Link>
      </div>

      {/* Search and Login Section */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        />
        <button className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
          Search
        </button>
        <button
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => alert("Redirecting to Login Page...")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
