import React, { useEffect, useState, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import VoiceCommandsDemo from './VoiceCommandsDemo';
import FloatingVoiceAssistant from './FloatingVoiceAssistant';

export const VoiceAssistantProvider = ({ children }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const navigate = useNavigate();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Check browser support
  if (!browserSupportsSpeechRecognition) {
    console.warn("Browser doesn't support speech recognition.");
  }

  // Text-to-Speech function
  const speak = useCallback((text, lang = "en-IN") => {
    if (!isVoiceEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }, [isVoiceEnabled]);

  // Handle camera mode switching
  const handleCameraMode = useCallback(() => {
    const cameraModeButton = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent.includes('Use Camera') || btn.textContent.includes('Camera')
    );
    
    if (cameraModeButton) {
      cameraModeButton.click();
      speak("Switched to camera mode");
    } else {
      speak("Camera mode not available on this page");
    }
  }, [speak]);

  // Handle upload mode switching
  const handleUploadMode = useCallback(() => {
    const uploadModeButton = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent.includes('Upload Image') || btn.textContent.includes('Upload')
    );
    
    if (uploadModeButton) {
      uploadModeButton.click();
      speak("Switched to upload mode");
    } else {
      speak("Upload mode not available on this page");
    }
  }, [speak]);

  // Handle stop camera
  const handleStopCamera = useCallback(() => {
    const stopButton = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent.includes('Stop Camera') || btn.textContent.includes('Stop')
    );
    
    if (stopButton) {
      stopButton.click();
      speak("Camera stopped");
    } else {
      speak("No active camera to stop");
    }
  }, [speak]);
  const handleImageCapture = useCallback(() => {
    // Check for file input (upload mode)
    const imageInput = document.querySelector('input[type="file"]');
    // Check for scan button
    const scanButton = document.querySelector('button:not([disabled])');
    
    // First try to find the capture button in webcam mode
    const webcamCaptureBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.innerHTML.includes('FaCamera') || btn.querySelector('svg') || btn.textContent.includes('capture')
    );
    
    if (webcamCaptureBtn && !webcamCaptureBtn.disabled) {
      webcamCaptureBtn.click();
      speak("Photo captured from camera");
    } else if (imageInput) {
      imageInput.click();
      speak("Opening camera to select image");
    } else if (scanButton && !scanButton.disabled) {
      scanButton.click();
      speak("Starting scan process");
    } else {
      speak("Camera not available on this page. Please navigate to scan page first.");
    }
  }, [speak]);

  // Map commands to actions
  useEffect(() => {
    const command = transcript.toLowerCase().trim();
    if (!command || !isVoiceEnabled) return;

    console.log("Voice command received:", command);

    if (command.includes("scan") || command.includes("go to scan")) {
      navigate("/scan");
      speak("Navigating to Scan page");
      resetTranscript();
    } else if (command.includes("history") || command.includes("go to history")) {
      navigate("/history");
      speak("Opening History page");
      resetTranscript();
    } else if (command.includes("objects") || command.includes("object detection") || command.includes("go to objects")) {
      navigate("/object-detection");
      speak("Opening Object Detection page");
      resetTranscript();
    } else if (command.includes("click image") || command.includes("take photo") || command.includes("capture image") || command.includes("capture photo")) {
      handleImageCapture();
      resetTranscript();
    } else if (command.includes("camera mode") || command.includes("use camera") || command.includes("switch to camera")) {
      handleCameraMode();
      resetTranscript();
    } else if (command.includes("upload mode") || command.includes("upload image") || command.includes("switch to upload")) {
      handleUploadMode();
      resetTranscript();
    } else if (command.includes("stop camera") || command.includes("close camera")) {
      handleStopCamera();
      resetTranscript();
    } else if (command.includes("home") || command.includes("go home") || command.includes("go to home")) {
      navigate("/");
      speak("Going back to Home");
      resetTranscript();
    } else if (command.includes("settings") || command.includes("go to settings")) {
      navigate("/settings");
      speak("Opening Settings page");
      resetTranscript();
    } else if (command.includes("help") || command.includes("what can you do")) {
      speak("I can help you navigate and control the app. Say 'go to scan', 'go to history', 'go to objects', 'go to settings', 'go home', 'take photo', 'camera mode', 'upload mode', or 'stop camera'.");
      resetTranscript();
    } else if (command.includes("stop listening") || command.includes("stop voice")) {
      setIsVoiceEnabled(false);
      SpeechRecognition.stopListening();
      speak("Voice assistant disabled");
      resetTranscript();
    } else if (command.includes("show commands") || command.includes("voice demo") || command.includes("show demo")) {
      setShowDemo(true);
      speak("Opening voice commands demo");
      resetTranscript();
    }
  }, [transcript, navigate, resetTranscript, isVoiceEnabled, speak, handleImageCapture, handleCameraMode, handleUploadMode, handleStopCamera, setShowDemo]);

  // Start listening when voice is enabled
  useEffect(() => {
    if (isVoiceEnabled && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  }, [isVoiceEnabled, browserSupportsSpeechRecognition]);

  const handleStartVoice = () => {
    setIsVoiceEnabled(true);
    speak("Voice assistant activated. Say 'help' to learn what I can do.");
  };

  const handleStopVoice = () => {
    setIsVoiceEnabled(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <>
      {children}
      {/* Beautiful Floating Voice Assistant */}
      {browserSupportsSpeechRecognition && (
        <FloatingVoiceAssistant 
          isVoiceEnabled={isVoiceEnabled}
          listening={listening}
          transcript={transcript}
          onStartVoice={handleStartVoice}
          onStopVoice={handleStopVoice}
          onShowDemo={() => setShowDemo(true)}
        />
      )}
      
      {/* Voice Commands Demo */}
      <VoiceCommandsDemo 
        isOpen={showDemo} 
        onClose={() => setShowDemo(false)} 
      />
    </>
  );
};

export default VoiceAssistantProvider;