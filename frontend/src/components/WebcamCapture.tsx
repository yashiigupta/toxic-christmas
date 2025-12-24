import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
  isAnalyzing: boolean;
  chaosMode: boolean;
}

export function WebcamCapture({ onCapture, isAnalyzing, chaosMode }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setHasCamera(true);
        setIsReady(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setHasCamera(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip horizontally to match the mirrored video
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        onCapture(imageSrc);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Webcam Frame */}
      <div className={`
        webcam-frame relative
        ${chaosMode ? 'animate-shake' : ''}
        ${isAnalyzing ? 'animate-pulse-glow' : ''}
      `}>
        {hasCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full max-w-md rounded-2xl transform -scale-x-100"
            />
            {/* Overlay decorations */}
            <div className="absolute top-2 left-2 text-2xl animate-float" style={{ animationDelay: '0s' }}>🎄</div>
            <div className="absolute top-2 right-2 text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute bottom-2 left-2 text-xl animate-float" style={{ animationDelay: '1s' }}>🎁</div>
            <div className="absolute bottom-2 right-2 text-xl animate-float" style={{ animationDelay: '1.5s' }}>🦌</div>
            
            {/* Scanning effect when analyzing */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20 animate-pulse rounded-2xl" />
            )}
          </>
        ) : (
          <div className="w-full max-w-md aspect-video bg-muted rounded-2xl flex flex-col items-center justify-center gap-4 p-8">
            <CameraOff className="w-16 h-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Camera access denied. How will I judge you now?
            </p>
            <Button variant="outline" onClick={startCamera} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Capture Button */}
      {hasCamera && isReady && (
        <Button
          onClick={captureImage}
          disabled={isAnalyzing}
          className="gift-button"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <span className="judging-dots flex gap-1 mr-2">
                <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </span>
              Judging...
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              Judge Me
            </>
          )}
        </Button>
      )}

      {/* Instruction text */}
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {isAnalyzing 
          ? "Hold still while I form my opinion..."
          : "Look into the camera and prepare for honest feedback. Very honest."
        }
      </p>
    </div>
  );
}
