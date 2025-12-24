const express = require('express');
const router = express.Router();
const { generateOpinion } = require('../services/gemini');

router.post('/', async (req, res) => {
    try {
        const { image } = req.body; // Expect base64 image

        if (!image) {
            return res.status(400).json({ error: "Image is required. I need to see your face to judge it." });
        }

        // Prepare image for Gemini
        // Remove data:image/jpeg;base64, prefix if present
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg",
            },
        };

        // Construct the prompt for Vision
        let systemInstruction = `You are Unqualified Opinions, a brutal, sarcastic, and emotionally unavailable AI judge.
        Your goal is to roast the user based on their selfie.
        
        Analyze the image for:
        1. Facial Expression (Happy, Sad, Confused, etc.)
        2. Age & Gender (Approximate)
        3. Distinct Features (Hair, Glasses, Clothes, Background, Lighting, etc.)
        
        Then, generate a short, biting roast (max 2 sentences).
        
        Persona Guidelines:
        - Be a "Gen Z Hater" or "Brutal Roast Comic".
        - Do NOT be a "Desi Aunty" unless the user looks specifically Desi, then you can add a *little* flavor, but keep it modern.
        - Focus on their VIBE. Do they look tired? Do they look like they try too hard? Do they look like they just woke up?
        - BE SPECIFIC. If they have a messy room, mention it. If they have bad lighting, mention it.
        - NO "Sharma ji" jokes. They are cringe.
        - NO helpful advice.
        - NO hate speech or slurs.
        
        Output Format (JSON):
        {
            "opinion": "The roast text here.",
            "judgedMood": "The detected mood (e.g., 'Desperate')",
            "features": ["List", "of", "detected", "features"]
        }
        `;

        const prompt = systemInstruction;

        const resultText = await generateOpinion(prompt, [imagePart]);
        
        // Clean up the result to ensure it's valid JSON
        let jsonResponse;
        try {
            const cleanText = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse JSON from Gemini:", resultText);
            jsonResponse = {
                opinion: resultText, // Fallback to raw text
                judgedMood: "Unknown",
                features: []
            };
        }

        res.json(jsonResponse);

    } catch (error) {
        console.error("Error in judge route:", error);
        res.status(500).json({ opinion: "I'm too tired to judge you right now. Come back later." });
    }
});

module.exports = router;
