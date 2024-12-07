"use client"

import { useState,  } from "react";
import { useRouter } from "next/navigation";

const DynamicCard = ({ data }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const styles = {
    cardContainer: {
      display: "flex",
      justifyContent: "flex-start",
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
    thumbnail: {
      width: "100%",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "15px",
      position: "relative", // Required for dropdown positioning
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "Red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    quizButton: {
      backgroundColor: "#28A745",
    },
    moreOptions: {
      fontSize: "24px",
      color: "#333",
      cursor: "pointer",
      marginLeft: "10px",
    },
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      zIndex: "10",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px",
      minWidth: "150px",
    },
    dropdownItem: {
      padding: "8px 10px",
      borderRadius: "3px",
      cursor: "pointer",
      color: "#333",
      textDecoration: "none",
      backgroundColor: "#f9f9f9",
      transition: "background-color 0.3s ease",
    },
    dropdownItemHover: {
      backgroundColor: "#ddd",
    },
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent card click
    setDropdownVisible((prev) => !prev);
  };

  const handleDropdownItemClick = (action) => {
    alert(`You selected: ${action}`);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const handleCardClick = (ytURL) => {
    window.open(ytURL, "_blank");
  };

  return (
    <div
      style={styles.cardContainer}
      onClick={() => handleCardClick(data.ytURl)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
      }
    >
      <div style={styles.card}>
        {/* Thumbnail */}
        <img
          src={
            data.ytThumb
              ? data.ytThumb
              : "https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
          }
          alt="YouTube Thumbnail"
          style={styles.thumbnail}
        />
        {/* Title */}
        <div style={styles.title}>{data.title || "Title"}</div>

        {/* Button Container */}
        <div style={styles.buttonContainer}>
          {/* Watch on YouTube Button */}
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click bubbling
              window.open(
                data.ytURl || "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                "_blank"
              );
            }}
          >
            Watch on YouTube
          </button>

          {/* Quiz Button */}
          <button
            style={{ ...styles.button, ...styles.quizButton }}
            onClick={(e) => {
            e.stopPropagation(); // Prevent click bubbling
            router.push("/quiz"); // Redirect to the quiz page
          }}
          >
          Quiz
          </button>

          {/* Three Dots (Dropdown Trigger) */}
          <span style={styles.moreOptions} onClick={handleDropdownToggle}>
            &#x22EE; {/* Unicode for three dots */}
          </span>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div style={styles.dropdownMenu}>
              <span
                style={styles.dropdownItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.dropdownItemHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onClick={() => handleDropdownItemClick("Edit")}
              >
                Edit
              </span>
              <span
                style={styles.dropdownItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.dropdownItemHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onClick={() => handleDropdownItemClick("Delete")}
              >
                Delete
              </span>
              <span
                style={styles.dropdownItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.dropdownItemHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onClick={() => handleDropdownItemClick("Share")}
              >
                Share
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
