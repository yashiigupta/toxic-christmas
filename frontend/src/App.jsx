import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ConsentScreen } from './components/ConsentScreen';
import { JudgmentApp } from './components/JudgementApp';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route 
        path="/" 
        element={<ConsentScreen onConsent={() => navigate('/app')} />} 
      />
      <Route 
        path="/app" 
        element={<JudgmentApp onExit={() => navigate('/')} />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;
