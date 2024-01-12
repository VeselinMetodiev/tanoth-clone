import React from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = ({ setActiveScreen }) => {
  return (
    <div className="navbar-container game">
      <button onClick={() => setActiveScreen("Character")}>Character</button>
      <button onClick={() => setActiveScreen("Adventure")}>Adventure</button>
      <button onClick={() => setActiveScreen("Work")}>Work</button>
      <button onClick={() => setActiveScreen("Merchant")}>Merchant</button>
      <button onClick={() => setActiveScreen("Alchemist")}>Alchemist</button>
      <button onClick={() => setActiveScreen("Dungeon")}>Dungeon</button>
    </div>
  );
};

export default Navbar;
