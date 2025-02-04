import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

// Define mood types and their colors
const MOOD_TYPES = {
  happy: { color: 'text-yellow-400', label: 'Happy' },
  sad: { color: 'text-blue-400', label: 'Sad' },
  normal: { color: 'text-gray-400', label: 'Normal' },
  excited: { color: 'text-green-400', label: 'Excited' },
  stressed: { color: 'text-red-400', label: 'Stressed' }
};

interface MoodEntry {
  date: number;
  mood: keyof typeof MOOD_TYPES;
}

export default function Page() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [moodCounts, setMoodCounts] = useState<Record<keyof typeof MOOD_TYPES, number>>({
    happy: 0,
    sad: 0,
    normal: 0,
    excited: 0,
    stressed: 0
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Load moods and counts from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('februaryMoods');
    const savedMoodCounts = localStorage.getItem('februaryMoodCounts');

    if (savedMoods) {
      const parsedMoods = JSON.parse(savedMoods);
      setMoods(parsedMoods);
    }

    if (savedMoodCounts) {
      const parsedMoodCounts = JSON.parse(savedMoodCounts);
      setMoodCounts(parsedMoodCounts);
    }
  }, []);

  const updateMood = (date: number, mood: keyof typeof MOOD_TYPES) => {
    const existingMoodIndex = moods.findIndex(entry => entry.date === date);
    
    let updatedMoods;
    let updatedMoodCounts = {...moodCounts};

    if (existingMoodIndex > -1) {
      const oldMood = moods[existingMoodIndex].mood;
      updatedMoodCounts[oldMood]--;
      
      updatedMoods = moods.map(entry => 
        entry.date === date ? { date, mood } : entry
      );
    } else {
      updatedMoods = [...moods, { date, mood }];
    }

    updatedMoodCounts[mood]++;

    setMoods(updatedMoods);
    setMoodCounts(updatedMoodCounts);
    localStorage.setItem('februaryMoods', JSON.stringify(updatedMoods));
    localStorage.setItem('februaryMoodCounts', JSON.stringify(updatedMoodCounts));
    
    setSelectedDate(null);
  };

  const renderMoodSelector = () => {
    if (selectedDate === null) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl mb-4">Select Mood for Day {selectedDate}</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(MOOD_TYPES).map(([mood, details]) => (
              <button
                key={mood}
                onClick={() => updateMood(selectedDate, mood as keyof typeof MOOD_TYPES)}
                className={`
                  flex flex-col items-center p-2 rounded-lg 
                  hover:bg-gray-100 transition-colors
                  ${details.color} bg-opacity-10
                `}
              >
                <Heart 
                  className={`w-10 h-10 ${details.color}`} 
                  fill={details.color} 
                />
                <span className="mt-2">{details.label}</span>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setSelectedDate(null)} 
            className="mt-4 w-full bg-gray-200 p-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 28; i++) {
      const existingMood = moods.find(entry => entry.date === i);
      
      hearts.push(
        <div 
          key={i} 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setSelectedDate(i)}
        >
          <Heart 
            className={`
              w-10 h-10 
              ${existingMood 
                ? MOOD_TYPES[existingMood.mood].color
                : 'text-gray-200'
              } 
              group-hover:text-gray-500 
              transition-colors 
              duration-200
            `}
            fill={existingMood ? MOOD_TYPES[existingMood.mood].color : 'none'}
          />
          <span className="text-xs mt-1">{i}</span>
        </div>
      );
    }
    return hearts;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">February Mood Tracker</h1>
      
      {/* Mood Statistics */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Mood Statistics</h2>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {Object.entries(MOOD_TYPES).map(([mood, details]) => (
            <div key={mood} className="flex items-center">
              <Heart 
                className={`w-6 h-6 ${details.color} mr-2`} 
                fill={details.color} 
              />
              <span>{details.label}: {moodCounts[mood as keyof typeof MOOD_TYPES]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hearts Grid */}
      <div className="grid grid-cols-7 gap-4">
        {renderHearts()}
      </div>

      {/* Mood Selector Modal */}
      {renderMoodSelector()}
    </div>
  );
}