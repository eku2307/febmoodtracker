'use client';
import React, { useState, useEffect } from 'react';

// Number of days in February (leap year)
const daysInFeb = 29;

// Mood colors
const moodColors: Record<string, string> = {
  happy: '#FFD700',      // yellow
  sad: '#FF69B4',        // pink
  okay: '#98FB98',       // pastel green
  tired: '#ADD8E6',      // pastel blue
  stressed: '#DDA0DD',   // pastel purple
  none: '#FFFFFF',       // white (unselected)
};

// Mood options for the key
const moods = [
  { key: 'happy', color: '#FFD700', label: 'happy' },
  { key: 'sad', color: '#FF69B4', label: 'sad' },
  { key: 'okay', color: '#98FB98', label: 'okay' },
  { key: 'tired', color: '#ADD8E6', label: 'tired' },
  { key: 'stressed', color: '#DDA0DD', label: 'stressed/busy' },
];

// Heart SVG component
function Heart({ filled, onClick, color }: { filled: boolean, onClick: () => void, color: string }) {
  return (
    <svg
      onClick={onClick}
      width="60"
      height="60"
      viewBox="0 0 50 50"
      style={{ cursor: 'pointer', margin: '5px', transition: 'filter 0.2s', filter: filled ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' : 'none' }}
    >
      <path
        d="M24.5 44S5 29.5 5 17.5C5 10.0442 12.0442 5 19.5 5C23.3056 5 26.5 7.5 26.5 7.5C26.5 7.5 29.6944 5 33.5 5C40.9558 5 48 10.0442 48 17.5C48 29.5 28.5 44 24.5 44Z"
        fill={filled ? color : "#FFFFFF"}
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function MoodTracker() {
  // Load mood data from localStorage on initial mount
  const [moodsState, setMoodsState] = useState<string[]>(() => {
    // Check if we're in a browser environment (not server-side rendering)
    if (typeof window !== 'undefined') {
      const savedMoods = localStorage.getItem('februaryMoods');
      return savedMoods ? JSON.parse(savedMoods) : Array(daysInFeb).fill('none');
    }
    return Array(daysInFeb).fill('none');
  });
  
  const [selectedMood, setSelectedMood] = useState(() => {
    // Load selected mood from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedMood') || 'happy';
    }
    return 'happy';
  });

  // Save to localStorage whenever moods change
  useEffect(() => {
    localStorage.setItem('februaryMoods', JSON.stringify(moodsState));
  }, [moodsState]);

  // Save selected mood to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedMood', selectedMood);
  }, [selectedMood]);

  const handleHeartClick = (index: number) => {
    setMoodsState(prev => {
      const newMoods = [...prev];
      // Toggle between selected mood and none
      newMoods[index] = newMoods[index] === selectedMood ? 'none' : selectedMood;
      return newMoods;
    });
  };

  // Function to reset all moods
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all mood data?')) {
      setMoodsState(Array(daysInFeb).fill('none'));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Poppins, Arial, sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(120deg, #fed6e3 0%, #a1c4fd 100%)'
      }} />

      {/* Pastel blobs */}
      <svg style={{position: 'absolute', top: '-80px', left: '-80px', width: '300px', height: '300px', zIndex: 1}} viewBox="0 0 300 300">
        <ellipse cx="150" cy="150" rx="120" ry="100" fill="#f9c6d0" fillOpacity="0.45" />
      </svg>
      <svg style={{position: 'absolute', top: '60px', right: '-100px', width: '260px', height: '260px', zIndex: 1}} viewBox="0 0 260 260">
        <ellipse cx="130" cy="130" rx="110" ry="90" fill="#b8e0fc" fillOpacity="0.35" />
      </svg>
      <svg style={{position: 'absolute', bottom: '-90px', left: '10vw', width: '200px', height: '200px', zIndex: 1}} viewBox="0 0 200 200">
        <ellipse cx="100" cy="100" rx="90" ry="70" fill="#fbeedb" fillOpacity="0.35" />
      </svg>
      <svg style={{position: 'absolute', bottom: '-70px', right: '10vw', width: '180px', height: '180px', zIndex: 1}} viewBox="0 0 180 180">
        <ellipse cx="90" cy="90" rx="80" ry="60" fill="#e5d7fb" fillOpacity="0.3" />
      </svg>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '40px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Heading in script font */}
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '3rem',
          fontWeight: 700,
          background: 'linear-gradient(90deg, #ffb199 0%, #ff0844 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '2px',
          textAlign: 'center',
          marginBottom: '25px'
        }}>
          MOODS - FEB
        </h2>

        {/* Responsive grid for hearts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '5px',
          justifyContent: 'center',
          width: '95vw',
          maxWidth: '1100px',
          marginBottom: '30px'
        }}>
          {Array.from({ length: daysInFeb }).map((_, i) => (
            <div key={i} style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Heart
                filled={moodsState[i] !== 'none'}
                onClick={() => handleHeartClick(i)}
                color={moodColors[moodsState[i]]}
              />
              <div style={{
                fontSize: '18px',
                marginTop: '-5px',
                fontFamily: "'Dancing Script', cursive",
                color: '#444'
              }}>{i + 1}</div>
            </div>
          ))}
        </div>

        {/* Key section */}
        <div style={{
          marginTop: '10px',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '18px',
          padding: '16px 32px',
          boxShadow: '0 2px 12px 0 rgba(160,160,160,0.07)',
          fontFamily: 'Poppins, Arial, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 500,
          maxWidth: '90vw'
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: '1.3rem',
            marginBottom: '10px',
            fontFamily: "'Dancing Script', cursive"
          }}>KEY :</div>
          {moods.map(mood => (
            <div key={mood.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: mood.color,
                borderRadius: '50%',
                marginRight: '10px',
                border: '2px solid #000'
              }} />
              <span style={{
                fontSize: '1.1rem',
                marginRight: '20px',
                fontFamily: "'Dancing Script', cursive"
              }}>- {mood.label}</span>
              <input
                type="radio"
                id={mood.key}
                name="mood"
                checked={selectedMood === mood.key}
                onChange={() => setSelectedMood(mood.key)}
                style={{ marginRight: '5px' }}
              />
            </div>
          ))}
        </div>

        {/* Reset button */}
        <button 
          onClick={handleReset}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '12px',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.7)'}
        >
          Reset All Moods
        </button>
      </div>
    </div>
  );
}