"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DynamicCard = ({ data }) => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownItemClick = (item) => {
    // Handle dropdown item click
  };

  return (
    <div className="p-4 w-full">
      <div className="max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-md bg-gray-50 overflow-hidden">
        <div className="flex flex-col">
          {/* Video Section */}
          <div className="w-full">
            <div className="aspect-video relative">
              <img
                src={
                  data.ytThumb
                    ? data.ytThumb
                    : "https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
                }
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <div className="text-lg font-bold text-gray-800 mb-4">
              {data.title || "Title"}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-3 flex-1">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md font-bold transition-colors hover:bg-red-800 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      data.ytURl || "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                      "_blank"
                    );
                  }}
                >
                  Watch on YouTube
                </button>

                <button
                  className="px-4 py-2 bg-blue-700 text-white rounded-md font-bold transition-colors hover:bg-blue-800 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/quiz");
                  }}
                >
                  Quiz
                </button>
              </div>

              {/* Three Dots Menu */}
              <div className="relative">
                <span
                  className="text-2xl text-gray-700 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                  onClick={handleDropdownToggle}
                >
                  &#x22EE;
                </span>

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
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
