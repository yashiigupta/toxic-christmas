const googleTTS = require('google-tts-api');

const text = "This is a test of the text to speech system. It needs to be long enough to trigger the split functionality so we can verify that the URLs generated are valid and accessible by the browser. If this text is too short, I will add more words to it until it is long enough.";

try {
    const results = googleTTS.getAllAudioUrls(text, {
        lang: 'en-GB',
        slow: false,
        host: 'https://translate.google.com',
        splitPunct: ',.?!',
    });

    console.log("Generated URLs:");
    results.forEach(r => console.log(r.url));
} catch (e) {
    console.error("Error:", e);
}
