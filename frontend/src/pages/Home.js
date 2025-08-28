import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import FloatingCurrency from '../components/FloatingCurrency';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: white;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

const ScanButton = styled(motion.button)`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 0 auto 3rem auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const TopFeaturesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const CenteredFeature = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const Home = () => {
  return (
    <HomeContainer>
      {/* Floating currency background elements with more elements and varied sizes */}
      <FloatingCurrency count={20} />
      
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to VisionAi.
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Empowering the visually impaired to identify currency notes with ease and confidence.
        </Subtitle>
        
        <Link to="/scan" style={{ textDecoration: 'none' }}>
          <ScanButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Get started <FaArrowRight />
          </ScanButton>
        </Link>
        
        <FeaturesContainer>
          <TopFeaturesRow>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FeatureTitle>Instant Recognition</FeatureTitle>
              <FeatureDescription>
                Our advanced AI technology quickly identifies currency notes with high accuracy.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FeatureTitle>Voice Assistance</FeatureTitle>
              <FeatureDescription>
                Clear audio feedback in multiple languages including Hindi to announce the detected currency.
              </FeatureDescription>
            </FeatureCard>
          </TopFeaturesRow>
          
          <CenteredFeature>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <FeatureTitle>Scan History</FeatureTitle>
              <FeatureDescription>
                Keep track of all your previous currency scans with detailed information and timestamps.
              </FeatureDescription>
            </FeatureCard>
          </CenteredFeature>
        </FeaturesContainer>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
