import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          style={{
            backgroundImage: "linear-gradient(190deg,#fff,#d3d4f2)", // Replace with your desired color
            margin: "0",
            padding: "0",
          }}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
