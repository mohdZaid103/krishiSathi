import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      required: true,
    },

    symptoms: [String],

    treatment: {
      type: [String],
    },

    recommendedProducts: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Detection",
  detectionSchema
);