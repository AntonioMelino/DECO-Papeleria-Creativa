// src/components/Toast/Toast.jsx

import React, { useEffect, useState } from 'react';
import './Toast.css';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`toast ${visible ? 'toast--show' : ''}`}>
      {message}
    </div>
  );
}
