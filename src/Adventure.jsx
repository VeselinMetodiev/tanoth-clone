// Adventure.js

import React, { useState } from "react";

const Adventure = ({ player, setPlayer }) => {
  const [adventureResult, setAdventureResult] = useState(null);

  const startAdventure = (option) => {
    const result = simulateAdventure(option);
    setAdventureResult(result);

    // Update player based on the adventure result
    if (result.success) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        experience: prevPlayer.experience + result.experienceReward,
        gold: prevPlayer.gold + result.goldReward,
      }));
    }
  };

  const simulateAdventure = (option) => {
    // Simulate different adventure scenarios
    const scenarios = [
      {
        option: "Option 1",
        success: true,
        experienceReward: 20,
        goldReward: 10,
      },
      {
        option: "Option 2",
        success: false,
        experienceReward: 0,
        goldReward: 0,
      },
      {
        option: "Option 3",
        success: true,
        experienceReward: 15,
        goldReward: 5,
      },
      {
        option: "Option 4",
        success: false,
        experienceReward: 0,
        goldReward: 0,
      },
    ];

    return scenarios.find((scenario) => scenario.option === option);
  };

  return (
    <div>
      <h2>Adventure Screen</h2>
      <p>Choose an option:</p>
      <button onClick={() => startAdventure("Option 1")}>Option 1</button>
      <button onClick={() => startAdventure("Option 2")}>Option 2</button>
      <button onClick={() => startAdventure("Option 3")}>Option 3</button>
      <button onClick={() => startAdventure("Option 4")}>Option 4</button>

      {adventureResult && (
        <div>
          <p>Result: {adventureResult.success ? "Success!" : "Failure!"}</p>
          {adventureResult.success && (
            <p>
              You gained {adventureResult.experienceReward} experience and{" "}
              {adventureResult.goldReward} gold.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Adventure;
