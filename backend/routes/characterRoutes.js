import express from "express";
import {
  createCharacter,
  getCharacters,
  getCharacterById,
  getCharacterByName,
  updateCharacterById,
  deleteCharacterById,
} from "../controllers/characterController.js";

const router = express.Router();

// Public routes
router.post("/", createCharacter);
router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.get("/name/:name", getCharacterByName); // New route for getting character by name

// Protected routes (assuming you have some authentication middleware like 'protect')
router.put("/:id", updateCharacterById);
router.delete("/:id", deleteCharacterById);

export default router;
