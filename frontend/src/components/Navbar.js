import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaHistory, FaCog, FaBars, FaEye, FaCamera } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div).attrs(props => ({
  'data-active': props.active ? 'true' : 'false'
}))`
  position: relative;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.active ? '#00c6ff' : 'white'};
  transition: color 0.3s ease;
  
  &:hover {
    color: #00c6ff;
  }
`;

const NavIcon = styled.div`
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavText = styled.div`
  font-size: 0.7rem;
  text-align: center;
  margin-top: 0.2rem;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  border-radius: 3px;
`;

// Hamburger Menu Styles
const HamburgerButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1100;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 5px;
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1050;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background: #111;
  z-index: 1060;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
`;

const MobileNavItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: ${props => props.active ? 'rgba(0, 198, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#00c6ff' : 'white'};
  
  &:hover {
    background: rgba(0, 198, 255, 0.1);
  }
`;

const MobileNavIcon = styled.div`
  font-size: 1.5rem;
`;

const MobileNavText = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    setActiveTab(location.pathname);
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
  const menuVariants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };
  
  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1
      }
    })
  };
  
  const topLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45, y: 9, backgroundColor: "#00c6ff" }
  };
  
  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const bottomLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: -45, y: -9, backgroundColor: "#00c6ff" }
  };
  
  return (
    <NavContainer>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          VisionAi
        </Logo>
      </Link>
      
      {/* Desktop Navigation */}
      <NavLinks>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink active={activeTab === '/'}>
            <NavIcon>
              <FaHome />
            </NavIcon>
            <NavText>Home</NavText>
            {activeTab === '/' && (
              <ActiveIndicator 
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        </Link>
        
        <Link to="/scan" style={{ textDecoration: 'none' }}>
          <NavLink active={activeTab === '/scan'}>
            <NavIcon>
              <FaCamera />
            </NavIcon>
            <NavText>Scan</NavText>
            {activeTab === '/scan' && (
              <ActiveIndicator 
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        </Link>
        
        <Link to="/object-detection" style={{ textDecoration: 'none' }}>
          <NavLink active={activeTab === '/object-detection'}>
            <NavIcon>
              <FaEye />
            </NavIcon>
            <NavText>Objects</NavText>
            {activeTab === '/object-detection' && (
              <ActiveIndicator 
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        </Link>
        
        <Link to="/history" style={{ textDecoration: 'none' }}>
          <NavLink active={activeTab === '/history'}>
            <NavIcon>
              <FaHistory />
            </NavIcon>
            <NavText>History</NavText>
            {activeTab === '/history' && (
              <ActiveIndicator 
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        </Link>
        
        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <NavLink active={activeTab === '/settings'}>
            <NavIcon>
              <FaCog />
            </NavIcon>
            <NavText>Settings</NavText>
            {activeTab === '/settings' && (
              <ActiveIndicator 
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        </Link>
      </NavLinks>
      
      {/* Hamburger Button */}
      <HamburgerButton onClick={toggleMenu}>
        <HamburgerLine 
          variants={topLineVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <HamburgerLine 
          variants={middleLineVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <HamburgerLine 
          variants={bottomLineVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </HamburgerButton>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <MobileMenuOverlay 
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={toggleMenu}
              transition={{ duration: 0.3 }}
            />
            <MobileMenu
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
                <MobileNavItem 
                  active={activeTab === '/'}
                  variants={itemVariants}
                  custom={0}
                  whileTap={{ scale: 0.95 }}
                >
                  <MobileNavIcon>
                    <FaHome />
                  </MobileNavIcon>
                  <MobileNavText>Home</MobileNavText>
                </MobileNavItem>
              </Link>
              
              <Link to="/scan" style={{ textDecoration: 'none' }}>
                <MobileNavItem 
                  active={activeTab === '/scan'}
                  variants={itemVariants}
                  custom={1}
                  whileTap={{ scale: 0.95 }}
                >
                  <MobileNavIcon>
                    <FaCamera />
                  </MobileNavIcon>
                  <MobileNavText>Scan</MobileNavText>
                </MobileNavItem>
              </Link>
              
              <Link to="/object-detection" style={{ textDecoration: 'none' }}>
                <MobileNavItem 
                  active={activeTab === '/object-detection'}
                  variants={itemVariants}
                  custom={2}
                  whileTap={{ scale: 0.95 }}
                >
                  <MobileNavIcon>
                    <FaEye />
                  </MobileNavIcon>
                  <MobileNavText>Object Detection</MobileNavText>
                </MobileNavItem>
              </Link>
              
              <Link to="/history" style={{ textDecoration: 'none' }}>
                <MobileNavItem 
                  active={activeTab === '/history'}
                  variants={itemVariants}
                  custom={3}
                  whileTap={{ scale: 0.95 }}
                >
                  <MobileNavIcon>
                    <FaHistory />
                  </MobileNavIcon>
                  <MobileNavText>History</MobileNavText>
                </MobileNavItem>
              </Link>
              
              <Link to="/settings" style={{ textDecoration: 'none' }}>
                <MobileNavItem 
                  active={activeTab === '/settings'}
                  variants={itemVariants}
                  custom={4}
                  whileTap={{ scale: 0.95 }}
                >
                  <MobileNavIcon>
                    <FaCog />
                  </MobileNavIcon>
                  <MobileNavText>Settings</MobileNavText>
                </MobileNavItem>
              </Link>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;
