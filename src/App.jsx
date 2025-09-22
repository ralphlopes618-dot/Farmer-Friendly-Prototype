import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import YieldPredictionPage from './pages/YieldPredictionPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import GovtSchemesPage from './pages/GovtSchemesPage';
import ChatbotPage from './pages/ChatbotPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="yield-prediction" element={<YieldPredictionPage />} />
            <Route path="crop-recommendation" element={<CropRecommendationPage />} />
            <Route path="disease-detection" element={<DiseaseDetectionPage />} />
            <Route path="govt-schemes" element={<GovtSchemesPage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;