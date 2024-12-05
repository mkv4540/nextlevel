import Footer from "../components/Footer";

// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "linear-gradient(190deg,#fff,#d3d4f2)", // Replace with your desired color
          margin: "0",
          padding: "0",
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
