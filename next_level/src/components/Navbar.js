"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <span className="text-black font-semibold text-sm md:text-base">Next Level Academy</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-black hover:text-gray-500">
              Home
            </Link>
            <Link href="/about" className="text-black hover:text-gray-500">
              About
            </Link>
            <Link href="/studymaterial" className="text-black hover:text-gray-500">
              Study Material
            </Link>
            <Link href="/ncert" className="text-black hover:text-gray-500">
              NCERT Books
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-500">
              Contact
            </Link>
          </div>

          {/* Desktop Search and Login */}
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <button className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
              Search
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="flex flex-col py-2 space-y-2">
              <Link href="/" className="px-4 py-2 text-black hover:bg-gray-100">
                Home
              </Link>
              <Link href="/about" className="px-4 py-2 text-black hover:bg-gray-100">
                About
              </Link>
              <Link href="/studymaterial" className="px-4 py-2 text-black hover:bg-gray-100">
                Study Material
              </Link>
              <Link href="/ncert" className="px-4 py-2 text-black hover:bg-gray-100">
                NCERT Books
              </Link>
              <Link href="/contact" className="px-4 py-2 text-black hover:bg-gray-100">
                Contact
              </Link>
              
              {/* Mobile Search and Login */}
              <div className="px-4 py-2 space-y-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 text-sm border border-gray-300 rounded-md"
                />
                <button className="w-full mt-2 px-3 py-2 bg-gray-600 text-white rounded-md">
                  Search
                </button>
                <button className="w-full mt-2 px-3 py-2 bg-green-600 text-white rounded-md">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
