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
        <div className="container-list">
          <h1>Items List</h1>
          <div className="list-container">
            {items.map((item, index) => (
              <div key={index} className="list-item">
                {item}
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
