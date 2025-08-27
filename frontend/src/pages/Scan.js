import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCamera, FaInfoCircle } from 'react-icons/fa';
import FloatingCurrency from '../components/FloatingCurrency';

const ScanContainer = styled.div`
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

const ScanWrapper = styled.div`
  max-width: 800px;
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
    content: '•';
    color: #00c6ff;
    font-size: 1.5rem;
  }
`;

const ScanFrame = styled(motion.div)`
  width: 100%;
  aspect-ratio: 4/3;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  &:before {
    content: '';
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

const ScanCorner = styled.div`
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

const ScanningAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, transparent, #00c6ff, transparent);
`;

const ScanOverlay = styled.div`
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

const ScanButton = styled(motion.button)`
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
    content: '';
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
  
  svg {
    font-size: 1.5rem;
  }
`;

const ScanText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process (frontend only)
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };
  
  return (
    <ScanContainer>
      {/* Floating currency background elements with minimal density for better focus */}
      <FloatingCurrency count={7} />
      
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Scan Currency
      </Title>
      
      <ScanWrapper>
        <InstructionsCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InstructionHeader>
            <InstructionIcon>
              <FaInfoCircle />
            </InstructionIcon>
            <InstructionTitle>How to Scan</InstructionTitle>
          </InstructionHeader>
          
          <InstructionsList>
            <InstructionItem>
              Place the currency note on a flat, well-lit surface.
            </InstructionItem>
            <InstructionItem>
              Hold your phone steady about 15-20 cm above the note.
            </InstructionItem>
            <InstructionItem>
              Make sure the entire note is visible within the frame.
            </InstructionItem>
            <InstructionItem>
              Press the scan button and wait for the result.
            </InstructionItem>
            <InstructionItem>
              The app will announce the detected currency denomination.
            </InstructionItem>
          </InstructionsList>
        </InstructionsCard>
        
        <ScanFrame
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ScanCorner className="top-left" />
          <ScanCorner className="top-right" />
          <ScanCorner className="bottom-left" />
          <ScanCorner className="bottom-right" />
          
          {isScanning && (
            <ScanningAnimation
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'loop' 
              }}
            />
          )}
          
          <ScanOverlay>
            <ScanText>
              {isScanning ? 'Scanning...' : 'Ready to scan currency'}
            </ScanText>
            
            <ScanButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScan}
              disabled={isScanning}
            >
              <FaCamera /> {isScanning ? 'Scanning...' : 'Start Scan'}
            </ScanButton>
          </ScanOverlay>
        </ScanFrame>
      </ScanWrapper>
    </ScanContainer>
  );
};

export default Scan;
