import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notifications.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedItem, setExpandedItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reports');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(() => {
      fetchItems();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleItemClick = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleChangeStatus = async (id, currentStatus) => {
    const statusOrder = ["new", "unsolved", "solved"];
    const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];

    try {
      await axios.patch(`http://localhost:8000/reports/${id}/status`, { status: nextStatus });
      fetchItems();
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const parseDateTime = (date, time) => {
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const sortedItems = items.sort((a, b) => {
    const statusOrder = { "new": 1, "unsolved": 2, "solved": 3 };
    if (statusOrder[a.status] === statusOrder[b.status]) {
      return parseDateTime(b.date, b.time) - parseDateTime(a.date, a.time);
    }
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredItems = sortedItems.filter(item =>
    filter === "all" || item.status === filter
  );

  return (
    <div className="container report-section">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("new")}>New</button>
        <button onClick={() => handleFilterChange("unsolved")}>Unsolved</button>
        <button onClick={() => handleFilterChange("solved")}>Solved</button>
      </div>
      <div className="report-list">
        {filteredItems.map((item) => (
          <div key={item.id} className={`notification ${item.status}`} onClick={() => handleItemClick(item.id)}>
            <div className="notification-content">
              <div className="notification-header">
                <h2>{item.name}</h2>
                <span className="notification-time">{item.time} | {item.date}</span>
              </div>
              <div className="notification-body">
                <p>{item.category} at {item.place}</p>
                <p>Violator: {item.violator}</p>
                <button onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.id, item.status); }}>
                  Change Status (Current: {item.status})
                </button>
              </div>
            </div>
            {expandedItem === item.id && (
              <div className="video-container">
                <video controls width="100%">
                  <source src={`https://${process.env.REACT_APP_CLOUDFRONT}.cloudfront.net/safe/${item.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
