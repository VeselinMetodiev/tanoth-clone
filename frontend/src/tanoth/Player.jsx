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
      <h2>{heroInfo.data.name}</h2>
      <div>
        <p>Level: {heroInfo.data.level}</p>
        <p>Gold: {heroInfo.data.gold}</p>
        <PlayerStatus
          player={player}
          name={`Energy: ${heroInfo.data.energy} / 100`}
          field="health"
        />
        <PlayerStatus
          player={player}
          name={`Experience: ${heroInfo.data.experience} / ${
            heroInfo.data.level * 100
          }`}
          field="experience"
        />
      </div>
      <div>
        <p>Attributes:</p>
        <div className="attributes-container">
          <div className="attribute">
            Strength: {heroInfo.data.attributes.strength}
          </div>
          <CoinNumber
            number={5 * (heroInfo.data.attributes.strength - 9)}
            onClick={() => trainAttribute("attack")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Agility: {heroInfo.data.attributes.agility}
          </div>
          <CoinNumber
            number={5 * (heroInfo.data.attributes.agility - 9)}
            onClick={() => trainAttribute("agility")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Stamina: {heroInfo.data.attributes.constitution}
          </div>
          <CoinNumber
            number={5 * (heroInfo.data.attributes.constitution - 9)}
            onClick={() => trainAttribute("stamina")}
          />
        </div>
        <div className="attributes-container">
          <div className="attribute">
            Intelligence: {heroInfo.data.attributes.intelligence}
          </div>
          <CoinNumber
            number={5 * (heroInfo.data.attributes.intelligence - 9)}
            onClick={() => trainAttribute("intelligence")}
          />
        </div>
      </div>

      <p>Damage: {heroInfo.data.damage}</p>
      <p>Health Potions: {player.inventory.healthPotion}</p>
      <button onClick={() => useHealthPotion()}>Use Health Potion</button>
    </div>
  );
};

export default Player;
