import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CoinNumber from "./CoinNumber";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Player.css";
import PlayerStatus from "./PlayerStatus";
import { useSelector } from "react-redux";

const Player = ({ player, useHealthPotion, trainAttribute }) => {
  const healthPercentage = (player.health / 100) * 100;
  const experiencePercentage = (player.experience / (player.level * 100)) * 100;

  const { userInfo } = useSelector((state) => state.auth);
  const { heroInfo } = useSelector((state) => state.hero);
  return (
    <div className="player-container">
      <h2>{heroInfo.data?.name || heroInfo.name}</h2>
      <div>
        <p>Level: {heroInfo.data?.level || heroInfo.level}</p>
        <p>Gold: {heroInfo.data?.gold || heroInfo.gold}</p>
        <PlayerStatus
          player={player}
          name={`Energy: ${heroInfo.data?.energy || heroInfo.energy} / 100`}
          field="health"
        />
        <PlayerStatus
          player={player}
          name={`Experience: ${
            heroInfo.data?.experience || heroInfo.experience
          } / ${(heroInfo.data?.level || heroInfo.level) * 100}`}
          field="experience"
        />
      </div>
      <div>
        <p>Attributes:</p>
        <div className="attributes-container">
          <div className="attribute">
            Strength:{" "}
            {heroInfo.data?.attributes.strength || heroInfo.attributes.strength}
          </div>
          <CoinNumber
            number={
              5 *
              ((heroInfo.data?.attributes.strength ||
                heroInfo.attributes.strength) -
                9)
            }
            onClick={() => trainAttribute("strength")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Agility:{" "}
            {heroInfo.data?.attributes.agility || heroInfo.attributes.agility}
          </div>
          <CoinNumber
            number={
              5 *
              ((heroInfo.data?.attributes.agility ||
                heroInfo.attributes.agility) -
                9)
            }
            onClick={() => trainAttribute("agility")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Constitution:{" "}
            {heroInfo.data?.attributes.constitution ||
              heroInfo.attributes.constitution}
          </div>
          <CoinNumber
            number={
              5 *
              ((heroInfo.data?.attributes.constitution ||
                heroInfo.attributes.constitution) -
                9)
            }
            onClick={() => trainAttribute("constitution")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Intelligence:{" "}
            {heroInfo.data?.attributes.intelligence ||
              heroInfo.attributes.intelligence}
          </div>
          <CoinNumber
            number={
              5 *
              ((heroInfo.data?.attributes.intelligence ||
                heroInfo.attributes.intelligence) -
                9)
            }
            onClick={() => trainAttribute("intelligence")}
          />
        </div>
      </div>

      <p>Damage: {heroInfo.data?.damage || heroInfo.damage}</p>
      <p>Health Potions: {player.inventory.healthPotion}</p>
      <button onClick={() => useHealthPotion()}>Use Health Potion</button>
    </div>
  );
};

export default Player;
