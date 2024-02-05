import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CoinNumber from "./CoinNumber";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Player.css";
import PlayerStatus from "./PlayerStatus";
import { useSelector } from "react-redux";

const Player = ({ player, useHealthPotion, trainAttribute }) => {
  const healthPercentage = (player?.energy || 0 / 100) * 100;
  const experiencePercentage =
    (player?.experience || 0 / (player?.level || 1 * 100)) * 100;

  const { userInfo } = useSelector((state) => state.auth);
  const { heroInfo } = useSelector((state) => state.hero);
  return (
    <div className="player-container">
      <h2>{heroInfo.name}</h2>
      <div>
        <p>Level: {heroInfo.level}</p>
        <p>Gold: {heroInfo.gold}</p>
        <PlayerStatus
          player={player}
          name={`Energy: ${heroInfo.energy} / 100`}
          field="health"
        />
        <PlayerStatus
          player={player}
          name={`Experience: ${heroInfo.experience} / ${heroInfo.level * 100}`}
          field="experience"
        />
      </div>
      <div>
        <p>Attributes:</p>
        <div className="attributes-container">
          <div className="attribute">
            Strength: {heroInfo.attributes.strength}
          </div>
          <CoinNumber
            number={5 * (heroInfo.attributes.strength - 9)}
            onClick={() => trainAttribute("strength")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Agility: {heroInfo.attributes.agility}
          </div>
          <CoinNumber
            number={5 * (heroInfo.attributes.agility - 9)}
            onClick={() => trainAttribute("agility")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Constitution: {heroInfo.attributes.constitution}
          </div>
          <CoinNumber
            number={5 * (heroInfo.attributes.constitution - 9)}
            onClick={() => trainAttribute("constitution")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Intelligence: {heroInfo.attributes.intelligence}
          </div>
          <CoinNumber
            number={5 * (heroInfo.attributes.intelligence - 9)}
            onClick={() => trainAttribute("intelligence")}
          />
        </div>
      </div>

      <p>Damage: {heroInfo.damage}</p>
      <p>Health Potions: {player.inventory?.healthPotion || ""}</p>
      <button onClick={() => useHealthPotion()}>Use Health Potion</button>
    </div>
  );
};

export default Player;
