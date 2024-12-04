import { useState } from "react";
// import "./DynamicCard.css";
import RRB from "../Topics/RRB";
import NTPC from "../Topics/NTPC";
import UPPCS from "../Topics/UPPCS";
import CURRENTAFFAIRS from "../Topics/CURRENTAFFAIRS";
import BIHARSSC from "../Topics/BIHARSSC";

function DynamicCard() {
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
  // Styles for the card
  const styles = {
    cardContainer: {
      display: "flex",
      justifyContent: "flex-start", // Align the card to the left
      padding: "20px",
    },
    card: {
      width: "300px",
      margin: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px", // space between buttons
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
    },
    quizButton: {
      backgroundColor: "#4CAF50", // Green color for quiz button
    },
  };

  // const handleCardClick = () => {
  //   setSelectedCard(title); // Update selected card on click
  // };
  const handleCardClick = () => {
    // Redirect to YouTube link
    window.open("https://www.youtube.com/watch?v=GB2kRJlR9v4", "_blank");
  };

  return (
    <div
      style={styles.cardContainer}
      onClick={handleCardClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
      }
    >
      <div
        style={{
          ...styles.card,
          backgroundColor: selectedCard === title ? "#d4f1d4" : "#f9f9f9", // Highlight selected card
        }}
      >
        <img
          src="https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
          alt="YouTube Thumbnail"
          style={styles.thumbnail}
        />
        <div style={styles.title}>{title}</div>

        {/* Button container to hold both buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click bubbling
              window.open(
                "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                "_blank"
              );
            }}
          >
            Watch on YouTube
          </button>

          <button
            style={{ ...styles.button, ...styles.quizButton }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click bubbling
              window.open("", "_blank"); // Replace with actual quiz link
            }}
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
