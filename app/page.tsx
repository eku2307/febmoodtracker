'use client';
import React, { useState } from 'react';

const daysInFeb = 29; // Full February (leap year)

const moodColors: Record<string, string> = {
  happy: '#FFD700',   // yellow
  sad: '#FF69B4',     // pink
  okay: '#98FB98',    // pastel green
  tired: '#ADD8E6',   // pastel blue
  stressed: '#DDA0DD', // pastel purple
  none: '#FFFFFF',    // white (unselected)
};

function Heart({ filled, onClick, color }: { filled: boolean, onClick: () => void, color: string }) {
  return (
    <svg
      onClick={onClick}
      width="60"
      height="60"
      viewBox="0 0 50 50"
      style={{ cursor: 'pointer', margin: '5px' }}
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
  const [moodsState, setMoodsState] = useState(Array(daysInFeb).fill('none'));
  const [selectedMood, setSelectedMood] = useState('happy');

  const handleHeartClick = (index: number) => {
    setMoodsState(prev => {
      const newMoods = [...prev];
      newMoods[index] = selectedMood;
      return newMoods;
    });
  };

  return (
    <div style={{
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      background: '#fff',
      minHeight: '100vh',
      padding: '20px',
      border: '8px solid #000',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>MOODS - FEB</h2>
      
      {/* Grid layout for hearts that fills the page */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '5px',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '20px'
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
            <div style={{ fontSize: '18px', marginTop: '-5px' }}>{i + 1}</div>
          </div>
        ))}
      </div>
      
      {/* Key section with additional moods */}
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '22px', marginBottom: '10px' }}>KEY :</div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '20px', height: '20px',
            background: '#FFD700',
            borderRadius: '50%',
            marginRight: '10px',
            border: '2px solid #000'
          }} />
          <span style={{ fontSize: '20px', marginRight: '20px' }}>- happy</span>
          <input
            type="radio"
            id="happy"
            name="mood"
            checked={selectedMood === 'happy'}
            onChange={() => setSelectedMood('happy')}
            style={{ marginRight: '5px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '20px', height: '20px',
            background: '#FF69B4',
            borderRadius: '50%',
            marginRight: '10px',
            border: '2px solid #000'
          }} />
          <span style={{ fontSize: '20px', marginRight: '20px' }}>- sad</span>
          <input
            type="radio"
            id="sad"
            name="mood"
            checked={selectedMood === 'sad'}
            onChange={() => setSelectedMood('sad')}
            style={{ marginRight: '5px' }}
          />
        </div>
        
        {/* New mood: okay */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '20px', height: '20px',
            background: '#98FB98',
            borderRadius: '50%',
            marginRight: '10px',
            border: '2px solid #000'
          }} />
          <span style={{ fontSize: '20px', marginRight: '20px' }}>- okay</span>
          <input
            type="radio"
            id="okay"
            name="mood"
            checked={selectedMood === 'okay'}
            onChange={() => setSelectedMood('okay')}
            style={{ marginRight: '5px' }}
          />
        </div>
        
        {/* New mood: tired */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '20px', height: '20px',
            background: '#ADD8E6',
            borderRadius: '50%',
            marginRight: '10px',
            border: '2px solid #000'
          }} />
          <span style={{ fontSize: '20px', marginRight: '20px' }}>- tired</span>
          <input
            type="radio"
            id="tired"
            name="mood"
            checked={selectedMood === 'tired'}
            onChange={() => setSelectedMood('tired')}
            style={{ marginRight: '5px' }}
          />
        </div>
        
        {/* New mood: stressed/busy */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '20px', height: '20px',
            background: '#DDA0DD',
            borderRadius: '50%',
            marginRight: '10px',
            border: '2px solid #000'
          }} />
          <span style={{ fontSize: '20px', marginRight: '20px' }}>- stressed/busy</span>
          <input
            type="radio"
            id="stressed"
            name="mood"
            checked={selectedMood === 'stressed'}
            onChange={() => setSelectedMood('stressed')}
            style={{ marginRight: '5px' }}
          />
        </div>
      </div>
    </div>
  );
}
