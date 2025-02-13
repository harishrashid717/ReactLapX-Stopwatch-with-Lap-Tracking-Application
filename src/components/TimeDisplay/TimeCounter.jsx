import React, { useState, useEffect } from 'react';

const TimeCounter = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    <div style={{ fontFamily: 'Arial', fontSize: '24px', textAlign: 'center', marginTop: '50px' }}>
      <h1>Time Counter</h1>
      <p>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : 
        {String(seconds).padStart(2, '0')} : {String(milliseconds).padStart(3, '0')}
      </p>
    </div>
  );
};

export default TimeCounter;
