const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testTTS() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });
    
    console.log("Sending TTS request...");
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: "Hello, this is a test of the voice system." }] }]
    });
    
    const response = await result.response;
    console.log("Response received.");
    console.log(JSON.stringify(response, null, 2));
    
  } catch (e) {
    console.error("TTS Error:", e);
  }
}

testTTS();
