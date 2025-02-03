'use client';
import { useState } from 'react';
import styles from './page.module.css';

// Define mood types
type MoodTypes = 'happy' | 'peaceful' | 'normal' | 'sad' | 'angry';

type DayMood = {
  day: number;
  mood: MoodTypes | null;
};

// Define mood options outside the component
const moodOptions: Record<MoodTypes, string> = {
  happy: '#FFD700',    // Gold
  peaceful: '#87CEEB', // Sky Blue
  normal: '#98FB98',   // Pale Green
  sad: '#B0C4DE',     // Light Steel Blue
  angry: '#FFB6C1'    // Light Pink
};

export default function Home() {
  // Initialize February days
  const [days, setDays] = useState<DayMood[]>(
    Array.from({ length: 29 }, (_, i) => ({
      day: i + 1,
      mood: null
    }))
  );

  // Update mood for a day
  const handleMoodClick = (day: number, mood: MoodTypes) => {
    setDays(days.map(d => 
      d.day === day ? { ...d, mood } : d
    ));
  };

  return (
    <main className={styles.main}>
      <h1>February 2024 Mood Tracker</h1>
      
      {/* Mood Legend */}
      <div className={styles.moodLegend}>
        {(Object.entries(moodOptions) as [MoodTypes, string][]).map(([mood, color]) => (
          <div key={mood} className={styles.moodItem}>
            <div className={styles.colorCircle} style={{ backgroundColor: color }}></div>
            <span>{mood}</span>
          </div>
        ))}
      </div>

      {/* Hearts Calendar */}
      <div className={styles.calendar}>
        {days.map((day) => (
          <div key={day.day} className={styles.heartContainer}>
            <div 
              className={styles.heart}
              style={{ backgroundColor: day.mood ? moodOptions[day.mood] : '#e0e0e0' }}
            >
              <span className={styles.dayNumber}>{day.day}</span>
              <div className={styles.moodSelector}>
                {(Object.entries(moodOptions) as [MoodTypes, string][]).map(([mood, color]) => (
                  <button
                    key={mood}
                    style={{ backgroundColor: color }}
                    onClick={() => handleMoodClick(day.day, mood)}
                    title={mood}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className={styles.statistics}>
        <h2>Monthly Overview</h2>
        {(Object.entries(moodOptions) as [MoodTypes, string][]).map(([mood, color]) => (
          <div key={mood} className={styles.statItem}>
            <div className={styles.colorCircle} style={{ backgroundColor: color }}></div>
            <span>{mood}: </span>
            <span>{days.filter(d => d.mood === mood).length} days</span>
          </div>
        ))}
      </div>
    </main>
  );
}