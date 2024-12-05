"use client";

import { useEffect, useState } from "react";
import DynamicCard from "./DynamicCard"; // Import DynamicCard
import { dataAccordingToBtnSelected } from "../utils/data"; // Import data

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

  // Inline styles
  const styles = {
    containermain: {
      width: "100%",
      flexDirection: "row",
      gap: "10px",
      flex: 1,
      display: "flex",
      padding: "10px",
      // overflowX: "scroll",
      scrollbarWidth: "thin", // Firefox scrollbar width
    },
    scrollbar: {
      WebkitScrollbar: {
        width: "20px", // Width of the scrollbar
        height: "6px",
      },
      WebkitScrollbarTrack: {
        backgroundColor: "white", // Track color
      },
      WebkitScrollbarThumb: {
        backgroundColor: "gray",
        borderRadius: "10px",
        width: "10px",
      },
    },
    dynamicButton: {
      padding: "8px 14px",
      borderRadius: "20px",
      border: "1px solid #86a1ae",
      backgroundColor: "#fff",
      color: "#000",
      cursor: "pointer",
      whiteSpace: "nowrap", // Prevent text wrapping
      overflow: "hidden", // Hide overflow text
      textOverflow: "ellipsis", // Show ellipsis if text overflows
      transition: "all 0.3s ease", // Smooth hover effects
    },
    dynamicButtonHover: {
      border: "1px solid #0c1c0c",
      color: "#0c1c0c",
    },
    dynamicButtonSelected: {
      backgroundColor: "#0c1c0c",
      border: "1px solid #fff",
      color: "#fff",
    },
    carouselContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      overflowX: "auto",
      padding: "10px",
      justifyContent: "flex-start",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <main style={styles.containermain}>
        {buttonName.map((item, index) => (
          <div key={index}>
            <Button
              title={item}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
              styles={styles}
            />
          </div>
        ))}
      </main>
      <div style={styles.carouselContainer}>
        {selectedData &&
          selectedData.map((item, index) => (
            <DynamicCard key={index} data={item} />
          ))}
      </div>
    </div>
  );
};

const Button = ({ title, selectedButton, setSelectedButton, styles }) => {
  const isSelected = selectedButton === title;

  return (
    <button
      style={{
        ...styles.dynamicButton,
        ...(isSelected ? styles.dynamicButtonSelected : {}),
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.border = styles.dynamicButtonHover.border;
          e.currentTarget.style.color = styles.dynamicButtonHover.color;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.border = "1px solid #86a1ae";
          e.currentTarget.style.color = "#000";
        }
      }}
      onClick={() => setSelectedButton(title)}
    >
      {title.split("_").join(" ")}
    </button>
  );
};

export default DynamicButton;
