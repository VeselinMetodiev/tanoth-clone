// App.js

import React, { useEffect, useState } from "react";
import Player from "../tanoth/Player";
import Adventure from "../tanoth/Adventure";
import Merchant from "../tanoth/Merchant";
import Dungeon from "../tanoth/Dungeon";
import HallOfFame from "../tanoth/HallOfFame";
import Navbar from "../tanoth/Navbar";
import Alchemist from "../tanoth/Alchemist";
import Work from "../tanoth/Work";
import "./TanothScreen.css";
import { useUpdateCharacterByIdMutation } from "../slices/characterApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setHero } from "../slices/heroSlice";

function App() {
  const { heroInfo } = useSelector((state) => state.hero);

  const [updateCharacterById, { isLoading, isError }] =
    useUpdateCharacterByIdMutation();
  const dispatch = useDispatch();

  const [activeScreen, setActiveScreen] = useState("Character");
  const [player, setPlayer] = useState(heroInfo);
  console.log(player);

  const trainAttribute = async (attribute) => {
    console.log({ attribute });
    console.log("attributes: " + JSON.stringify(player.attributes));
    console.log("attribute: " + player.attributes[attribute]);
    const trainingCost = 5 * (player.attributes[attribute] - 9);
    console.log({ trainingCost });
    if (player.gold >= trainingCost) {
      const newStats = {
        ...player,
        gold: player.gold - trainingCost,
        attributes: {
          ...player.attributes,
          [attribute]: player.attributes[attribute] + 1,
        },
      };
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        gold: prevPlayer.gold - trainingCost,
        attributes: {
          ...prevPlayer.attributes,
          [attribute]: prevPlayer.attributes[attribute] + 1,
        },
      }));
      console.log({ player });
      try {
        const res = await updateCharacterById({
          id: heroInfo.data?._id || heroInfo._id,
          data: newStats,
        }).unwrap();
        console.log({ res });
        dispatch(setHero({ ...res }));
      } catch (error) {
        console.error("Error updating character:", error);
      }
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
        {activeScreen === "HallOfFame" && <HallOfFame player={player} />}
      </div>
    </div>
  );
}

export default App;
