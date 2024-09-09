import React, { useEffect, useState } from "react";
import axios from "axios";

const VirtualMap = () => {
  const [position, setPosition] = useState(null); // Use single position state
  const mapWidth = 500;
  const mapHeight = 500;
  const fetchInterval = 33; // 33 milliseconds for ~30 times per second

  useEffect(() => {
    // Function to fetch positions from the server
    const fetchPosition = async () => {
      try {
        const response = await axios.get("http://localhost:8000/positions");
        // Get the latest position from the response
        const latestPosition = response.data[response.data.length - 1];
        setPosition(latestPosition);
      } catch (error) {
        console.error("Error fetching position:", error);
      }
    };

    // Set up the interval to fetch position data
    const intervalId = setInterval(fetchPosition, fetchInterval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!position) {
    return <div>Loading...</div>;
  }

  // Scaling coordinates from the original frame size to the SVG size
  const scaleX = mapWidth / position.frame_width;
  const scaleY = mapHeight / position.frame_height;
  const scaledX = position.x * scaleX;
  const scaledY = position.y * scaleY;

  // Ensure that coordinates are within bounds
  const x = Math.min(Math.max(scaledX, 0), mapWidth);
  const y = Math.min(Math.max(scaledY, 0), mapHeight);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-4">SafeEyes</h1>
        </div>
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Virtual Map</h5>
              <svg width={mapWidth} height={mapHeight} style={{ border: "1px solid black" }}>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill="red"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">RTSP Stream</h5>
              <div className="embed-responsive embed-responsive-16by9">
                {/* Placeholder for RTSP Stream */}
                <p>RTSP Stream cannot be displayed directly in this component.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualMap;
