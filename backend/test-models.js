const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Testing gemini-1.5-flash...");
    await model.generateContent("Hello");
    console.log("gemini-1.5-flash works!");
  } catch (e) {
    console.log("gemini-1.5-flash failed:", e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    console.log("Testing gemini-pro-vision...");
    // gemini-pro-vision requires an image usually, but let's see if it errors on instantiation or generation
    console.log("gemini-pro-vision instantiated.");
  } catch (e) {
    console.log("gemini-pro-vision failed:", e.message);
  }
}

listModels();
