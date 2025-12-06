import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Admin from './pages/Admin';
import TestModeWarning from './components/TestModeWarning';

function App() {
  return (
    <Router>
      <TestModeWarning /> 
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/me" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;