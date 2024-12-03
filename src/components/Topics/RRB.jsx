const RRB = () => {
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
    thumbnail: {
      width: "100%",
      borderRadius: "5px",
      marginBottom: "10px",
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

  const handleCardClick = () => {
    // Redirect to YouTube link
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  const handleQuizClick = (e) => {
    e.stopPropagation(); // Prevent click bubbling
    window.open("", "_blank"); // Replace with actual quiz link
  };

  return (
    <div style={styles.cardContainer}>
      <div
        style={styles.card}
        onClick={handleCardClick}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
        }
      >
        <img
          src="https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
          alt="YouTube Thumbnail"
          style={styles.thumbnail}
        />
        <div style={styles.title}>RRB NTPC</div>

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
            onClick={handleQuizClick}
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default RRB;
