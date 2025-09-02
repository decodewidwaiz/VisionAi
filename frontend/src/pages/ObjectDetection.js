import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaCamera, FaInfoCircle, FaEye, FaTrash, FaStop } from "react-icons/fa";
import FloatingCurrency from "../components/FloatingCurrency";
import { detectObjects } from "../services/detectionService";

const DetectionContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #000428, #004e92, #001e54);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #00c6ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const DetectionWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const InstructionsCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const InstructionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InstructionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.2rem;
    color: white;
  }
`;

const InstructionTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const InstructionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const InstructionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;

  &:before {
    content: "•";
    color: #00c6ff;
    font-size: 1.5rem;
  }
`;

const DetectionFrame = styled(motion.div)`
  width: 100%;
  aspect-ratio: 4/3;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    animation: scanShine 5s infinite linear;
  }

  @keyframes scanShine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
`;

const DetectionCorner = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: #00c6ff;
  border-style: solid;
  border-width: 0;

  &.top-left {
    top: 20px;
    left: 20px;
    border-top-width: 3px;
    border-left-width: 3px;
  }

  &.top-right {
    top: 20px;
    right: 20px;
    border-top-width: 3px;
    border-right-width: 3px;
  }

  &.bottom-left {
    bottom: 20px;
    left: 20px;
    border-bottom-width: 3px;
    border-left-width: 3px;
  }

  &.bottom-right {
    bottom: 20px;
    right: 20px;
    border-bottom-width: 3px;
    border-right-width: 3px;
  }
`;

const DetectionAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, transparent, #00c6ff, transparent);
`;

const DetectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const DetectionText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ModeToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 5px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const ModeButton = styled(motion.button)`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 
    'linear-gradient(to right, #00c6ff, #0072ff)' : 
    'transparent'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  
  &:hover {
    color: white;
    background: ${props => props.active ? 
      'linear-gradient(to right, #00c6ff, #0072ff)' : 
      'rgba(255, 255, 255, 0.1)'};
  }
`;

const WebcamContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
`;

const WebcamVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WebcamControls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const CaptureButton = styled(motion.button)`
  background: linear-gradient(to right, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.5);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.6);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: 2rem;
  }
