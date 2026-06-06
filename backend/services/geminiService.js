import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

export const analyzePlantDisease = async (
  imagePath
) => {

  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" })

  const imageData = {
    inlineData: {
      data: fs.readFileSync(imagePath).toString("base64"),
      mimeType: "image/jpeg",
    },
  };

const prompt = `
You are an agricultural expert.

Analyze this plant image.

Return ONLY valid JSON.

{
  "disease": "",
  "severity": "",
  "symptoms": [],
  "treatment": "",
  "recommendedProducts": []
}
`;

  const result = await model.generateContent([
    prompt,
    imageData,
  ]);

  const text = result.response.text();

const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
};