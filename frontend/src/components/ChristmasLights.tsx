export function ChristmasLights() {
  return (
    <div className="w-full overflow-hidden py-2">
      <div className="flex justify-center items-end gap-3 relative">
        {/* Wire */}
        <div className="absolute top-0 left-0 right-0 h-px bg-foreground/30" />
        
        {/* Lights */}
        {[...Array(15)].map((_, i) => {
          const colors = [
            'bg-red-500',
            'bg-yellow-400',
            'bg-green-500',
            'bg-blue-500',
            'bg-purple-500',
          ];
          const color = colors[i % colors.length];
          const delay = (i * 0.2) % 2;
          
          return (
            <div key={i} className="relative flex flex-col items-center">
              {/* Wire segment */}
              <div 
                className="w-px h-3 bg-foreground/30"
                style={{ height: `${8 + Math.sin(i * 0.5) * 6}px` }}
              />
              {/* Bulb cap */}
              <div className="w-2 h-1.5 bg-gingerbread rounded-t-sm" />
              {/* Bulb */}
              <div
                className={`w-4 h-6 ${color} rounded-full shadow-lg transition-all duration-300`}
                style={{
                  animation: `twinkle 2s infinite ease-in-out`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
