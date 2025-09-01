import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaVolumeUp, FaLanguage, FaMicrophone } from 'react-icons/fa';
import FloatingCurrency from '../components/FloatingCurrency';

const SettingsContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #614385, #516395);
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const SettingsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SettingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SettingIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 1.5rem;
    color: white;
  }
`;

const SettingTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ToggleLabel = styled.label`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.3);
    transition: .4s;
    border-radius: 34px;
  }
  
  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + span {
    background-color: #00c6ff;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const VolumeContainer = styled.div`
  margin-top: 1.5rem;
`;

const VolumeSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00c6ff;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00c6ff;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const VolumeValue = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const LanguageContainer = styled.div`
  margin-top: 1.5rem;
`;

const LanguageOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const LanguageOption = styled.div`
  background: ${props => props.selected ? 'linear-gradient(135deg, #00c6ff, #0072ff)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.selected ? 'linear-gradient(135deg, #00c6ff, #0072ff)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-3px);
  }
`;

const Settings = () => {
  const [voiceAssistant, setVoiceAssistant] = useState(true);
  const [volume, setVolume] = useState(75);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  
  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi'];
  
  return (
    <SettingsContainer>
      {/* Floating currency background elements with lower density */}
      <FloatingCurrency count={10} />
      
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Settings
      </Title>
      
      <SettingsWrapper>
        <SettingCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SettingHeader>
            <SettingIcon>
              <FaMicrophone />
            </SettingIcon>
            <SettingTitle>Voice Assistant</SettingTitle>
          </SettingHeader>
          
          <ToggleContainer>
            <ToggleLabel>Enable Voice Assistant</ToggleLabel>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={voiceAssistant} 
                onChange={() => setVoiceAssistant(!voiceAssistant)}
              />
              <span></span>
            </ToggleSwitch>
          </ToggleContainer>
        </SettingCard>
        
        <SettingCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SettingHeader>
            <SettingIcon>
              <FaVolumeUp />
            </SettingIcon>
            <SettingTitle>Volume</SettingTitle>
          </SettingHeader>
          
          <VolumeContainer>
            <VolumeSlider 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={(e) => setVolume(e.target.value)}
            />
            <VolumeValue>{volume}%</VolumeValue>
          </VolumeContainer>
        </SettingCard>
        
        <SettingCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SettingHeader>
            <SettingIcon>
              <FaLanguage />
            </SettingIcon>
            <SettingTitle>Language</SettingTitle>
          </SettingHeader>
          
          <LanguageContainer>
            <ToggleLabel>Select Voice Assistant Language</ToggleLabel>
            <LanguageOptions>
              {languages.map((language) => (
                <LanguageOption
                  key={language}
                  selected={selectedLanguage === language}
                  onClick={() => setSelectedLanguage(language)}
                >
                  {language}
                </LanguageOption>
              ))}
            </LanguageOptions>
          </LanguageContainer>
        </SettingCard>
      </SettingsWrapper>
    </SettingsContainer>
  );
};

export default Settings;
