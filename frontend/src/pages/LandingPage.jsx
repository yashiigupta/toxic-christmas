import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showConsent, setShowConsent] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-holly mb-6"
      >
        We Judge You.
      </motion.h1>
      
      <p className="text-xl mb-8 max-w-md text-coal/80">
        An AI that looks at your face and gives you the unsolicited, unqualified opinion you never asked for.
      </p>

      <button 
        onClick={() => setShowConsent(true)}
        className="bg-holly text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-red-400 transition-colors shadow-lg"
      >
        Let Me Be Judged
      </button>

      {showConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-holly"
          >
            <div className="flex items-center gap-2 text-holly mb-4">
              <AlertTriangle />
              <h2 className="text-2xl font-bold">Warning: Toxic Content</h2>
            </div>
            
            <p className="mb-6 text-left">
              By continuing, you agree to be emotionally judged by an AI that has no qualifications, no empathy, and a "Desi Aunty" complex.
              <br/><br/>
              It will mock your face. It will mock your life. It is not therapy.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowConsent(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100"
              >
                I'm Scared
              </button>
              <button 
                onClick={() => navigate('/app')}
                className="flex-1 py-3 rounded-xl bg-holly text-white font-bold hover:bg-red-400"
              >
                Hurt My Feelings
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
