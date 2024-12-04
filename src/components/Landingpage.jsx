const Landingpage = () => {
  const styles = {
    page: {
      width: "100%", // Full width of the viewport
      height: "100%", // Full height of the viewport
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // position: "relative", // To position the text over the image
      overflow: "hidden", // Ensures no content overflows
    },
    pageImage: {
      width: "100%", // Make the image responsive
      height: "100%", // Stretches to fill the container
      objectFit: "contain", // Ensures the entire image is visible without cutting
      // position: "absolute", // Places the image behind other content
      // top: 0,
      // left: 0,
    },
    text: {
      // position: "absolute", // Positions text over the image
      color: "#fff", // Text color
      fontSize: "3rem", // Font size for the text
      fontWeight: "bold",
      zIndex: 1, // Ensures the text is above the image
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Adds a shadow for better visibility
    },
  };

  return (
    <div style={styles.page}>
      <img src="/try.png" alt="Page" style={styles.pageImage} />
      <span style={styles.text}></span>
    </div>
  );
};

export default Landingpage;
