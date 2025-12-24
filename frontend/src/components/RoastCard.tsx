import { useState, useEffect } from 'react';
import { SassLevel } from '@/lib/roasts';

interface RoastCardProps {
  roast: string;
  sassLevel: SassLevel;
  isNew: boolean;
  gaslightAddendum?: string;
  metaComment?: string;
  chaosMode: boolean;
}

const sassLevelLabels: Record<SassLevel, { label: string; emoji: string; color: string }> = {
  1: { label: 'Mildly Sarcastic', emoji: '😏', color: 'bg-secondary' },
  2: { label: 'Getting Spicy', emoji: '🌶️', color: 'bg-accent' },
  3: { label: 'Uncomfortably Real', emoji: '💀', color: 'bg-primary' },
  4: { label: 'Emotional Damage', emoji: '🔥', color: 'bg-destructive' },
  5: { label: 'Maximum Chaos', emoji: '☠️', color: 'bg-cranberry' },
};

export function RoastCard({ roast, sassLevel, isNew, gaslightAddendum, metaComment, chaosMode }: RoastCardProps) {
  const [showContent, setShowContent] = useState(false);
  const levelInfo = sassLevelLabels[sassLevel];

  useEffect(() => {
    if (isNew) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
    setShowContent(true);
  }, [isNew, roast]);

  return (
    <div 
      className={`
        roast-card
        ${isNew ? 'new-roast' : ''}
        ${chaosMode ? 'chaos-mode' : ''}
      `}
    >
      {/* Sass Level Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
          ${levelInfo.color} text-primary-foreground
        `}>
          <span>{levelInfo.emoji}</span>
          <span>Sass Level {sassLevel}</span>
          <span>{levelInfo.emoji}</span>
        </div>
        
        <span className="text-xs text-muted-foreground italic">
          {levelInfo.label}
        </span>
      </div>

      {/* Main Roast */}
      <div className={`
        text-xl font-medium text-foreground leading-relaxed mb-4
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        transition-all duration-500
      `}>
        <span className="text-2xl mr-2">💬</span>
        {roast}
      </div>

      {/* Gaslighting Addendum */}
      {gaslightAddendum && (
        <div className={`
          mt-4 pt-4 border-t border-dashed border-border
          text-muted-foreground italic text-sm
          ${showContent ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700 delay-500
        `}>
          <span className="text-lg mr-2">🤔</span>
          {gaslightAddendum}
        </div>
      )}

      {/* Meta Comment */}
      {metaComment && (
        <div className={`
          mt-4 p-3 bg-muted/50 rounded-xl
          text-xs text-muted-foreground font-mono
          ${showContent ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700 delay-700
        `}>
          <span className="mr-2">🤖</span>
          {metaComment}
        </div>
      )}

      {/* Decorative candy canes */}
      <div className="absolute bottom-2 right-2 text-lg opacity-50">🍬</div>
      <div className="absolute bottom-2 left-2 text-lg opacity-50 transform -scale-x-100">🍬</div>
    </div>
  );
}
