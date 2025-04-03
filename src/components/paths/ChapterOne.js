import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChapterOne.css";

const ChapterOne = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(
    "Hey, this is my game project!"
  );
  const [showOrbs, setShowOrbs] = useState(false);
  const [hoveredOrb, setHoveredOrb] = useState(null);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleNextClick = () => {
    setShowNextButton(false);
    setCurrentText("What should we do now?");
    setTimeout(() => setShowOrbs(true), 300);
  };

  const handleOrbHover = (action) => {
    setHoveredOrb(action);
    setCurrentText("Let's check the computer.");
  };
  const handleOrbLeave = () => {
    setHoveredOrb(null);
    setCurrentText("What should we do now?");
  };
  const handleOrbClick = (action) => {
    navigate("/ការស្លាប់");
  };

  return (
    <div className="chapter-one-container">
      <div className="text-box">{currentText}</div>
      {showNextButton && (
        <button onClick={handleNextClick} className="next-button">
          Next
        </button>
      )}

      {showOrbs && (
        <div>
          <div
            className="orb"
            onClick={handleOrbClick}
            onMouseEnter={() => handleOrbHover("checkComputer")}
            onMouseLeave={handleOrbLeave}
          >
            {hoveredOrb === "checkComputer" && "Check Computer"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterOne;
