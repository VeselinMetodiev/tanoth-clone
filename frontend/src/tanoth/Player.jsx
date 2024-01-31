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

  return (
    <div className="player-container">
      <h2>{userInfo.name}</h2>
      <div>
        <p>Level: {player.level}</p>
        <p>Gold: {player.gold}</p>
        <PlayerStatus
          player={player}
          name={`Energy: ${player.health} / 100`}
          field="health"
        />
        <PlayerStatus
          player={player}
          name={`Experience: ${player.experience} / ${player.level * 100}`}
          field="experience"
        />
      </div>
      <div>
        <p>Attributes:</p>
        <div className="attributes-container">
          <div className="attribute">Attack: {player.attack}</div>
          <CoinNumber
            number={5 * (player.attack - 9)}
            onClick={() => trainAttribute("attack")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">Agility: {player.agility}</div>
          <CoinNumber
            number={5 * (player.agility - 9)}
            onClick={() => trainAttribute("agility")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">Stamina: {player.stamina}</div>
          <CoinNumber
            number={5 * (player.stamina - 9)}
            onClick={() => trainAttribute("stamina")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">Intelligence: {player.intelligence}</div>
          <CoinNumber
            number={5 * (player.intelligence - 9)}
            onClick={() => trainAttribute("intelligence")}
          />
        </div>
      </div>

      <p>Damage: {player.damage}</p>
      <p>Health Potions: {player.inventory.healthPotion}</p>
      <button onClick={() => useHealthPotion()}>Use Health Potion</button>
    </div>
  );
};

export default Player;
