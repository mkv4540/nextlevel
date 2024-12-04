import { useState } from "react";
import "./DynamicButton.css";
import RRB from "../Topics/RRB";
import NTPC from "../Topics/NTPC";
import UPPCS from "../Topics/UPPCS";
import CURRENTAFFAIRS from "../Topics/CURRENTAFFAIRS";
import BIHARSSC from "../Topics/BIHARSSC";

function DynamicButton() {
  const [selectedButton, setSelectedButton] = useState("RRB");
  // let buttonName = [
  //   "UGC NET/SET (Hinglish)",
  //   "SSC CGL (Guaranteed Selection Program) 2025",
  //   "RRB NTPC",
  //   "SSC GD",
  //   "PRT, TGT & PGT Mahapack",
  //   "CTET Guaranteed Qualification Program DEC 2024 (GQP)",
  //   "Banking & Insurance Super Pack",
  //   "Nirnay IAS 2025 - Officers Batch - 3 (Hinglish)",
  // ];

  let buttonName = ["RRB", "NTPC", "UP PCS", "BIHAR SSC GS", "CURRENT AFFAIRS"];

  return (
    <>
      <main
        style={{
          flexDirection: "row",
          gap: "10px",
          flex: 1,
          width: "100%",
          display: "flex",
          // padding: "10px",
          overflowX: "scroll",
          justifyContent: "center",
        }}
        className="containermain"
      >
        {buttonName.map((item, index) => (
          <div key={index}>
            <Button
              title={item}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </div>
        ))}
      </main>
      <div>
        {selectedButton === "RRB" ? (
          <RRB />
        ) : selectedButton === "NTPC" ? (
          <NTPC />
        ) : selectedButton === "UP PCS" ? (
          <UPPCS />
        ) : selectedButton === "BIHAR SSC GS" ? (
          <BIHARSSC />
        ) : (
          <CURRENTAFFAIRS />
        )}
      </div>
    </>
  );
}

const Button = ({ title, selectedButton, setSelectedButton }) => {
  return (
    <button
      className={`dynamicButton ${selectedButton === title ? "selected" : ""}`}
      onClick={() => setSelectedButton(title)}
    >
      {title}
    </button>
  );
};
export default DynamicButton;
