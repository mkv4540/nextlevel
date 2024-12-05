"use client";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "20px 0",
      position: "relative",
      bottom: "0",
      width: "100%",
    },
    link: {
      color: "#4CAF50",
      textDecoration: "none",
      margin: "0 10px",
    },
    text: {
      margin: "10px 0",
      fontSize: "14px",
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {new Date().getFullYear()} Next Level Academy. All rights
        reserved.
      </p>
      <p>
        <a href="/terms" style={styles.link}>
          Terms
        </a>
        |
        <a href="/privacy" style={styles.link}>
          Privacy Policy
        </a>
        |
        <a href="/contact" style={styles.link}>
          Contact Us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
