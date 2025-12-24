import { Mood } from '@/lib/roasts';

interface MoodOrbProps {
  mood: Mood | null;
  confidence: number;
  isAnalyzing: boolean;
}

const moodEmojis: Record<Mood, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  surprised: '😲',
  neutral: '😐',
  disgusted: '🤢',
  fearful: '😨',
  confused: '🤔',
};

const moodColors: Record<Mood, string> = {
  happy: 'from-yellow-300 via-amber-400 to-orange-400',
  sad: 'from-blue-400 via-indigo-400 to-purple-400',
  angry: 'from-red-400 via-rose-500 to-pink-500',
  surprised: 'from-cyan-300 via-teal-400 to-emerald-400',
  neutral: 'from-slate-300 via-gray-400 to-zinc-400',
  disgusted: 'from-lime-400 via-green-500 to-emerald-600',
  fearful: 'from-violet-400 via-purple-500 to-fuchsia-500',
  confused: 'from-amber-300 via-yellow-400 to-lime-400',
};

export function MoodOrb({ mood, confidence, isAnalyzing }: MoodOrbProps) {
  const gradient = mood ? moodColors[mood] : 'from-primary via-primary-glow to-cranberry';
  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* The Ornament */}
      <div className="relative">
        {/* Hook */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-1 h-4 bg-muted-foreground/50" />
          <div className="w-5 h-5 rounded-md bg-gradient-to-b from-ornament-gold to-gingerbread" />
        </div>
        
        {/* Orb */}
        <div 
          className={`
            relative w-28 h-28 rounded-full flex items-center justify-center
            bg-gradient-to-br ${gradient}
            shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2),inset_0_5px_15px_rgba(255,255,255,0.3)]
            ${isAnalyzing ? 'animate-pulse-glow' : ''}
            transition-all duration-500
          `}
          style={{
            boxShadow: `
              inset 0 -10px 30px rgba(0,0,0,0.2),
              inset 0 5px 15px rgba(255,255,255,0.3),
              0 10px 40px hsl(var(--primary) / 0.4)
            `,
          }}
        >
          {/* Shine effect */}
          <div className="absolute top-3 left-4 w-8 h-8 rounded-full bg-white/30 blur-sm" />
          
          {/* Emoji */}
          <span className={`text-5xl ${isAnalyzing ? 'animate-wiggle' : ''}`}>
            {isAnalyzing ? '🔮' : mood ? moodEmojis[mood] : '❓'}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center space-y-2">
        {/* Mood Label */}
        <div className="ornament-badge">
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">✨</span>
              Analyzing...
              <span className="animate-spin">✨</span>
            </span>
          ) : mood ? (
            <span className="capitalize">{mood}</span>
          ) : (
            'Awaiting Face...'
          )}
        </div>

        {/* Confidence Tag */}
        {!isAnalyzing && mood && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded-full">
              {Math.round(confidence * 100)}%
            </span>
            <span className="text-xs">🎁</span>
          </div>
        )}
      </div>
    </div>
  );
}
