import React, { useState } from "react";

const Navbar = () => {
  // Inline styles for simplicity
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#0c1c0c",
      color: "#fff",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
    logoImage: {
      width: "40px",
      height: "40px",
    },
    menu: {
      display: "flex",
      alignItems: "center",
      gap: "150px",
    },
    link: {
      position: "relative",
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
    dropdown: {
      position: "absolute",
      top: "30px",
      left: "0",
      backgroundColor: "#fff",
      padding: "10px",
      display: "none",
      flexDirection: "column",
      gap: "10px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    dropdownItem: {
      color: "#333",
      textDecoration: "none",
      fontSize: "14px",
      padding: "5px",
      borderRadius: "3px",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#555",
    },
    linkHover: {
      display: "flex",
    },
    search: {
      display: "flex",
      alignItems: "center",
    },
    searchInput: {
      padding: "5px",
      fontSize: "14px",
    },
    searchButton: {
      padding: "5px 10px",
      backgroundColor: "#555",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState({
    about: false,
    services: false,
    quiz: false,
    contact: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <img src="/logo.png" alt="Logo" style={styles.logoImage} />
        <span>Next Level Academy</span>
      </div>

      {/* Links Section */}
      <div style={styles.menu}>
        {/* About Us Dropdown */}
        <div
          style={styles.link}
          onMouseEnter={() => toggleDropdown("about")}
          onMouseLeave={() => toggleDropdown("about")}
        >
          About Us
          <div
            style={{
              ...styles.dropdown,
              display: dropdownOpen.about ? "flex" : "none",
            }}
          >
            <a href="#our-team" style={styles.dropdownItem}>
              Our Team
            </a>
            <a href="#our-mission" style={styles.dropdownItem}>
              Our Mission
            </a>
          </div>
        </div>

        {/* Services Dropdown */}
        <div
          style={styles.link}
          onMouseEnter={() => toggleDropdown("services")}
          onMouseLeave={() => toggleDropdown("services")}
        >
          Services
          <div
            style={{
              ...styles.dropdown,
              display: dropdownOpen.services ? "flex" : "none",
            }}
          >
            <a href="#consulting" style={styles.dropdownItem}>
              Consulting
            </a>
            <a href="#workshops" style={styles.dropdownItem}>
              Workshops
            </a>
          </div>
        </div>

        {/* Quiz Dropdown */}
        <div
          style={styles.link}
          onMouseEnter={() => toggleDropdown("quiz")}
          onMouseLeave={() => toggleDropdown("quiz")}
        >
          Quiz
          <div
            style={{
              ...styles.dropdown,
              display: dropdownOpen.quiz ? "flex" : "none",
            }}
          >
            <a href="#quiz-1" style={styles.dropdownItem}>
              Quiz 1
            </a>
            <a href="#quiz-2" style={styles.dropdownItem}>
              Quiz 2
            </a>
          </div>
        </div>

        {/* Contact Dropdown */}
        <div
          style={styles.link}
          onMouseEnter={() => toggleDropdown("contact")}
          onMouseLeave={() => toggleDropdown("contact")}
        >
          Contact
          <div
            style={{
              ...styles.dropdown,
              display: dropdownOpen.contact ? "flex" : "none",
            }}
          >
            <a href="#email" style={styles.dropdownItem}>
              Email
            </a>
            <a href="#phone" style={styles.dropdownItem}>
              Phone
            </a>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div style={styles.search}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
        <button style={styles.searchButton}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
