"use client";

const QuizCard = ({ quizData }) => {
  const styles = {
    cardContainer: {
      display: "flex",
      flexDirection: "row", // Ensure cards are laid out in a row
      flexWrap: "wrap", // Allow wrapping if there are too many cards
      justifyContent: "flex-start", // Align cards to the left
      alignItems: "flex-start", // Align items at the top
      gap: "20px", // Space between cards
      padding: "20px",
    },
    card: {
      width: "300px",
      margin: "0", // No extra margin on cards
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
    description: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.cardContainer}>
      {quizData.map((quiz, index) => (
        <div
          key={index}
          style={styles.card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
          }
        >
          <div style={styles.title}>{quiz.title}</div>
          <div style={styles.description}>{quiz.description}</div>
          <button
            style={styles.button}
            onClick={() => window.open(quiz.link, "_blank")}
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
