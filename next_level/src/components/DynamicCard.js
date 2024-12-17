"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation

const DynamicCard = ({ data }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter(); // Initialize router

  const handleDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent card click
    setDropdownVisible((prev) => !prev);
  };

  const handleDropdownItemClick = (action) => {
    alert(`You selected: ${action}`);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const handleCardClick = (ytURL) => {
    window.open(ytURL, "_blank");
  };

  return (
    <div
      className="flex justify-start p-5"
      onClick={() => handleCardClick(data.ytURl)}
    >
      <div className="w-72 m-5 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 text-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
        {/* Thumbnail */}
        <img
          src={
            data.ytThumb
              ? data.ytThumb
              : "https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
          }
          alt="YouTube Thumbnail"
          className="w-full rounded-md"
        />

        {/* Title */}
        <div className="text-lg font-bold text-gray-800 mt-3 mb-2">
          {data.title || "Title"}
        </div>

        {/* Button Container */}
        <div className="flex justify-around items-center mt-4 relative">
          {/* Watch on YouTube Button */}
          <button
            className="px-1 py-2 bg-red-600 text-white rounded-md font-bold transition-colors hover:bg-red-800"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click bubbling
              window.open(
                data.ytURl || "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                "_blank"
              );
            }}
          >
            Watch on YouTube
          </button>

          {/* Quiz Button */}
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-md font-bold transition-colors hover:bg-blue-800"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click bubbling
              router.push("/ytquiz"); // Navigate to the ytquiz page
            }}
          >
            Quiz
          </button>

          {/* Three Dots (Dropdown Trigger) */}
          <span
            className="text-2xl text-gray-700 cursor-pointer ml-3"
            onClick={handleDropdownToggle}
          >
            &#x22EE; {/* Unicode for three dots */}
          </span>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md z-10 flex flex-col gap-2 p-3 min-w-[150px]">
              <span
                className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropdownItemClick("Edit")}
              >
                Edit
              </span>
              <span
                className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropdownItemClick("Delete")}
              >
                Delete
              </span>
              <span
                className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropdownItemClick("Share")}
              >
                Share
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
