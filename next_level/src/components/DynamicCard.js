"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DynamicCard = ({ data }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const getVideoId = (url) => {
    const videoId = url.split('v=')[1];
    return videoId;
  };

  return (
    <div className="w-[300px] bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail Section */}
      <div className="relative aspect-video">
        <img
          src={`https://img.youtube.com/vi/${getVideoId(data.ytURl)}/maxresdefault.jpg`}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {data.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">Next Level Academy</p>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.ytURl, "_blank");
            }}
            className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Watch on YouTube
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const videoId = getVideoId(data.ytURl);
              router.push(`/quiz?videoId=${videoId}`);
            }}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;                                                                                        