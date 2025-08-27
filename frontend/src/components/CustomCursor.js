import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorDot = styled(motion.div)`
  position: fixed;
  width: 10px;
  height: 10px;
  background: #00c6ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid #00c6ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const springConfig = { 
    type: 'spring', 
    damping: 25, 
    stiffness: 400, 
    mass: 0.1 
  };

  return (
    <>
      <CursorDot
        style={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={springConfig}
      />
      <CursorRing
        style={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={springConfig}
      />
    </>
  );
};

export default CustomCursor;
