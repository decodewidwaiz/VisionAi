import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';

const TrailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const TrailElement = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: ${props => props.size}px;
  pointer-events: none;
`;

const CurrencyIcon = ({ type }) => {
  switch (type) {
    case 0:
      return <FaRupeeSign />;
    case 1:
      return <FaDollarSign />;
    case 2:
      return <FaEuroSign />;
    case 3:
      return <FaPoundSign />;
    case 4:
      return <FaYenSign />;
    default:
      return <FaRupeeSign />;
  }
};

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailElements, setTrailElements] = useState([]);
  const [lastAddTime, setLastAddTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail elements at intervals
      const now = Date.now();
      if (now - lastAddTime > 100) { // Add a new element every 100ms
        setLastAddTime(now);
        
        const newElement = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 15 + 10, // Increased size (10-25px)
          type: Math.floor(Math.random() * 5),
          offsetX: (Math.random() - 0.5) * 40,
          offsetY: (Math.random() - 0.5) * 40
        };
        
        setTrailElements(prev => [...prev, newElement]);
        
        // Remove elements after they've been displayed for a while
        setTimeout(() => {
          setTrailElements(prev => prev.filter(item => item.id !== newElement.id));
        }, 1500); // Elements last for 1.5 seconds
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastAddTime]);

  return (
    <TrailContainer>
      <AnimatePresence>
        {trailElements.map((element) => (
          <TrailElement
            key={element.id}
            size={element.size}
            initial={{ 
              x: element.x, 
              y: element.y,
              opacity: 0.9,
              scale: 0.3
            }}
            animate={{ 
              x: element.x + element.offsetX,
              y: element.y + element.offsetY,
              opacity: 0,
              scale: 1.2
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
          >
            <CurrencyIcon type={element.type} />
          </TrailElement>
        ))}
      </AnimatePresence>
    </TrailContainer>
  );
};

export default CursorTrail;
