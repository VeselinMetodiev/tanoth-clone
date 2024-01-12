// App.js

import React, { useState } from "react";
import Player from "./Player";
import Adventure from "./Adventure";
import Merchant from "./Merchant";
import Dungeon from "./Dungeon";
import Navbar from "./Navbar";

import "./App.css";
import Alchemist from "./Alchemist";
import Work from "./Work";

function App() {
  const [activeScreen, setActiveScreen] = useState("Character");
  const [player, setPlayer] = useState({
    name: "Player",
    level: 1,
    experience: 0,
    gold: 100, // Starting gold
    health: 100,
    damage: 10,
    inventory: {
      healthPotion: 3,
    },
    // New attributes
    attack: 10,
    agility: 10,
    stamina: 10,
    intelligence: 10,
  });

  const trainAttribute = (attribute) => {
    const trainingCost = 5 * (player[attribute] - 9);

    if (player.gold >= trainingCost) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        gold: prevPlayer.gold - trainingCost,
        [attribute]: prevPlayer[attribute] + 1,
      }));
    } else {
      alert("You don't have enough gold to train this attribute!");
    }
  };

  return (
    <div className="clearfix">
      <Navbar setActiveScreen={setActiveScreen} />
      <div className="main-content">
        {activeScreen === "Character" && (
          <Player
            player={player}
            useHealthPotion={() => useHealthPotion()}
            trainAttribute={trainAttribute}
          />
        )}
        {activeScreen === "Adventure" && (
          <Adventure player={player} setPlayer={setPlayer} />
        )}
        {activeScreen === "Merchant" && (
          <Merchant player={player} setPlayer={setPlayer} />
        )}
        {activeScreen === "Dungeon" && (
          <Dungeon player={player} setPlayer={setPlayer} />
        )}
        {activeScreen === "Alchemist" && (
          <Alchemist player={player} setPlayer={setPlayer} />
        )}
        {activeScreen === "Work" && (
          <Work player={player} setPlayer={setPlayer} />
        )}
      </div>
    </div>
  );
}

export default App;
