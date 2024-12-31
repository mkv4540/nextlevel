

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DynamicCard = ({ data }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  // Define styles (optional if you're using Tailwind for everything)
  const styles = {
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      zIndex: "10",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px",
      minWidth: "150px",
    },
    dropdownItem: {
      padding: "8px 10px",
      borderRadius: "3px",
      cursor: "pointer",
      color: "#333",
      textDecoration: "none",
      backgroundColor: "#f9f9f9",
      transition: "background-color 0.3s ease",
    },
  };

  // Dropdown visibility toggle
  const handleDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent card click
    setDropdownVisible((prev) => !prev);
  };

  // Dropdown item click handler
  const handleDropdownItemClick = (action) => {
    alert(`You selected: ${action}`);
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Card click handler
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
            className="px-4 py-2 bg-red-600 text-white rounded-md font-bold transition-colors hover:bg-red-800"
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
              router.push("/quiz"); // Redirect to the quiz page
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
            <div style={styles.dropdownMenu}>
              <span
                style={styles.dropdownItem}
                onClick={() => handleDropdownItemClick("Edit")}
              >
                Edit
              </span>
              <span
                style={styles.dropdownItem}
                onClick={() => handleDropdownItemClick("Delete")}
              >
                Delete
              </span>
              <span
                style={styles.dropdownItem}
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

