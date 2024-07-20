import React from 'react';
import { useParams } from 'react-router-dom';
import '/Users/adilzhan/Desktop/safeeyes/eyes/src/notifications.css';

const VideoPlayer = () => {
  const { videoUrl } = useParams();
  const decodedVideoUrl = decodeURIComponent(videoUrl);

  return (
    <div className="video-player">
      <h1>Video Player</h1>
      <video controls width="600">
        <source src={decodedVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
