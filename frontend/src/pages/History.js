import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaRupeeSign, FaClock, FaCalendarAlt } from 'react-icons/fa';
import FloatingCurrency from '../components/FloatingCurrency';

const HistoryContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
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

const HistoryList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HistoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const CurrencyIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 2rem;
    color: white;
  }
`;

const HistoryInfo = styled.div`
  flex: 1;
`;

const CurrencyValue = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const TimeDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
`;

// Mock data for history items
const mockHistoryData = [
  {
    id: 1,
    currency: 'Indian Rupee',
    value: '500',
    date: '25 Mar 2025',
    time: '14:30'
  },
  {
    id: 2,
    currency: 'Indian Rupee',
    value: '2000',
    date: '24 Mar 2025',
    time: '11:15'
  },
  {
    id: 3,
    currency: 'Indian Rupee',
    value: '100',
    date: '23 Mar 2025',
    time: '18:45'
  },
  {
    id: 4,
    currency: 'Indian Rupee',
    value: '200',
    date: '22 Mar 2025',
    time: '09:20'
  },
  {
    id: 5,
    currency: 'Indian Rupee',
    value: '50',
    date: '21 Mar 2025',
    time: '16:05'
  }
];

const History = () => {
  return (
    <HistoryContainer>
      {/* Floating currency background elements with medium density */}
      <FloatingCurrency count={12} />
      
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Scan History
      </Title>
      
      <HistoryList>
        {mockHistoryData.length > 0 ? (
          mockHistoryData.map((item, index) => (
            <HistoryCard
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CurrencyIcon>
                <FaRupeeSign />
              </CurrencyIcon>
              <HistoryInfo>
                <CurrencyValue>
                  {item.currency} - {item.value}
                </CurrencyValue>
                <TimeInfo>
                  <TimeDetail>
                    <FaCalendarAlt />
                    {item.date}
                  </TimeDetail>
                  <TimeDetail>
                    <FaClock />
                    {item.time}
                  </TimeDetail>
                </TimeInfo>
              </HistoryInfo>
            </HistoryCard>
          ))
        ) : (
          <EmptyMessage>No scan history available yet.</EmptyMessage>
        )}
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
