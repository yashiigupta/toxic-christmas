export function ChristmasTree({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* Tree */}
      <div className="relative">
        {/* Star */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl animate-sparkle">⭐</div>
        
        {/* Tree layers */}
        <div className="flex flex-col items-center">
          {/* Top triangle */}
          <div 
            className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-pine"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs">🔴</div>
          </div>
          
          {/* Middle triangle */}
          <div 
            className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px] border-l-transparent border-r-transparent border-b-holly -mt-3"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            <div className="absolute top-6 left-0 text-xs">🟡</div>
            <div className="absolute top-10 right-0 text-xs">🔵</div>
          </div>
          
          {/* Bottom triangle */}
          <div 
            className="w-0 h-0 border-l-[55px] border-r-[55px] border-b-[70px] border-l-transparent border-r-transparent border-b-pine -mt-4"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            <div className="absolute top-8 left-2 text-xs">🔴</div>
            <div className="absolute top-12 right-2 text-xs">🟡</div>
            <div className="absolute top-6 right-0 text-xs">🟢</div>
          </div>
          
          {/* Trunk */}
          <div className="w-6 h-8 bg-gingerbread rounded-sm -mt-1" />
        </div>
        
        {/* Presents */}
        <div className="flex justify-center gap-2 mt-2">
          <div className="text-xl">🎁</div>
          <div className="text-lg">🎁</div>
        </div>
      </div>
    </div>
  );
}
