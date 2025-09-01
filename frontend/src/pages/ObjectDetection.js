import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaCamera, FaInfoCircle, FaUpload, FaEye, FaTrash } from "react-icons/fa";
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

const UploadFrame = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 4/3;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00c6ff;
    box-shadow: 0 15px 35px rgba(0, 198, 255, 0.3);
  }
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const UploadButton = styled(motion.button)`
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
  const fileInputRef = useRef(null);

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
              Upload an image containing objects you want to detect.
            </InstructionItem>
            <InstructionItem>
              The AI will identify and label common objects like people, animals, vehicles, and household items.
            </InstructionItem>
            <InstructionItem>
              Each detected object will be highlighted with a bounding box and confidence score.
            </InstructionItem>
            <InstructionItem>
              Best results with clear, well-lit images containing recognizable objects.
            </InstructionItem>
            <InstructionItem>
              The model can detect 80+ different object classes from the COCO dataset.
            </InstructionItem>
          </InstructionsList>
        </InstructionsCard>

        {!imageUrl ? (
          <UploadFrame
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <UploadText>
              {isLoading ? loadingMessage : "Click to upload an image for object detection"}
            </UploadText>

            <UploadButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <FaUpload /> {isLoading ? "Processing..." : "Upload Image"}
            </UploadButton>
          </UploadFrame>
        ) : (
          <ControlsContainer>
            <UploadButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadClick}
              disabled={isLoading}
            >
              <FaUpload /> Upload New Image
            </UploadButton>
            <ClearButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
            >
              <FaTrash /> Clear All
            </ClearButton>
          </ControlsContainer>
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
                alt={imageName || 'Uploaded image'}
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </DetectionContainer>
  );
};

export default ObjectDetection;