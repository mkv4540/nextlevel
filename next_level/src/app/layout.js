import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
// import AboutPage from "./about/page";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          style={{
            backgroundImage:
              "linear-gradient(to top, #ffffff 62%, #ccffff 100%)", // Replace with your desired color
            margin: "0",
            padding: "0",
          }}
        >
          <Navbar />
          {children}
          {/* <AboutPage /> */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
