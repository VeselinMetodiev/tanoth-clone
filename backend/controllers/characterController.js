import asyncHandler from "express-async-handler";
import Character from "../models/characterModel.js";

// @desc    Create a new character
// @route   POST /api/characters
// @access  Public
const createCharacter = asyncHandler(async (req, res) => {
  const {
    name,
    gold,
    experience,
    fame,
    attributes,
    level,
    damage,
    energy,
    inventory,
  } = req.body;

  const characterExists = await Character.findOne({ name });

  if (characterExists) {
    res.status(400);
    throw new Error("Character with that name already exists");
  }

  const character = await Character.create({
    name,
    gold,
    experience,
    fame,
    attributes,
    level,
    experience,
    inventory,
    damage,
    energy,
  });

  if (character) {
    res.status(201).json({
      _id: character._id,
      name: character.name,
      gold: character.gold,
      experience: character.experience,
      level: character.level,
      energy: character.energy,
      fame: character.fame,
      attributes: character.attributes,
      damage: character.damage,
      inventory: character.inventory,
    });
  } else {
    res.status(400);
    throw new Error("Invalid character data");
  }
});

// @desc    Get all characters
// @route   GET /api/characters
// @access  Public
const getCharacters = asyncHandler(async (req, res) => {
  const characters = await Character.find({});
  res.json(characters);
});

// @desc    Get character by ID
// @route   GET /api/characters/:id
// @access  Public
const getCharacterById = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id);
  if (character) {
    res.json({
      _id: req.body._id || character._id,
      name: req.body.name || character.name,
      gold: req.body.gold || character.gold,
      experience: req.body.experience || character.experience,
      level: req.body.level || character.level,
      energy: req.body.energy || character.energy,
      fame: req.body.fame || character.fame,
      attributes: req.body.attributes || character.attributes,
      damage: req.body.damage || character.damage,
      inventory: req.body.inventory || character.inventory,
    });
  } else {
    res.status(404);
    throw new Error("Character not found");
  }
});

// @desc    Update character by ID
// @route   PUT /api/characters/:id
// @access  Public
const updateCharacterById = asyncHandler(async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      character._id = req.body._id || character._id;
      character.name = req.body.name || character.name;
      character.gold = req.body.gold || character.gold;
      character.experience = req.body.experience || character.experience;
      character.fame = req.body.fame || character.fame;
      character.attributes = req.body.attributes || character.attributes;
      character.level = req.body.level || character.level;
      character.energy = req.body.energy || character.energy;
      character.inventory = req.body.inventory || character.inventory;
      const updatedCharacter = await character.save();

      res.json({
        _id: updatedCharacter._id,
        name: updatedCharacter.name,
        gold: updatedCharacter.gold,
        experience: updatedCharacter.experience,
        level: updatedCharacter.level,
        energy: updatedCharacter.energy,
        fame: updatedCharacter.fame,
        attributes: updatedCharacter.attributes,
        damage: updatedCharacter.damage,
        inventory: updatedCharacter.inventory,
      });
    } else {
      res.status(404);
      throw new Error("Character not found");
    }
  } catch (err) {
    throw new Error(err);
  }
});

// @desc    Delete character by ID
// @route   DELETE /api/characters/:id
// @access  Public
const deleteCharacterById = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id);

  if (character) {
    await character.remove();
    res.json({ message: "Character removed successfully" });
  } else {
    res.status(404);
    throw new Error("Character not found");
  }
});

// @desc    Get character by name
// @route   GET /api/characters/name/:name
// @access  Public
const getCharacterByName = asyncHandler(async (req, res) => {
  const character = await Character.findOne({ name: req.params.name });
  if (character) {
    res.json({
      _id: character._id,
      name: character.name,
      gold: character.gold,
      experience: character.experience,
      level: character.level,
      energy: character.energy,
      fame: character.fame,
      attributes: character.attributes,
      damage: character.damage,
      inventory: character.inventory,
    });
  } else {
    res.status(404);
    throw new Error("Character not found");
  }
});

export {
  createCharacter,
  getCharacters,
  getCharacterById,
  getCharacterByName, // Add this line to include the new function
  updateCharacterById,
  deleteCharacterById,
};
