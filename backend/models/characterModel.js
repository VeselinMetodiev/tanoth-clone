import mongoose from "mongoose";

const AttributesSchema = new mongoose.Schema({
  strength: {
    type: Number,
    required: true,
  },
  agility: {
    type: Number,
    required: true,
  },
  constitution: {
    type: Number,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
});

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
    },
    gold: {
      type: Number,
    },
    energy: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    fame: {
      type: Number,
    },
    damage: {
      type: Number,
    },
    inventory: {
      type: String, //TODO: add Inventory schema
    },
    attributes: {
      type: AttributesSchema,
      required: true,
      default: {
        strength: 10,
        agility: 10,
        constitution: 10,
        intelligence: 10,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);

export default Character;
