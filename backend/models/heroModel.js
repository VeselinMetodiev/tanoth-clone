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

const heroSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gold: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    fame: {
      type: Number,
    },
    attributes: {
      type: AttributesSchema,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
