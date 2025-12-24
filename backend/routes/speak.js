const express = require('express');
const router = express.Router();
const googleTTS = require('google-tts-api');

router.post('/', async (req, res) => {
    try {
        const { text, mood } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        // Choose accent based on mood/persona
        // Default to Indian English for the "Desi" vibe, or British for "Sarcastic"
        let lang = 'en-IN'; 
        
        // If the text sounds very Gen Z/American, maybe switch? 
        // But let's stick to one consistent voice for now.
        // en-GB is also good for dry sarcasm.
        // en-US is standard.
        
        // Let's randomize slightly or stick to en-IN for the brand.
        // Actually, the user complained about "Sharma ji" jokes, so maybe they want a more modern voice.
        // Let's use 'en-GB' for a "Judgemental Butler" vibe or 'en-US' for "Gen Z".
        // Let's go with 'en-GB' (British) as it sounds more "judgy".
        lang = 'en-GB';

        // Use getAllAudioBase64 to avoid browser blocking issues
        const results = await googleTTS.getAllAudioBase64(text, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
            splitPunct: ',.?!',
        });

        // Create data URIs
        const urls = results.map(r => `data:audio/mp3;base64,${r.base64}`);

        res.json({ urls });

    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).json({ error: "Failed to generate speech" });
    }
});

module.exports = router;
