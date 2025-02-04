'use client';

import React, { useState, useEffect } from 'react';

type Mood = 'happy' | 'peaceful' | 'normal' | 'sad' | 'angry';

const MOOD_COLORS: Record<Mood, string> = {
  happy: '#FFD700',    // Gold
  peaceful: '#87CEEB', // Sky Blue
  normal: '#98FB98',   // Pale Green
  sad: '#B0C4DE',      // Light Steel Blue
  angry: '#FFB6C1'     // Light Pink
};

export default function Home() {
  const [days, setDays] = useState<Array<{day: number, mood: Mood | null}>>(
    Array.from({ length: 29 }, (_, i) => ({ day: i + 1, mood: null }))
  );

  useEffect(() => {
    const savedMoods = localStorage.getItem('februaryMoods');
    if (savedMoods) {
      setDays(JSON.parse(savedMoods));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('februaryMoods', JSON.stringify(days));
  }, [days]);

  const handleMoodClick = (dayToUpdate: number, mood: Mood) => {
    setDays(currentDays => 
      currentDays.map(day => 
        day.day === dayToUpdate 
          ? { ...day, mood: day.mood === mood ? null : mood } 
          : day
      )
    );
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        February 2024 Mood Tracker
      </h1>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div 
            key={day.day} 
            className="relative aspect-square"
          >
            <div 
              className="absolute inset-0 flex items-center justify-center 
                         border rounded-full cursor-pointer transition-colors"
              style={{ 
                backgroundColor: day.mood ? MOOD_COLORS[day.mood] : '#e0e0e0'
              }}
              onClick={() => {
                const moodKeys = Object.keys(MOOD_COLORS) as Mood[];
                const currentIndex = day.mood ? moodKeys.indexOf(day.mood) : -1;
                const nextMoodIndex = (currentIndex + 1) % moodKeys.length;
                handleMoodClick(day.day, moodKeys[nextMoodIndex]);
              }}
            >
              {day.day}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Mood Summary</h2>
        <div className="grid grid-cols-5 gap-2">
          {(Object.keys(MOOD_COLORS) as Mood[]).map((mood) => (
            <div 
              key={mood} 
              className="flex items-center justify-between p-2 rounded"
              style={{ backgroundColor: MOOD_COLORS[mood] }}
            >
              <span className="capitalize">{mood}</span>
              <span>
                {days.filter(d => d.mood === mood).length} days
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}