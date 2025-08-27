import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaRupeeSign, FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';

const FloatingElement = styled(motion.div).attrs(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    fontSize: `${props.size || 30}px`,
    color: `rgba(255, 255, 255, ${props.opacity || 0.3})`,
    filter: `blur(${props.blur || 1}px)`
  }
}))`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
`;

// Define specific positions across the screen
const PREDEFINED_POSITIONS = [
  { left: 10, top: 15 },
  { left: 85, top: 25 },
  { left: 35, top: 8 },
  { left: 65, top: 75 },
  { left: 20, top: 85 },
  { left: 80, top: 65 },
  { left: 45, top: 35 },
  { left: 15, top: 45 },
  { left: 90, top: 10 },
  { left: 75, top: 40 },
  { left: 25, top: 60 },
  { left: 55, top: 90 },
  { left: 5, top: 30 },
  { left: 70, top: 20 },
  { left: 40, top: 70 },
  { left: 60, top: 50 },
  { left: 30, top: 80 },
  { left: 50, top: 15 },
  { left: 85, top: 55 },
  { left: 20, top: 40 }
];

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

const FloatingCurrency = ({ count = 10 }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Ensure count doesn't exceed available positions
    const safeCount = Math.min(count, PREDEFINED_POSITIONS.length);
    
    // Use only as many predefined positions as needed
    const positions = PREDEFINED_POSITIONS.slice(0, safeCount);
    
    const newElements = positions.map((position, index) => {
      return {
        id: index,
        left: position.left,
        top: position.top,
        size: Math.random() * 40 + 20,
        blur: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 15,
        opacity: Math.random() * 0.2 + 0.2,
        currencyType: Math.floor(Math.random() * 5),
        delay: Math.random() * 10,
      };
    });
    
    setElements(newElements);
  }, [count]);

  return (
    <>
      {elements.map((element) => (
        <FloatingElement
          key={element.id}
          size={element.size}
          blur={element.blur}
          opacity={element.opacity}
          left={element.left}
          top={element.top}
          initial={{
            rotate: element.rotation,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            rotate: [element.rotation, element.rotation + 20, element.rotation - 10, element.rotation],
            opacity: [0, element.opacity + 0.1, element.opacity, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            repeatType: 'loop',
            ease: 'easeInOut',
            times: [0, 0.1, 0.9, 1],
          }}
        >
          <CurrencyIcon type={element.currencyType} />
        </FloatingElement>
      ))}
    </>
  );
};

export default FloatingCurrency;
