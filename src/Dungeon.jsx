// Dungeon.js

import React, { useState, useEffect } from "react";

const Dungeon = ({ player, setPlayer }) => {
  const [monster, setMonster] = useState(null);
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [fightLog, setFightLog] = useState([]);

  const startDungeon = () => {
    const newMonster = generateMonster();
    setMonster(newMonster);
  };

  const generateMonster = () => {
    const monsterTypes = ["Goblin", "Skeleton", "Orc", "Spider"];
    const randomType =
      monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    const health = Math.floor(Math.random() * 50) + 50; // Random health between 50 and 100
    const damage = Math.floor(Math.random() * 10) + 5; // Random damage between 5 and 15
    const goldReward = Math.floor(Math.random() * 20) + 10; // Random gold reward between 10 and 30

    return {
      type: randomType,
      health,
      damage,
      goldReward,
    };
  };

  const fightMonster = () => {
    if (monster) {
      const playerDamageTaken = monster.damage;
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        health: Math.max(0, prevPlayer.health - playerDamageTaken),
      }));

      const monsterDamageTaken = player.damage;
      setMonster((prevMonster) => ({
        ...prevMonster,
        health: Math.max(0, prevMonster.health - monsterDamageTaken),
      }));

      const logEntry = `${player.name} attacked ${monster.type} for ${player.damage} damage.`;
      setFightLog([...fightLog, logEntry]);

      if (monster.health - player.damage <= 0) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          gold: prevPlayer.gold + monster.goldReward,
        }));

        setMonster(generateMonster());
        setDefeatedMonsters(defeatedMonsters + 1);

        // Reset player stats after defeating each monster
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          health: 100,
        }));

        const victoryLog = `${monster.type} has been defeated! ${player.name} gained ${monster.goldReward} gold.`;
        setFightLog([...fightLog, victoryLog]);
      }
    }
  };

  useEffect(() => {
    const animationDuration = 1000; // 1 second
    const interval = setInterval(() => {
      if (monster && monster.health > 0 && player.health > 0) {
        fightMonster();
      } else {
        clearInterval(interval);
      }
    }, animationDuration);

    return () => clearInterval(interval);
  }, [monster, player]);

  return (
    <div>
      <h2>Dungeon Screen</h2>
      <button onClick={startDungeon}>Start Dungeon</button>
      {monster && (
        <div>
          <h3>{monster.type}</h3>
          <p>Health: {monster.health}</p>
          <p>Damage: {monster.damage}</p>
          <p>Gold Reward: {monster.goldReward}</p>
          <button onClick={fightMonster} disabled={monster.health <= 0}>
            Fight Monster
          </button>
        </div>
      )}
      <p>Defeated Monsters: {defeatedMonsters}</p>
      <div>
        <h3>Fight Log</h3>
        <ul>
          {fightLog.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dungeon;
