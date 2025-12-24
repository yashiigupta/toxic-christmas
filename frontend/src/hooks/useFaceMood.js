import { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';

export const useFaceMood = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detection, setDetection] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          // Load SSD Mobilenet V1 for high accuracy
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
          // We need landmarks for feature analysis
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), 
        ]);
        setModelsLoaded(true);
      } catch (e) {
        console.error("Error loading models:", e);
      }
    };
    loadModels();
  }, []);

  const analyzeFeatures = (landmarks) => {
    if (!landmarks) return {};
    
    const nose = landmarks.getNose();
    const mouth = landmarks.getMouth();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const jaw = landmarks.getJawOutline();

    // Simple heuristic ratios
    const faceWidth = jaw[16].x - jaw[0].x;
    const noseWidth = nose[6].x - nose[0].x;
    const mouthWidth = mouth[6].x - mouth[0].x;
    
    const features = {};

    if (noseWidth / faceWidth > 0.25) features.nose = "prominent";
    if (noseWidth / faceWidth < 0.15) features.nose = "button-like";
    
    if (mouthWidth / faceWidth > 0.4) features.smile = "wide";
    
    // Check for glasses (not directly supported, but can be inferred if detection is weird around eyes, but let's skip for now)
    
    return features;
  };

  const detect = async () => {
    if (!videoRef.current || !modelsLoaded) return;

    // Fix: react-webcam ref.current is the component, ref.current.video is the HTMLVideoElement
    const video = videoRef.current.video;
    
    // Ensure video is playing and has dimensions
    if (!video || video.paused || video.ended || !video.videoWidth) {
      return;
    }

    // Use SSD Mobilenet V1 for better accuracy (slower but more accurate than TinyFaceDetector)
    // Lower minConfidence to catch more faces
    const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 });
    
    try {
      const detections = await faceapi.detectAllFaces(video, options)
        .withFaceLandmarks() 
        .withFaceExpressions()
        .withAgeAndGender();

      console.log("Detections:", detections.length);

      if (detections && detections.length > 0) {
        const d = detections[0];
        
        // Get dominant expression
        const expressions = d.expressions;
        const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
        const mood = sorted[0][0];
        const confidence = sorted[0][1];

        // Analyze features if landmarks exist
        const features = d.landmarks ? analyzeFeatures(d.landmarks) : {};

        setDetection({
          mood,
          confidence,
          age: d.age,
          gender: d.gender,
          features,
          box: d.detection.box
        });
      } else {
        // Optional: Clear detection if face is lost, or keep last known state
        // setDetection(null); 
      }
    } catch (err) {
      console.error("Detection error:", err);
    }
  };

  // Run detection loop
  useEffect(() => {
    let interval;
    if (modelsLoaded && videoRef.current) {
      console.log("Starting detection loop...");
      interval = setInterval(detect, 500); // Run faster: every 500ms
    }
    return () => clearInterval(interval);
  }, [modelsLoaded]);

  return { videoRef, canvasRef, modelsLoaded, detection };
};
