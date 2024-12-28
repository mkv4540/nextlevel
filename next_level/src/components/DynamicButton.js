"use client"

import { useEffect, useState } from "react";
import DynamicCard from "./DynamicCard"; // Import your card component
import { dataAccordingToBtnSelected } from "../utils/data"; // Import your data
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper CSS
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DynamicButton = () => {
  const [selectedButton, setSelectedButton] = useState("RRB");
  const [selectedData, setSelectedData] = useState(null);

  const buttonName = [
    "RRB",
    "NTPC",
    "UP_PCS",
    "BIHAR_SSC_GS",
    "CURRENT_AFFAIRS",
  ];

  useEffect(() => {
    if (selectedButton) {
      const filtered = dataAccordingToBtnSelected.find((obj) =>
        Object.keys(obj).includes(selectedButton)
      );
      setSelectedData(filtered ? filtered[selectedButton] : null);
    }
  }, [selectedButton]);

  return (
    <div className="flex flex-col items-center">
      {/* Button Container */}
      <main className="flex flex-row flex-wrap gap-4 p-4 justify-center">
        {buttonName.map((item, index) => (
          <Button
            key={index}
            title={item}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </main>

      {/* Dynamic Cards Carousel */}
      <div className="w-full px-4">
        {selectedData && (
          <Swiper
            slidesPerView={4} // Number of cards visible
            spaceBetween={1} // Space between cards
            navigation={true} // Enable navigation arrows
            modules={[Navigation]} // Add Swiper modules here
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1, // 1 slide for small screens
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2, // 2 slides for medium screens
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 4, // 3 slides for large screens
                spaceBetween: 20,
              },
            }}
          >
            {selectedData.map((item, index) => (
              <SwiperSlide key={index}>
                <DynamicCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

const Button = ({ title, selectedButton, setSelectedButton }) => {
  const isSelected = selectedButton === title;

  return (
    <button
      className={`px-4 py-2 rounded-full border text-black whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
        isSelected
          ? "bg-black text-white border-white"
          : "bg-white border-gray-400 hover:border-black hover:text-black"
      }`}
      onClick={() => setSelectedButton(title)}
    >
      {title.split("_").join(" ")}
    </button>
  );
};

export default DynamicButton;
