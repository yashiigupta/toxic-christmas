import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { useFaceMood } from '../hooks/useFaceMood';
import { getJudgment } from '../services/api';
import { speak } from '../services/tts';
import { Loader2, RefreshCw, Volume2 } from 'lucide-react';

const MainApp = () => {
  const { videoRef, modelsLoaded, detection } = useFaceMood();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const handleJudgeMe = async () => {
    // Allow judgment even if face-api detection is weak, as long as we have a video feed
    if (!videoRef.current) return;
    
    // Rate limit (simple debounce)
    const now = Date.now();
    if (now - lastRequestTime < 2000) return;
    setLastRequestTime(now);

    setLoading(true);
    setOpinion(null);

    try {
      // Capture screenshot
      const imageSrc = videoRef.current.getScreenshot();
      
      if (!imageSrc) {
        throw new Error("Could not capture photo");
      }

      const result = await getJudgment({
        image: imageSrc
      });

      setOpinion(result);
      speak(result.opinion, result.judgedMood);
    } catch (error) {
      console.error(error);
      setOpinion({ opinion: "I'm ignoring you right now. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[80vh]">
      {/* Left Panel: The Face */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-4 rounded-3xl shadow-xl border-4 border-mistletoe relative overflow-hidden">
        {!modelsLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center">
              <Loader2 className="animate-spin w-10 h-10 text-holly mx-auto mb-2" />
              <p>Loading Judgment Models...</p>
            </div>
          </div>
        )}
        
        <div className="relative rounded-2xl overflow-hidden border-4 border-holly w-full max-w-md aspect-video bg-black">
          <Webcam
            ref={videoRef}
            audio={false}
            mirrored={true}
            className="w-full h-full object-cover"
          />
          
          {/* Face Overlay */}
          {detection && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              <p className="font-bold capitalize text-lg">{detection.mood}</p>
              <p className="text-xs opacity-70">
                {Math.round(detection.confidence * 100)}% sure
                {detection.age && ` • ~${Math.round(detection.age)}y`}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            {detection ? "Face detected. Prepare yourself." : "Position your face in the frame..."}
          </p>
          <button
            onClick={handleJudgeMe}
            disabled={loading}
            className="bg-holly text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-red-400 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Judge Me"}
          </button>
        </div>
      </div>

      {/* Right Panel: The Judgment */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {opinion ? (
            <motion.div
              key="opinion"
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-tinsel max-w-lg w-full relative"
            >
              <div className="absolute -top-6 -right-6 bg-holly text-white p-4 rounded-full shadow-lg rotate-12">
                <Volume2 className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-holly mb-4 uppercase tracking-widest">
                Unqualified Opinion
              </h3>
              
              <p className="text-2xl font-medium text-coal leading-relaxed">
                "{opinion.opinion}"
              </p>
              
              {opinion.isGaslighting && (
                <div className="mt-4 text-xs text-red-500 font-bold uppercase tracking-widest border border-red-200 inline-block px-2 py-1 rounded">
                  ⚠️ Gaslighting Active
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleJudgeMe}
                  className="text-sm text-gray-400 hover:text-holly flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Another one?
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400"
            >
              <p className="text-2xl font-light italic">
                "I'm waiting for you to make a mistake."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainApp;
