import axios from 'axios';

export const speak = async (text, mood) => {
  try {
    // Stop any current speech
    window.speechSynthesis.cancel();

    const response = await axios.post('http://localhost:3000/api/speak', {
      text,
      mood
    });

    if (response.data.urls && response.data.urls.length > 0) {
      const urls = response.data.urls;
      let currentIndex = 0;

      const playNext = () => {
        if (currentIndex >= urls.length) return;
        
        const audio = new Audio(urls[currentIndex]);
        audio.onended = () => {
            currentIndex++;
            playNext();
        };
        audio.play().catch(e => console.error("Audio play error:", e));
      };

      playNext();
    }
  } catch (error) {
    console.error("TTS Error, falling back to browser:", error);
    // Fallback to browser TTS
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};
