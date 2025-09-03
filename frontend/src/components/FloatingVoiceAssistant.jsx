import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaQuestionCircle, FaTimes, FaPlay, FaStop } from 'react-icons/fa';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ripple = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
`;

// Styled Components
const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

const MainMicButton = styled(motion.button)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  ${props => props.isListening && css`
    animation: ${pulse} 2s infinite;
  `}
  
  ${props => props.isActive ? css`
    background: linear-gradient(135deg, #00ff88, #00c6ff);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #00e67a, #00b5e6);
      transform: scale(1.05);
    }
  ` : css`
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    color: #00c6ff;
    border: 2px solid rgba(0, 198, 255, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, rgba(0, 198, 255, 0.2), rgba(0, 198, 255, 0.1));
      border-color: rgba(0, 198, 255, 0.5);
      transform: scale(1.05);
    }
  `}
`;

const RippleEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid #00ff88;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${ripple} 2s infinite;
  opacity: ${props => props.show ? 1 : 0};
`;

const ControlPanel = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);
  min-width: 280px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PanelTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: none;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ControlButton = styled(motion.button)`
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #00c6ff, #0072ff)' 
    : props.variant === 'danger'
    ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: none;
    transform: none;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusIndicator = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: white;
  min-width: 200px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#00ff88' : '#666'};
  animation: ${props => props.active ? css`${pulse} 2s infinite` : 'none'};
`;

const TranscriptBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  max-width: 300px;
  word-wrap: break-word;
  
  &:before {
    content: '"';
    color: #00c6ff;
  }
  
  &:after {
    content: '"';
    color: #00c6ff;
  }
`;

const QuickCommandsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
`;

const QuickCommandButton = styled(motion.button)`
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  cursor: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 198, 255, 0.2);
    border-color: rgba(0, 198, 255, 0.4);
    color: white;
  }
`;

const FloatingVoiceAssistant = ({ 
  isVoiceEnabled, 
  listening, 
  transcript, 
  onStartVoice, 
  onStopVoice, 
  onShowDemo 
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const quickCommands = [
    "Go to scan",
    "Go to history", 
    "Take photo",
    "Help"
  ];

  const handleQuickCommand = (command) => {
    // Simulate speaking the command
    const utterance = new SpeechSynthesisUtterance(command);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
  };

  return (
    <FloatingContainer>
      {/* Transcript Display */}
      <AnimatePresence>
        {transcript && isVoiceEnabled && (
          <TranscriptBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {transcript}
          </TranscriptBox>
        )}
      </AnimatePresence>

      {/* Status Indicator */}
      <AnimatePresence>
        {isVoiceEnabled && (
          <StatusIndicator
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <StatusDot active={listening} />
            <span>{listening ? 'Listening...' : 'Voice Active'}</span>
            <FaVolumeUp size={12} />
          </StatusIndicator>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <ControlPanel
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PanelHeader>
              <PanelTitle>
                <FaMicrophone />
                Voice Assistant
              </PanelTitle>
              <CloseButton onClick={() => setShowPanel(false)}>
                <FaTimes />
              </CloseButton>
            </PanelHeader>

            {!isVoiceEnabled ? (
              <ControlButton
                variant="primary"
                onClick={onStartVoice}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPlay />
                Start Voice Assistant
              </ControlButton>
            ) : (
              <ControlButton
                variant="danger"
                onClick={onStopVoice}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaStop />
                Stop Voice Assistant
              </ControlButton>
            )}

            <ControlButton
              onClick={onShowDemo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaQuestionCircle />
              View All Commands
            </ControlButton>

            {isVoiceEnabled && (
              <>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '12px', 
                  margin: '12px 0 8px 0',
                  textAlign: 'center'
                }}>
                  Quick Commands
                </div>
                <QuickCommandsGrid>
                  {quickCommands.map((command, index) => (
                    <QuickCommandButton
                      key={index}
                      onClick={() => handleQuickCommand(command)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {command}
                    </QuickCommandButton>
                  ))}
                </QuickCommandsGrid>
              </>
            )}
          </ControlPanel>
        )}
      </AnimatePresence>

      {/* Main Microphone Button */}
      <MainMicButton
        isActive={isVoiceEnabled}
        isListening={listening}
        onClick={() => setShowPanel(!showPanel)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: isVoiceEnabled ? [0, -2, 0] : 0,
        }}
        transition={{ 
          duration: 2,
          repeat: isVoiceEnabled ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <RippleEffect show={listening} />
        <motion.div
          animate={{ 
            rotate: listening ? [0, -10, 10, 0] : 0,
            scale: listening ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: 0.5,
            repeat: listening ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {isVoiceEnabled ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
        </motion.div>
      </MainMicButton>
    </FloatingContainer>
  );
};

export default FloatingVoiceAssistant;