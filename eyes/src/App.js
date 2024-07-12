import React, { useState } from "react";
import Courses from "./pages/category";
import Contact from "./pages/contact";
import Listing from "./pages/listing";
import Index from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/newreports');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    setShowList(!showList);
    if (!showList) {
      fetchItems();
    }
  };

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Listing />} />
        </Routes>
      </BrowserRouter>
      {showList && (
        <div className="overlay">
          <div className="notification-container">
            {items.map((item) => (
              <div key={item.id} className="notification">
                <div className="notification-content">
                  <div className="notification-header">
                    <h2>{item.name}</h2>
                    <span className="notification-time">{item.time} | {item.date}</span>
                  </div>
                  <div className="notification-body">
                    <p>{item.category} at {item.place}</p>
                    <p>Violator: {item.violator}</p>
                    <a href={item.video} target="_blank" rel="noopener noreferrer">Watch Video</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
