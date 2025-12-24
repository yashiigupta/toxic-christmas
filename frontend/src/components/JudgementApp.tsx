import { useState, useCallback, useEffect } from 'react';
import { WebcamCapture } from './WebcamCapture';
import { MoodOrb } from './MoodOrb';
import { RoastCard } from './RoastCard';
import { ChristmasLights } from './ChristmasLights';
import { ChristmasTree } from './ChristmasTree';
import { SantaHelper, FloatingOrnaments } from './FestiveDecorations';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Mood,
  SassLevel,
  getRoast,
  getGaslightingResponse,
  getChaosResponse,
  getMetaResponse,
  getLoadingMessage,
  shouldGaslight,
  shouldAddMeta,
  calculateSassLevel,
} from '@/lib/roasts';
import { getJudgment } from '@/services/api';
import { speak } from '@/services/tts';
import { Sparkles, Zap, Volume2, VolumeX, Home } from 'lucide-react';

interface JudgmentAppProps {
  onExit: () => void;
}

// Simple mood detection simulation (Fallback)
function detectMood(): { mood: Mood; confidence: number } {
  const moods: Mood[] = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'disgusted', 'fearful', 'confused'];
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  const confidence = 0.65 + Math.random() * 0.30;
  return { mood: randomMood, confidence };
}

export function JudgmentApp({ onExit }: JudgmentAppProps) {
  const [judgmentCount, setJudgmentCount] = useState(0);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [currentRoast, setCurrentRoast] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [chaosMode, setChaosMode] = useState(false);
  const [isNewRoast, setIsNewRoast] = useState(false);
  const [gaslightAddendum, setGaslightAddendum] = useState<string | undefined>();
  const [metaComment, setMetaComment] = useState<string | undefined>();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [roastHistory, setRoastHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!isAnalyzing) return;
    
    const interval = setInterval(() => {
      setLoadingMessage(getLoadingMessage());
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleCapture = useCallback(async (imageSrc: string) => {
    setIsAnalyzing(true);
    setLoadingMessage(getLoadingMessage());
    setIsNewRoast(false);
    setGaslightAddendum(undefined);
    setMetaComment(undefined);

    const newJudgmentCount = judgmentCount + 1;
    setJudgmentCount(newJudgmentCount);
    const sassLevel = calculateSassLevel(newJudgmentCount);

    try {
      // Call the real API
      const result = await getJudgment({
        image: imageSrc,
        sassLevel,
        chaosMode
      });

      setCurrentMood(result.judgedMood.toLowerCase() as Mood);
      setConfidence(0.95); // High confidence from Gemini
      
      let roast = result.opinion;

      // Add client-side flavor if needed
      if (shouldGaslight(newJudgmentCount) && roastHistory.length > 0) {
        setGaslightAddendum(getGaslightingResponse());
      }

      if (shouldAddMeta()) {
        setMetaComment(getMetaResponse());
      }

      setCurrentRoast(roast);
      setRoastHistory(prev => [...prev, roast]);
      setIsNewRoast(true);

      if (soundEnabled) {
        speak(roast, result.judgedMood);
      }

    } catch (error) {
      console.error("API Error, falling back to local:", error);
      
      // Fallback to local simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const detection = detectMood();
      setCurrentMood(detection.mood);
      setConfidence(detection.confidence);

      let roast: string;
      if (chaosMode) {
        roast = getChaosResponse();
      } else {
        roast = getRoast(detection.mood, sassLevel);
      }
      
      setCurrentRoast(roast);
      setRoastHistory(prev => [...prev, roast]);
      setIsNewRoast(true);
      
      if (soundEnabled) {
        speak(roast, detection.mood);
      }
    } finally {
      setIsAnalyzing(false);
    }

  }, [judgmentCount, chaosMode, soundEnabled, roastHistory]);

  const sassLevel = calculateSassLevel(judgmentCount);

  return (
    <div className={`min-h-screen bg-festive-gradient flex flex-col relative ${chaosMode ? 'chaos-mode' : ''}`}>
      {/* Floating Decorations */}
      <FloatingOrnaments />
      
      {/* Corner Decorations */}
      <div className="fixed bottom-4 left-4 z-10 hidden lg:block">
        <ChristmasTree className="scale-75 opacity-80" />
      </div>
      <div className="fixed bottom-4 right-4 z-10 hidden lg:block">
        <SantaHelper className="opacity-80" />
      </div>

      {/* Header */}
      <header className="relative z-20">
        <ChristmasLights />
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-wiggle">🎭</span>
              <div>
                <h1 className="text-2xl font-bold text-gradient-festive font-fredoka">HackFace</h1>
                <p className="text-xs text-muted-foreground">Festive Judgment Machine</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Chaos Mode Toggle */}
              <div className="flex items-center gap-2">
                <Switch 
                  id="chaos-mode" 
                  checked={chaosMode}
                  onCheckedChange={setChaosMode}
                  className="data-[state=checked]:bg-destructive"
                />
                <Label 
                  htmlFor="chaos-mode" 
                  className="flex items-center gap-1 text-sm cursor-pointer"
                >
                  <Zap className={`w-4 h-4 ${chaosMode ? 'text-destructive animate-wiggle' : 'text-muted-foreground'}`} />
                  <span className="hidden sm:inline">Chaos</span>
                </Label>
              </div>

              {/* Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-muted-foreground hover:text-foreground"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>

              {/* Exit Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onExit}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-muted/30 border-y border-border py-2 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Judgments:</span>
              <span className="font-bold text-primary">{judgmentCount}</span>
              <span className="text-lg">⚖️</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Sass Level:</span>
              <span className="font-bold text-primary">{sassLevel}/5</span>
              <span className="text-lg">🌶️</span>
            </div>
            {chaosMode && (
              <div className="flex items-center gap-2 text-destructive animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">CHAOS ACTIVE</span>
                <Sparkles className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Webcam */}
          <div className="flex flex-col items-center gap-6">
            <WebcamCapture
              onCapture={handleCapture}
              isAnalyzing={isAnalyzing}
              chaosMode={chaosMode}
            />

            {/* Loading Message */}
            {isAnalyzing && (
              <div className="text-center animate-fade-in">
                <p className="text-lg font-medium text-primary font-fredoka">
                  {loadingMessage}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="flex flex-col items-center gap-8">
            {/* Mood Orb */}
            <MoodOrb
              mood={currentMood}
              confidence={confidence}
              isAnalyzing={isAnalyzing}
            />

            {/* Roast Card */}
            {currentRoast && !isAnalyzing && (
              <RoastCard
                roast={currentRoast}
                sassLevel={sassLevel}
                isNew={isNewRoast}
                gaslightAddendum={gaslightAddendum}
                metaComment={metaComment}
                chaosMode={chaosMode}
              />
            )}

            {/* Empty State */}
            {!currentRoast && !isAnalyzing && (
              <div className="festive-card p-8 text-center max-w-md">
                <div className="text-6xl mb-4 animate-float">🎅</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Ready to be Judged?
                </h3>
                <p className="text-muted-foreground">
                  Click "Judge Me" to receive your festive emotional evaluation. 
                  We promise it will be <span className="line-through">kind</span> honest.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-4 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-caveat text-lg">Made with 🎄 chaos and ☕ coffee</span>
            <span className="mx-2">•</span>
            <span className="font-semibold">Code At Christmas 2024</span>
            <span className="mx-2">•</span>
            <span className="italic">No feelings were considered</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
