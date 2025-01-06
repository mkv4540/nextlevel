"use client"

import { useState } from "react";
import DynamicCard from "./DynamicCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DynamicButton = () => {
  const [selectedButton, setSelectedButton] = useState("RRB");

  const buttonName = [
    "RRB",
    "NTPC",
    "UP PCS",
    "BIHAR SSC GS",
    "CURRENT AFFAIRS",
  ];

  // Video data with real YouTube videos
  const videoData = {
    "RRB": [
      {
        title: "RRB NTPC Previous Year Questions Part 1",
        ytURl: "https://www.youtube.com/watch?v=GB2kRJlR9v4",
      },
      {
        title: "RRB NTPC Previous Year Questions Part 2",
        ytURl: "https://www.youtube.com/watch?v=another_video_id",
      }
    ],
    "NTPC": [
      {
        title: "NTPC Complete Syllabus",
        ytURl: "https://www.youtube.com/watch?v=ntpc_video_id",
      }
    ],
    "UP PCS": [
      {
        title: "UP PCS Preparation Strategy",
        ytURl: "https://www.youtube.com/watch?v=uppcs_video_id",
      }
    ],
    "BIHAR SSC GS": [
      {
        title: "Bihar SSC GS Complete Course",
        ytURl: "https://www.youtube.com/watch?v=bihar_video_id",
      }
    ],
    "CURRENT AFFAIRS": [
      {
        title: "Daily Current Affairs Updates",
        ytURl: "https://www.youtube.com/watch?v=current_affairs_id",
      }
    ]
  };

  return (
    <div className="flex flex-col items-center px-4">
      {/* Button Container */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {buttonName.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border text-sm md:text-base whitespace-nowrap 
              ${selectedButton === item 
                ? "bg-black text-white border-white" 
                : "bg-white text-black border-gray-400 hover:border-black"
              }`}
            onClick={() => setSelectedButton(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Video Swiper */}
      {videoData[selectedButton] && (
        <div className="w-full max-w-4xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            className="mySwiper"
          >
            {videoData[selectedButton].map((video, index) => (
              <SwiperSlide key={index}>
                <DynamicCard data={video} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default DynamicButton;
