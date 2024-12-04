'use client'
import { useState } from "react";
import RRB from "../topics/Rrb";
import NTPC from "../topics/Ntpc";
import UPPCS from "../topics/Uppse";
import CURRENTAFFAIRS from "../topics/CurrentAffairs";
import BIHARSSC from "../topics/BiharSsc";

export default function DynamicButton() {
  const [selectedButton, setSelectedButton] = useState("RRB");

  const buttonName = ["RRB", "NTPC", "UP PCS", "BIHAR SSC GS", "CURRENT AFFAIRS"];

  return (
    <>
      <main className="flex flex-row gap-2 w-full flex-1 overflow-x-scroll justify-center scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white p-2">
        {buttonName.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-all ${
              selectedButton === item
                ? "bg-black text-white border-white"
                : "bg-white text-black border-gray-400 hover:border-black hover:text-black"
            }`}
            onClick={() => setSelectedButton(item)}
          >
            {item}
          </button>
        ))}
      </main>
      <div className="mt-4">
        {selectedButton === "RRB" ? (
          <RRB />
        ) : selectedButton === "NTPC" ? (
          <NTPC />
        ) : selectedButton === "UP PCS" ? (
          <UPPCS />
        ) : selectedButton === "BIHAR SSC GS" ? (
          <BIHARSSC />
        ) : (
          <CURRENTAFFAIRS />
        )}
      </div>
    </>
  );
}


