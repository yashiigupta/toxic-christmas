import { Button } from '@/components/ui/button';
import { ChristmasLights } from './ChristmasLights';
import { FloatingOrnaments } from './FestiveDecorations';
import { Camera, AlertTriangle, Gift, Snowflake } from 'lucide-react';

interface ConsentScreenProps {
  onConsent: () => void;
}

export function ConsentScreen({ onConsent }: ConsentScreenProps) {
  return (
    <div className="min-h-screen bg-festive-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Decorations */}
      <div className='z-10 mb-10'><FloatingOrnaments /></div>
      
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0">
        <ChristmasLights />
      </div>
      
      <div className="festive-card max-w-lg w-full p-8 animate-bounce-in relative z-20">
        {/* Ribbon */}
        <div className="ribbon">v1.0 🎅</div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 animate-wiggle">
            <span className="text-5xl">🎭</span>
          </div>
          <h1 className="text-4xl font-bold text-gradient-festive mb-2 font-fredoka">
            HackFace
          </h1>
          <p className="text-muted-foreground text-lg">
            The AI That Roasts Your Christmas Spirit
          </p>
        </div>

        {/* Warning Section */}
        <div className="bg-muted/50 rounded-2xl p-4 mb-6 border-2 border-dashed border-primary/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">⚠️ Emotional Damage Warning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This app will analyze your face and deliver <span className="text-primary font-semibold">absolutely unnecessary judgment</span>. 
                It offers no therapy, no advice, and no comfort. Just festive sass. 
                <span className="block mt-2 italic">We are not responsible for any feelings, existential crises, or sudden urges to improve yourself.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-foreground">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <Camera className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-sm">We'll use your camera to judge you (it's the whole point)</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Snowflake className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm">Judgments are 100% accurate (we made that up)</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Gift className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="text-sm">The more you use it, the meaner it gets (you've been warned)</span>
          </div>
        </div>

        {/* Consent Button */}
        <Button 
          onClick={onConsent}
          className="gift-button w-full text-lg py-6"
        >
          <span className="mr-2">🎄</span>
          Yes, Roast Me Please
          <span className="ml-2">🎄</span>
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Built with ❤️ and questionable life choices for <span className="font-semibold">Code At Christmas</span> 🎅
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 flex items-center gap-4 text-muted-foreground text-sm z-20">
        <span>❄️</span>
        <span className="font-caveat text-lg">No feelings were spared in the making of this app</span>
        <span>❄️</span>
      </div>
    </div>
  );
}
