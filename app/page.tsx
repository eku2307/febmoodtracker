'use client';

import React, { useState, useEffect } from 'react';

interface Day {
  day: number;
  mood: string | null;
}

export default function MoodTracker() {
  const moodOptions: Record<string, string> = {
    happy: '#FFD700',
    peaceful: '#87CEEB',
    normal: '#98FB98',
    sad: '#B0C4DE',
    angry: '#FFB6C1'
  };

  const [days, setDays] = useState<Day[]>(() => {
    const savedMoods = localStorage.getItem('februaryMoods');
    return savedMoods 
      ? JSON.parse(savedMoods) 
      : Array.from({ length: 29 }, (_, i) => ({
          day: i + 1,
          mood: null
        }));
  });

  useEffect(() => {
    localStorage.setItem('februaryMoods', JSON.stringify(days));
  }, [days]);

  const handleMoodClick = (dayToUpdate: number, mood: string) => {
    setDays(currentDays => 
      currentDays.map(day => 
        day.day === dayToUpdate 
          ? { ...day, mood: day.mood === mood ? null : mood } 
          : day
      )
    );
  };

  return (
    <div className="App">
      <h1>February 2024 Mood Tracker</h1>
      
      <div className="mood-legend">
        {Object.entries(moodOptions).map(([mood, color]) => (
          <div key={mood} className="mood-item">
            <div className="color-circle" style={{ backgroundColor: color }}></div>
            <span>{mood}</span>
          </div>
        ))}
      </div>

      <div className="calendar">
        {days.map((day) => (
          <div key={day.day} className="heart-container">
            <div 
              className="heart"
              style={{ 
                backgroundColor: day.mood 
                  ? moodOptions[day.mood] 
                  : '#e0e0e0' 
              }}
            >
              <span className="day-number">{day.day}</span>
              <div className="mood-selector">
                {Object.entries(moodOptions).map(([mood, color]) => (
                  <button
                    key={mood}
                    style={{ 
                      backgroundColor: color,
                      border: day.mood === mood 
                        ? '2px solid black' 
                        : 'none'
                    }}
                    onClick={() => handleMoodClick(day.day, mood)}
                    title={mood}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="statistics">
        <h2>Monthly Overview</h2>
        {Object.entries(moodOptions).map(([mood, color]) => (
          <div key={mood} className="stat-item">
            <div className="color-circle" style={{ backgroundColor: color }}></div>
            <span>{mood}: </span>
            <span>{days.filter(d => d.mood === mood).length} days</span>
          </div>
        ))}
      </div>
    </div>
  );
}