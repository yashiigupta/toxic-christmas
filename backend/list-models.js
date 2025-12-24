const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listAvailableModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // Note: listModels is not directly exposed on the client instance in some versions,
    // but let's try to use the model manager if available or just hit the REST API if needed.
    // Actually, for the Node SDK, we might need to use the API directly if the SDK doesn't expose it easily.
    // But let's try a simple fetch first to the API endpoint.
    
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("Available Models:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
            console.log(`- ${m.name} (Supports: ${m.supportedGenerationMethods.join(', ')})`);
        }
      });
    } else {
      console.log("No models found or error:", data);
    }
    
  } catch (e) {
    console.error("Error listing models:", e);
  }
}

listAvailableModels();
