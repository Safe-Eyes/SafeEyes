import React from 'react';
import { useParams } from 'react-router-dom';
import '/Users/adilzhan/Desktop/safeeyes/eyes/src/notifications.css'; // Ensure the path is correct

const VideoPlayer = () => {
  const { videoUrl } = useParams();
  const decodedVideoUrl = videoUrl ? decodeURIComponent(videoUrl) : '';

  return (
    <div className="video-player">
      <h1>Video Player</h1>
      {decodedVideoUrl ? (
        <video controls width="600">
          <source src={decodedVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video URL provided.</p>
      )}
    </div>
  );
};

export default VideoPlayer;

