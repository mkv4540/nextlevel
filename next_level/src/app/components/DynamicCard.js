'use client'
import { useState } from "react";

import RRB from "../topics/Rrb";
import NTPC from "../topics/Ntpc";
import UPPCS from "../topics/Uppse";
import CURRENTAFFAIRS from "../topics/CurrentAffairs";
import BIHARSSC from "../topics/BiharSsc";
import Image from "next/image";
export default function DynamicCard() {
  const [selectedCard, setSelectedCard] = useState("RRB");

  let cardNames = ["RRB", "NTPC", "UP PCS", "BIHAR SSC GS", "CURRENT AFFAIRS"];

  return (
    <div>
      <main className="card-container">
        {cardNames.map((item, index) => (
          <div key={index} onClick={() => setSelectedCard(item)}>
            <Card
              title={item}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          </div>
        ))}
      </main>

      <div>
        {selectedCard === "RRB" ? (
          <RRB />
        ) : selectedCard === "NTPC" ? (
          <NTPC />
        ) : selectedCard === "UP PCS" ? (
          <UPPCS />
        ) : selectedCard === "BIHAR SSC GS" ? (
          <BIHARSSC />
        ) : (
          <CURRENTAFFAIRS />
        )}
      </div>
    </div>
  );
}
const Card = ({ title, selectedCard, setSelectedCard }) => {
  const handleCardClick = () => {
    window.open("https://www.youtube.com/watch?v=GB2kRJlR9v4", "_blank");
  };

  return (
    <div
      className="flex justify-start p-5"
      onClick={handleCardClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
      }
    >
      <div
        className={`w-72 m-5 p-4 border rounded-xl text-center cursor-pointer transition-all duration-200 ease-in-out ${
          selectedCard === title ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <Image
          src="/ytphoto1.png"
          alt="YouTube Thumbnail"
          width={40}
          height={40}
          className="object-cover rounded-md"
        />
        <div className="font-bold text-gray-800 mb-2 text-lg">{title}</div>
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                "_blank"
              );
            }}
          >
            Watch on YouTube
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.open("", "_blank");
            }}
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
