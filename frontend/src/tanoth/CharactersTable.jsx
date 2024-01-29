import React, { useState, useEffect } from "react";

const CharactersTable = ({ characters, isFetchingCharacters }) => {
  if (isFetchingCharacters) {
    return <p>Loading...</p>;
  }

  if (!characters || characters.length === 0) {
    return <p>No characters available</p>;
  }

  // Assuming characters is an array of objects
  const tableHeaders = Object.keys(characters[0]);
  console.log(tableHeaders);
  return (
    <div>
      <h2>Character Table</h2>
      <table>
        <thead>
          <tr>
            {tableHeaders
              .filter((value) => value !== "attributes")
              .map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index}>
              {tableHeaders
                .filter((value) => value !== "attributes")
                .map((header) => (
                  <td key={header}>{character[header]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharactersTable;
