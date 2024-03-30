import React from 'react';
import './LoadingScreen.css'; // Import your CSS file for styling

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;