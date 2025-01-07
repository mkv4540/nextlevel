"use client"

import { useEffect, useState } from "react";
import DynamicCard from "./DynamicCard";
import { dataAccordingToBtnSelected } from "../utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
    <div className="flex flex-col items-center max-w-[1400px] mx-auto">
      {/* Button Container */}
      <div className="flex flex-wrap gap-3 justify-center mb-8 px-4">
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
      {selectedData && (
        <div className="w-full px-4">
          {/* Mobile View (Single Card) */}
          <div className="md:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {selectedData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <DynamicCard data={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tablet View (2 Cards) */}
          <div className="hidden md:block lg:hidden">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {selectedData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <DynamicCard data={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop View (4 Cards) */}
          <div className="hidden lg:block">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {selectedData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <DynamicCard data={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicButton;