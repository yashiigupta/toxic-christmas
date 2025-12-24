export function SantaHelper({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden="true">
      {/* Santa/Elf mascot */}
      <div className="relative animate-float">
        {/* Body */}
        <div className="text-6xl">🎅</div>
        
        {/* Speech bubble */}
        <div className="absolute -top-8 -right-4 bg-card rounded-xl px-3 py-1 shadow-lg border border-border text-xs whitespace-nowrap animate-bounce-in">
          Ho ho... nope.
        </div>
      </div>
    </div>
  );
}

export function FloatingOrnaments() {
  const ornaments = [
    { emoji: '🎄', top: '10%', left: '5%', delay: '0s', size: 'text-3xl' },
    { emoji: '⭐', top: '15%', right: '8%', delay: '0.5s', size: 'text-2xl' },
    { emoji: '🎁', bottom: '20%', left: '8%', delay: '1s', size: 'text-2xl' },
    { emoji: '🦌', bottom: '25%', right: '5%', delay: '1.5s', size: 'text-3xl' },
    { emoji: '☃️', top: '40%', left: '3%', delay: '2s', size: 'text-2xl' },
    { emoji: '🔔', top: '50%', right: '4%', delay: '2.5s', size: 'text-xl' },
    { emoji: '🍪', bottom: '40%', left: '6%', delay: '3s', size: 'text-xl' },
    { emoji: '🥛', bottom: '35%', right: '7%', delay: '3.5s', size: 'text-xl' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10" aria-hidden="true">
      {ornaments.map((ornament, i) => (
        <div
          key={i}
          className={`absolute ${ornament.size} animate-float opacity-60`}
          style={{
            top: ornament.top,
            left: ornament.left,
            right: ornament.right,
            bottom: ornament.bottom,
            animationDelay: ornament.delay,
          }}
        >
          {ornament.emoji}
        </div>
      ))}
    </div>
  );
}

export function CandyCaneBorder() {
  return (
    <div className="candy-cane-divider" aria-hidden="true" />
  );
}

export function GiftBox({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };

  return (
    <div 
      className={`${sizes[size]} flex items-center justify-center bg-primary/20 rounded-lg border-2 border-dashed border-primary/50 animate-wiggle`}
      aria-hidden="true"
    >
      🎁
    </div>
  );
}
