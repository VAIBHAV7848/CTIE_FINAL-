import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_DATA, MOOD_CONFIG, MoodIcons } from './constants';
import { MoodEntry, MoodType } from './types';
import { TrendsChart } from './components/TrendsChart';
import { MoodModal } from './components/MoodModal';
import { Button } from './components/Button';

// Utility Icons
const MenuIcon = () => (
  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UserAvatar = () => (
  <img 
    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
    alt="Lisa" 
    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
  />
);

function App() {
  const [history, setHistory] = useState<MoodEntry[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Format: "Wednesday, April 16th, 2025"
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const handleLogMood = (mood: MoodType) => {
    // Random sleep between 2 and 9.5 for demo variation
    const sleepHours = Number((Math.random() * (9.5 - 2) + 2).toFixed(1));
    
    const today = new Date();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).split(',')[0], // "April 16"
      fullDate: today,
      mood,
      sleepHours
    };

    setHistory(prev => [...prev, newEntry]);
    setIsModalOpen(false);
  };

  // Stats Logic
  const stats = useMemo(() => {
    const recent = history.slice(-5);
    if (recent.length === 0) return { avgMood: MoodType.Neutral, avgSleepRange: '0-2' };

    // Sleep
    const totalSleep = recent.reduce((acc, curr) => acc + curr.sleepHours, 0);
    const avgSleepVal = totalSleep / recent.length;
    let avgSleepRange = '0-2';
    if (avgSleepVal >= 9) avgSleepRange = '9+';
    else if (avgSleepVal >= 7) avgSleepRange = '7-8';
    else if (avgSleepVal >= 5) avgSleepRange = '5-6';
    else if (avgSleepVal >= 3) avgSleepRange = '3-4';
    else avgSleepRange = '0-2';

    // Mood
    const totalMoodScore = recent.reduce((acc, curr) => acc + MOOD_CONFIG[curr.mood].score, 0);
    const avgMoodScore = Math.round(totalMoodScore / recent.length);
    const avgMoodEntry = Object.entries(MOOD_CONFIG).find(([_, config]) => config.score === avgMoodScore);
    const avgMood = (avgMoodEntry ? avgMoodEntry[0] : MoodType.Neutral) as MoodType;

    return { avgSleepRange, avgMood };
  }, [history]);

  const AvgMoodIcon = MoodIcons[stats.avgMood];

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-slate-800">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-xl p-2 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5.67 1.5 1.5S7.83 14 7 14s-1.5-.67-1.5-1.5S6.17 11 7 11zm8 0c.83 0 1.5.67 1.5 1.5S15.83 14 15 14s-1.5-.67-1.5-1.5S14.17 11 15 11z" /></svg>
          </div>
          <span className="font-bold text-lg text-slate-700">Mood tracker</span>
        </div>
        <div className="flex items-center gap-2">
           <UserAvatar />
           <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-700 mb-3">Hello, Lisa!</h1>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">How are you feeling today?</h2>
          <p className="text-slate-400 font-medium mb-8">{currentDate}</p>
          <Button 
            className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-8 py-3 rounded-2xl shadow-lg shadow-indigo-200"
            onClick={() => setIsModalOpen(true)}
          >
            Log today's mood
          </Button>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stats Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Average Mood Card */}
            <div className="bg-[#93C5FD] bg-opacity-100 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              {/* Background gradient effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-300 to-blue-400 opacity-50 z-0"></div>
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <p className="text-slate-700 font-medium mb-6">Average Mood <span className="text-slate-500 text-sm font-normal">(Last 5 check-ins)</span></p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white p-2 rounded-full shadow-sm w-12 h-12 flex items-center justify-center">
                    <AvgMoodIcon className="w-12 h-12" />
                  </div>
                  <span className="text-3xl font-bold text-slate-800">{MOOD_CONFIG[stats.avgMood].label}</span>
                </div>
                
                <p className="text-slate-800 flex items-center gap-2 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Same as the previous 5 check-ins
                </p>
              </div>
            </div>

            {/* Average Sleep Card */}
            <div className="bg-[#4338CA] rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] text-white">
              <div className="absolute -right-4 bottom-0 w-32 h-64 bg-indigo-500 rounded-full blur-xl opacity-40 transform rotate-12"></div>
              
              <div className="relative z-10">
                <p className="text-indigo-200 font-medium mb-6">Average Sleep <span className="text-indigo-300 text-sm font-normal">(Last 5 check-ins)</span></p>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-indigo-100 italic">z<span className="text-xl">z</span></span>
                  <span className="text-4xl font-bold">{stats.avgSleepRange} Hours</span>
                </div>
                
                <p className="text-indigo-200 flex items-center gap-2 text-sm font-medium">
                  <svg className="w-4 h-4 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Increase from the previous 5 check-ins
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-8 h-full shadow-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Mood and sleep trends</h3>
              </div>
              <div className="h-[400px] w-full">
                <TrendsChart data={history} />
              </div>
            </div>
          </div>

        </div>

      </main>

      <MoodModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleLogMood} 
      />
    </div>
  );
}

export default App;