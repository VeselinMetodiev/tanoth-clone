import React, { useState } from "react";
import {
  useCreateCharacterMutation,
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetCharacterByNameQuery,
  useUpdateCharacterByIdMutation,
  useDeleteCharacterByIdMutation,
} from "../slices/characterApiSlice";
import CharactersTable from "./CharactersTable";

const CharacterComponent = () => {
  const [characterName, setCharacterName] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  // Create Character Mutation
  const [createCharacter, { isLoading: isCreatingCharacter }] =
    useCreateCharacterMutation();

  const { data: characters, isLoading: isFetchingCharacters } =
    useGetCharactersQuery();
  const { data: characterById, isLoading: isFetchingCharacterById } =
    useGetCharacterByIdQuery(selectedCharacterId);
  const { data: characterByName, isLoading: isFetchingCharacterByName } =
    useGetCharacterByNameQuery(characterName);

  const handleCreateCharacter = async () => {
    const newCharacterData = {
      name: "NewCharacter",
      gold: 100,
      experience: 0,
      fame: 10,
      attributes: { strength: 5, agility: 7, constitution: 8, intelligence: 6 },
    };

    const result = await createCharacter(newCharacterData);

    if (result.data) {
      setSelectedCharacterId(result.data._id);
    }
  };

  const handleGetCharacterByName = async () => {
    // Call the getCharacterByName query
    const result = await getCharacterByName(characterName);

    // Handle the result as needed
    console.log(result.data); // Character data by name
  };

  const handleUpdateCharacterById = async () => {
    if (!selectedCharacterId) {
      // Handle error - no character selected
      return;
    }

    const updatedCharacterData = {
      name: "UpdatedCharacter",
      gold: 150,
      experience: 50,
      fame: 15,
      attributes: { strength: 8, agility: 9, constitution: 7, intelligence: 7 },
    };

    const result = await updateCharacterById({
      id: selectedCharacterId,
      data: updatedCharacterData,
    });

    // Handle the result as needed
    console.log(result.data); // Updated character data
  };

  const handleDeleteCharacterById = async () => {
    if (!selectedCharacterId) {
      // Handle error - no character selected
      return;
    }

    const result = await deleteCharacterById(selectedCharacterId);

    if (result.data) {
      setSelectedCharacterId(null);
    }
  };

  return (
    <div>
      <h2>Create Character</h2>
      <button onClick={handleCreateCharacter} disabled={isCreatingCharacter}>
        {isCreatingCharacter ? "Creating..." : "Create Character"}
      </button>

      <h2>Get Characters</h2>
      {isFetchingCharacters ? (
        "Loading..."
      ) : (
        <CharactersTable
          characters={characters}
          isFetchingCharacters={isFetchingCharacters}
        />
      )}

      <h2>Get Character By Name</h2>
      <div>
        <label>Character Name:</label>
        <input
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button
          onClick={handleGetCharacterByName}
          disabled={isFetchingCharacterByName}
        >
          {isFetchingCharacterByName
            ? "Fetching..."
            : "Fetch Character By Name"}
        </button>
        {isFetchingCharacterByName ? null : (
          <pre>{JSON.stringify(characterByName, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default CharacterComponent;
