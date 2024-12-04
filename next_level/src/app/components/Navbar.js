'use client'
import Image from "next/image";
import React, { useState } from "react";

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
    <nav className="flex justify-between items-center p-4 bg-[#0c1c0c] text-white">
    
      <div className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.png" alt="Logo" width={70} height={70} className="rounded" />
        <span>Next Level Academy</span>
      </div>

    
      <div className="flex items-center gap-10">
      
        <div
          className="relative"
          onMouseEnter={() => toggleDropdown("about")}
          onMouseLeave={() => toggleDropdown("about")}
        >
          <span className="cursor-pointer">About Us</span>
          {dropdownOpen.about && (
            <div className="absolute top-7 left-0 bg-white p-2 flex flex-col gap-2 rounded-lg shadow-lg">
              <a href="#our-team" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Our Team</a>
              <a href="#our-mission" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Our Mission</a>
            </div>
          )}
        </div>

      
        <div
          className="relative"
          onMouseEnter={() => toggleDropdown("services")}
          onMouseLeave={() => toggleDropdown("services")}
        >
          <span className="cursor-pointer">Services</span>
          {dropdownOpen.services && (
            <div className="absolute top-7 left-0 bg-white p-2 flex flex-col gap-2 rounded-lg shadow-lg">
              <a href="#consulting" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Consulting</a>
              <a href="#workshops" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Workshops</a>
            </div>
          )}
        </div>

      
        <div
          className="relative"
          onMouseEnter={() => toggleDropdown("quiz")}
          onMouseLeave={() => toggleDropdown("quiz")}
        >
          <span className="cursor-pointer">Quiz</span>
          {dropdownOpen.quiz && (
            <div className="absolute top-7 left-0 bg-white p-2 flex flex-col gap-2 rounded-lg shadow-lg">
              <a href="#quiz-1" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Quiz 1</a>
              <a href="#quiz-2" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Quiz 2</a>
            </div>
          )}
        </div>

        
        <div
          className="relative"
          onMouseEnter={() => toggleDropdown("contact")}
          onMouseLeave={() => toggleDropdown("contact")}
        >
          <span className="cursor-pointer">Contact</span>
          {dropdownOpen.contact && (
            <div className="absolute top-7 left-0 bg-white p-2 flex flex-col gap-2 rounded-lg shadow-lg">
              <a href="#email" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Email</a>
              <a href="#phone" className="text-[#333] text-sm p-2 rounded-md hover:bg-[#555]">Phone</a>
            </div>
          )}
        </div>
      </div>


      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 text-sm"
        />
        <button className="p-2 bg-[#555] text-white rounded-md cursor-pointer">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
