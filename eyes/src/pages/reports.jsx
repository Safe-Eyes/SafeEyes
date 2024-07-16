import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/Users/adilzhan/Desktop/safeeyes/eyes/src/notifications.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reports');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch items initially
    fetchItems();
    
    // Set up interval to fetch items every second
    const interval = setInterval(() => {
      fetchItems();
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredItems = items.filter(item => 
    filter === "all" || item.status === filter
  );

  return (
    <div className="report-section">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("new")}>New</button>
        <button onClick={() => handleFilterChange("unsolved")}>Unsolved</button>
        <button onClick={() => handleFilterChange("solved")}>Solved</button>
      </div>
      <div className="report-list">
        {filteredItems.map((item) => (
          <div key={item.id} className={`notification ${item.status}`}>
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
  );
};

export default App;
