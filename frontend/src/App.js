import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import History from './pages/History';
import Settings from './pages/Settings';
import Scan from './pages/Scan';
import ObjectDetection from './pages/ObjectDetection';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CursorTrail from './components/CursorTrail';
import VoiceAssistantProvider from './components/VoiceAssistantProvider';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', 'Poppins', sans-serif;
    cursor: none;
  }

  body {
    overflow-x: hidden;
    background: #000;
    color: #fff;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', 'Montserrat', sans-serif;
    font-weight: 600;
  }

  a, button, input, select, textarea {
    cursor: none;
  }
`;

const AppLayout = () => {
  return (
    <VoiceAssistantProvider>
      <Navbar />
      <div id="content">
        <Outlet />
      </div>
    </VoiceAssistantProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <AppLayout />
    }>
      <Route index element={<Home />} />
      <Route path="history" element={<History />} />
      <Route path="settings" element={<Settings />} />
      <Route path="scan" element={<Scan />} />
      <Route path="object-detection" element={<ObjectDetection />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <GlobalStyle />
      <CustomCursor />
      <CursorTrail />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
