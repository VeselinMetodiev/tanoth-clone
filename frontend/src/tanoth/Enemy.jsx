import React from "react";

const Enemy = ({ enemy }) => {
  return (
    <div>
      <h2>{enemy.name}</h2>
      <p>Health: {enemy.health}</p>
    </div>
  );
};

export default Enemy;
