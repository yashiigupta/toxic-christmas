require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    console.log("Checking API Key...");
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Error: GEMINI_API_KEY is missing in .env file");
        return;
    }
    console.log("API Key found (starts with):", process.env.GEMINI_API_KEY.substring(0, 5) + "...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("Sending test prompt to Gemini...");
    try {
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        const text = response.text();
        console.log("✅ Success! Gemini responded:", text);
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        if (error.message.includes("API key not valid")) {
            console.error("👉 Please check if your API key is correct.");
        }
    }
}

testGemini();
