import "./App.css";
import Landingpage from "./components/landingpage";
import Navbar from "./components/navbar";
import DynamicButton from "./components/Button/DynamicButton";
import DynamicCard from "./components/cards/DynamicCard";
function App() {
  return (
    <div className="" style={{ width: "100%" }}>
      <Navbar />

      <div>
        <Landingpage />
      </div>
      {/* <h1>Popular Exams</h1> */}
      <div style={{ padding: 10 }}>
        <DynamicButton />
        <DynamicCard />
      </div>
    </div>
  );
}

export default App;