`;

const StopButton = styled(motion.button)`
  background: linear-gradient(to right, #6c757d, #495057);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 10px 25px rgba(108, 117, 125, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(108, 117, 125, 0.6);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const DetectionButton = styled(motion.button)`
  background: linear-gradient(to right, #00c6ff, #0072ff, #0046ff);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 114, 255, 0.5);
  transition: all 0.3s ease;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #0046ff, #0072ff, #00c6ff);
    z-index: -1;
    transition: opacity 0.5s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 114, 255, 0.6);

    &:before {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const ResultsContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const BoundingBox = styled.div`
  position: absolute;
  border: 3px solid #00c6ff;
  background: rgba(0, 198, 255, 0.1);
  pointer-events: none;
  border-radius: 4px;
`;

const DetectionLabel = styled.div`
  position: absolute;
  background: #00c6ff;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  top: -25px;
  left: 0;
  white-space: nowrap;
`;

const DetectionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const DetectionItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetectionClass = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #00c6ff;
  margin-bottom: 0.5rem;
`;

const DetectionConfidence = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #00c6ff;
  border-radius: 50%;
  margin: 2rem auto;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ClearButton = styled(motion.button)`
  background: linear-gradient(to right, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.5);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.6);
  }

  svg {
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  min-width: 120px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00c6ff;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
`;

const ObjectDetection = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing...');
  const [error, setError] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [webcamError, setWebcamError] = useState(null);
  const [captureMode, setCaptureMode] = useState('webcam'); // Default to webcam
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to start webcam
  const startWebcam = async () => {
    try {
      setWebcamError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });
      
      setStream(mediaStream);
      setIsWebcamActive(true);
      setCaptureMode('webcam');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      setWebcamError('Unable to access camera. Please check permissions.');
      console.error('Error accessing webcam:', error);
    }
  };

  // Function to stop webcam
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsWebcamActive(false);
    setWebcamError(null);
  };

  // Function to capture image from webcam
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setDetections([]);
      setLoadingMessage('Capturing and processing image...');
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob for file processing
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
          await handleImageUpload(file);
        }
      }, 'image/jpeg', 0.8);
      
    } catch (error) {
      setError(error.message || "Failed to capture and detect objects");
      setIsLoading(false);
    }
  };

  // Cleanup webcam on component unmount
  useEffect(() => {
    // Start webcam by default
    startWebcam();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle webcam stream changes
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
      const handleImageUpload = async (file) => {
    setDetections([]);
    setError(null);
    setIsLoading(true);
    setLoadingMessage('Loading model and processing image...');

    try {
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
      setImageName(file.name);

      const results = await detectObjects(file);
      setDetections(results);

      if (results.length === 0) {
        setError('No objects were detected in this image. Try another image with clearer objects.');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to process the image. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    handleImageUpload(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setImageUrl(null);
    setImageName(null);
    setDetections([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Restart webcam after clearing
    if (captureMode === 'webcam' && !isWebcamActive) {
      startWebcam();
    }
  };

  const calculateImageDimensions = () => {
    if (!imageUrl) return { width: 0, height: 0 };
    
    const img = document.querySelector('.preview-image');
    if (img) {
      return {
        width: img.clientWidth,
        height: img.clientHeight
      };
    }
    return { width: 0, height: 0 };
  };

  const getUniqueClasses = () => {
    const uniqueClasses = [...new Set(detections.map(d => d.class))];
    return uniqueClasses.length;
  };

  const getAverageConfidence = () => {
    if (detections.length === 0) return 0;
    const total = detections.reduce((sum, d) => sum + d.confidence, 0);
    return Math.round((total / detections.length) * 100);
  };

  return (
    <DetectionContainer>
      {/* Floating currency background elements */}
      <FloatingCurrency count={5} />

      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Object Detection
      </Title>

      <DetectionWrapper>
        <InstructionsCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InstructionHeader>
            <InstructionIcon>
              <FaInfoCircle />
            </InstructionIcon>
            <InstructionTitle>How to Use Object Detection</InstructionTitle>
          </InstructionHeader>

          <InstructionsList>
            <InstructionItem>
              Allow camera permissions when prompted to start object detection.
            </InstructionItem>
            <InstructionItem>
              Position objects clearly in front of the camera for best detection results.
            </InstructionItem>
            <InstructionItem>
              Hold your device steady and ensure good lighting conditions.
            </InstructionItem>
            <InstructionItem>
              Press the capture button to take a photo and detect objects.
            </InstructionItem>
            <InstructionItem>
              The AI will identify and label common objects like people, animals, vehicles, and household items.
            </InstructionItem>
            <InstructionItem>
              Each detected object will be highlighted with a bounding box and confidence score.
            </InstructionItem>
            <InstructionItem>
              The model can detect 80+ different object classes from the COCO dataset.
            </InstructionItem>
          </InstructionsList>
        </InstructionsCard>

        <DetectionFrame
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DetectionCorner className="top-left" />
          <DetectionCorner className="top-right" />
          <DetectionCorner className="bottom-left" />
          <DetectionCorner className="bottom-right" />

          {isLoading && (
            <DetectionAnimation
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          )}

          {captureMode === 'webcam' && isWebcamActive ? (
            <WebcamContainer>
              <WebcamVideo
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              />
            </WebcamContainer>
          ) : (
            <DetectionOverlay>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment" // This enables camera on mobile
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <DetectionText>
                {isLoading ? loadingMessage : "Camera not available - Click to upload an image"}
              </DetectionText>

              <DetectionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadClick}
                disabled={isLoading}
              >
                <FaCamera /> {isLoading ? "Processing..." : "Upload Image"}
              </DetectionButton>
            </DetectionOverlay>
          )}
        </DetectionFrame>

        {/* Webcam controls */}
        {captureMode === 'webcam' && isWebcamActive && (
          <WebcamControls>
            <CaptureButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={captureImage}
              disabled={isLoading}
            >
              <FaCamera />
            </CaptureButton>
            <StopButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopWebcam}
            >
              <FaStop /> Stop Camera
            </StopButton>
          </WebcamControls>
        )}

        {/* Loading State */}
        {isLoading && (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Error Message */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {webcamError && (
          <ErrorMessage>
            {webcamError}
          </ErrorMessage>
        )}

        {/* Results */}
        {!isLoading && detections.length > 0 && (
          <ResultsContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#00c6ff' }}>
              Detection Results
            </h3>

            {/* Clear button for results */}
            <ControlsContainer>
              <ClearButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
              >
                <FaTrash /> Clear Results
              </ClearButton>
            </ControlsContainer>

            {/* Statistics */}
            <StatsContainer>
              <StatItem>
                <StatValue>{detections.length}</StatValue>
                <StatLabel>Objects Found</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{getUniqueClasses()}</StatValue>
                <StatLabel>Unique Classes</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{getAverageConfidence()}%</StatValue>
                <StatLabel>Avg Confidence</StatLabel>
              </StatItem>
            </StatsContainer>

            {/* Image with Bounding Boxes */}
            <ImagePreview>
              <PreviewImage
                src={imageUrl}
                alt={imageName || 'Captured image'}
                className="preview-image"
                onLoad={() => {
                  // Force re-render to calculate bounding boxes correctly
                  setTimeout(() => setDetections([...detections]), 100);
                }}
              />
              {detections.map((detection, index) => {
                const imgDimensions = calculateImageDimensions();
                const [x, y, width, height] = detection.bbox;
                
                // Convert bbox coordinates to percentage for responsive positioning
                const leftPercent = (x / imgDimensions.width) * 100;
                const topPercent = (y / imgDimensions.height) * 100;
                const widthPercent = (width / imgDimensions.width) * 100;
                const heightPercent = (height / imgDimensions.height) * 100;

                return (
                  <BoundingBox
                    key={index}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: `${widthPercent}%`,
                      height: `${heightPercent}%`,
                    }}
                  >
                    <DetectionLabel>
                      {detection.class} ({Math.round(detection.confidence * 100)}%)
                    </DetectionLabel>
                  </BoundingBox>
                );
              })}
            </ImagePreview>

            {/* Detections List */}
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Detected Objects
            </h4>
            <DetectionsList>
              {detections.map((detection, index) => (
                <DetectionItem key={index}>
                  <DetectionClass>{detection.class}</DetectionClass>
                  <DetectionConfidence>
                    Confidence: {Math.round(detection.confidence * 100)}%
                  </DetectionConfidence>
                </DetectionItem>
              ))}
            </DetectionsList>
          </ResultsContainer>
        )}

        {/* Preview without detections */}
        {imageUrl && !isLoading && !error && detections.length === 0 && (
          <ResultsContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Preview</h3>
            <ImagePreview>
              <PreviewImage
                src={imageUrl}
                alt={imageName || 'Uploaded image'}
              />
            </ImagePreview>
          </ResultsContainer>
        )}
      </DetectionWrapper>
    </DetectionContainer>
  );
};

export default ObjectDetection;