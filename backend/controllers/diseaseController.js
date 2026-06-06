import Product from "../models/Product.model.js";
import { analyzePlantDisease } from "../services/geminiService.js";

export const detectDisease = async (
  req,
  res
) => {
  try {
    const result =
      await analyzePlantDisease(req.file.path);
        
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

console.log("Keywords:", keywords);

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
console.log("Recommended Products:", recommendedProducts);
console.log("Keywords:", keywords);
console.log("Matched Products:", matchedProducts);
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
