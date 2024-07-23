import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Courses from "./pages/category";
import Contact from "./pages/contact";
import Listing from "./pages/listing";
import Index from "./pages/index";
import Reports from "./pages/reports";
import VideoPlayer from './pages/player';
import Header from "./components/header";
import Footer from "./components/footer";
import axios from 'axios';
import './App.css';

function App() {
  const [newReportCount, setNewReportCount] = useState(0);
  const [unsolvedReportCount, setUnsolvedReportCount] = useState(0);

  const fetchReportCounts = async () => {
    try {
      const newReportsResponse = await axios.get('http://localhost:8000/newreports');
      const unsolvedReportsResponse = await axios.get('http://localhost:8000/unsolvedreports');
      setNewReportCount(newReportsResponse.data.length);
      setUnsolvedReportCount(unsolvedReportsResponse.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchReportCounts();
    const interval = setInterval(() => {
      fetchReportCounts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Header newReportCount={newReportCount} unsolvedReportCount={unsolvedReportCount} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Listing />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/video/:videoUrl" element={<VideoPlayer />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
