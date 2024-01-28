import React from "react";
import "./PlayerStatus.css"; // Import the CSS file

const PlayerStatus = ({ player, field, name }) => {
  const healthPercentage = (player[field] / 100) * 100;

  return (
    <div className="energy-container">
      <div className="energy-text">{name}</div>
      <progress
        className="progress-bar"
        value={healthPercentage}
        max="100"
      ></progress>
    </div>
  );
};

export default PlayerStatus;
