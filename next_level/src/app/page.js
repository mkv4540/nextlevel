'use client'


import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DynamicButton from "./components/DynamicButton";
import DynamicCard from "./components/DynamicCard";
export default function App() {
  return (
    <div className="" style={{ width: "100%" }}>
      <Navbar />

      <div>
        <Hero />
      </div>
    
      <div style={{ padding: 10 }}>
        <DynamicButton />
        <DynamicCard />
      </div>
    </div>
  );
}


