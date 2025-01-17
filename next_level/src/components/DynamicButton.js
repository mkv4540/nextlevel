"use client"

import { useEffect, useState } from "react";
import DynamicCard from "./DynamicCard";
import YoutubePlayer from "./YoutubePlayer";

import { dataAccordingToBtnSelected } from "../utils/data";
import "swiper/css";
import "swiper/css/navigation";


const DynamicButton = () => {
  const [selectedButton, setSelectedButton] = useState("RRB"); // Default button selection
  const [selectedData, setSelectedData] = useState([]); // Initially empty, will be populated dynamically
  const [selectedVideoId, setSelectedVideoId] = useState(null);


  const handleOpenModal = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideoId(null);
  };

  const getVideoId = (url) => {
    try {
      const parsedUrl = new URL(url); // Parse the URL
      if (parsedUrl.searchParams.has("v")) {
        // Standard format with ?v=
        return parsedUrl.searchParams.get("v");
      } else if (parsedUrl.pathname.startsWith("/embed/")) {
        // Embed format
        return parsedUrl.pathname.split("/embed/")[1];
      } else if (parsedUrl.hostname === "youtu.be") {
        // Shortened format
        return parsedUrl.pathname.slice(1); // Remove the leading '/'
      } else {
        console.error("Unsupported URL format:", url);
        return null;
      }
    } catch (error) {
      console.error("Invalid URL:", url, error);
      return null;
    }
  };
  const buttonName = [
    "RRB",
    "NTPC",
    "UP_PCS",
    "BIHAR_SSC_GS",
    "CURRENT_AFFAIRS",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataAccordingToBtnSelected();
      if (selectedButton) {
        const filtered = data.find((obj) =>
          Object.keys(obj).includes(selectedButton)
        );
        setSelectedData(filtered ? filtered[selectedButton] : null);
      }
    };
    fetchData();
  }, [selectedButton]);



  return (
    <div className="flex flex-col items-center max-w-[1400px] mx-auto">
      {/* Button Container */}
      <div className="flex flex-wrap justify-center gap-3 px-4 mb-8">
        {buttonName.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${selectedButton === item
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setSelectedButton(item)}
          >
            {item.split("_").join(" ")}
          </button>
        ))}
      </div>

      {/* Video Cards */}

<div>
      {/* Multiple Cards */}
      <div style={{ display: "flex", gap: "1rem" , padding:"12px"}}>
        {selectedData.map((video) => (
          <DynamicCard
          style={{ display: "flex" , padding:"0px"}}
            key={video.title}
            title={video.title}
            videoId={video.ytURl}
            onButtonClick={() => handleOpenModal(getVideoId(video.ytURl))}
          />
        ))}
      </div>
      {selectedVideoId && (
        <YoutubePlayer videoId={selectedVideoId} onClose={handleCloseModal} />
      )}
    </div>

    </div>
  );
};

export default DynamicButton;
