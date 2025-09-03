import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaVolumeUp, FaTimes } from 'react-icons/fa';

const DemoOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const DemoContainer = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  border-radius: 20px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  color: white;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DemoTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
`;

const CommandCategory = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h3`
  color: #00c6ff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommandList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const CommandItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid #00c6ff;
`;

const CommandText = styled.span`
  font-weight: 600;
`;

const CommandDescription = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const TestButton = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: none;
  }
`;

const VoiceCommandsDemo = ({ isOpen, onClose }) => {
  const [testingCommand, setTestingCommand] = useState(null);

  const commandCategories = [
    {
      title: '🧭 Navigation Commands',
      icon: '🧭',
      commands: [
        { text: '"Go to scan"', description: 'Navigate to currency scanning' },
        { text: '"Go to history"', description: 'Open scan history' },
        { text: '"Go to objects"', description: 'Open object detection' },
        { text: '"Go to settings"', description: 'Open settings page' },
        { text: '"Go home"', description: 'Return to home page' },
      ]
    },
    {
      title: '📷 Camera Control',
      icon: '📷',
      commands: [
        { text: '"Take photo"', description: 'Capture image for scanning' },
        { text: '"Camera mode"', description: 'Switch to camera mode' },
        { text: '"Upload mode"', description: 'Switch to upload mode' },
        { text: '"Stop camera"', description: 'Stop active camera' },
      ]
    },
    {
      title: '🆘 Help & Control',
      icon: '🆘',
      commands: [
        { text: '"Help"', description: 'Get list of commands' },
        { text: '"Stop listening"', description: 'Disable voice assistant' },
      ]
    }
  ];

  const testCommand = (command) => {
    setTestingCommand(command);
    
    // Simulate speaking the command
    const utterance = new SpeechSynthesisUtterance(`Testing command: ${command.text}`);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
    
    setTimeout(() => {
      setTestingCommand(null);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <DemoOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <DemoContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          
          <DemoTitle>🎤 Voice Assistant Commands</DemoTitle>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
            Try these voice commands with your voice assistant active!
          </div>
          
          {commandCategories.map((category, index) => (
            <CommandCategory key={index}>
              <CategoryTitle>
                <span>{category.icon}</span>
                {category.title}
              </CategoryTitle>
              <CommandList>
                {category.commands.map((command, cmdIndex) => (
                  <CommandItem
                    key={cmdIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * category.commands.length + cmdIndex) * 0.1 }}
                  >
                    <div>
                      <CommandText>{command.text}</CommandText>
                      <div>
                        <CommandDescription>{command.description}</CommandDescription>
                      </div>
                    </div>
                    <TestButton
                      onClick={() => testCommand(command)}
                      disabled={testingCommand === command}
                    >
                      {testingCommand === command ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FaVolumeUp />
                          </motion.div>
                          Testing...
                        </>
                      ) : (
                        <>
                          <FaMicrophone />
                          Test
                        </>
                      )}
                    </TestButton>
                  </CommandItem>
                ))}
              </CommandList>
            </CommandCategory>
          ))}
          
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'rgba(0, 198, 255, 0.1)', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 198, 255, 0.3)'
          }}>
            <strong>💡 Pro Tips:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Speak clearly at normal volume</li>
              <li>Wait for confirmation before next command</li>
              <li>Use exact phrases shown above</li>
              <li>Reduce background noise for better recognition</li>
            </ul>
          </div>
        </DemoContainer>
      </DemoOverlay>
    </AnimatePresence>
  );
};

export default VoiceCommandsDemo;