import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CoinNumber = ({ number, onClick }) => {
  return (
    <button onClick={onClick} style={styles.container}>
      <FontAwesomeIcon icon={faPlus} />
      <span style={styles.number}>{number}</span>
      <FontAwesomeIcon icon={faCoins} style={styles.coinIcon} />
    </button>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px",
    // marginLeft: "5px",
  },
  number: {
    marginRight: "5px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  coinIcon: {
    fontSize: "20px", // adjust the font size as needed
    color: "#ffd700", // adjust the color as needed
  },
};

export default CoinNumber;
