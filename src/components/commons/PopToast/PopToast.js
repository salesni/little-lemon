import React, { useState } from 'react';
import './PopToast.css'; // Import your CSS file for styling

const PopToast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={`pop-toast ${visible ? 'show' : 'hide'}`}>
      <div className="toast-content">
        <span className="close-icon" onClick={handleClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopToast;