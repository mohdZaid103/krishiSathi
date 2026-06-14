

import Product from "../models/Product.model.js";
import { analyzePlantDisease } from "../services/geminiService.js";
import Detection from "../models/Detection.model.js";
export const detectDisease = async (req, res) => {
  try {


    const result =
      await analyzePlantDisease(req.file.path);
    await Detection.create({
      userId: req.user.userId,
      disease: result.disease,
      severity: result.severity,
      symptoms: result.symptoms,
      treatment: Array.isArray(result.treatment)
      ? result.treatment
      : [result.treatment],
      recommendedProducts:
        result.recommendedProducts,
    });

    const recommendedProducts =
      result.recommendedProducts || [];

    const keywords = [];

    recommendedProducts.forEach((item) => {
      const words = item
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(" ");

      words.forEach((word) => {
        if (word.length > 3) {
          keywords.push(word);
        }
      });
    });

    const matchedProducts = await Product.find({
      $or: [
        {
          name: {
            $regex: keywords.join("|"),
            $options: "i",
          },
        },
        {
          category: {
            $regex: keywords.join("|"),
            $options: "i",
          },
        },
        {
          description: {
            $regex: keywords.join("|"),
            $options: "i",
          },
        },
      ],
    });

    res.json({
      ...result,
      products: matchedProducts,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Detection failed",
    });
  }
};