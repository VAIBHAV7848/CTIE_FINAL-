import React, { useState } from 'react';
import { MoodType } from '../types';
import { Button } from './Button';
import { MoodIcons, MOOD_CONFIG } from '../constants';

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: MoodType) => void;
}

export const MoodModal: React.FC<MoodModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood);
      setSelectedMood(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Log your mood</h2>
          
          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 bg-blue-600 rounded-full"></div>
            <div className="h-1 flex-1 bg-blue-100 rounded-full"></div>
            <div className="h-1 flex-1 bg-blue-100 rounded-full"></div>
          </div>

          <h3 className="text-xl font-bold text-slate-800">How was your mood today?</h3>
        </div>

        {/* Mood Selection List */}
        <div className="space-y-3 mb-8">
          {Object.values(MoodType).map((mood) => {
            const Icon = MoodIcons[mood];
            const isSelected = selectedMood === mood;
            const config = MOOD_CONFIG[mood];

            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 group
                  ${isSelected 
                    ? 'border-blue-600 bg-white shadow-md z-10' 
                    : 'border-slate-100 hover:border-blue-200 bg-white'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Radio Circle */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'border-blue-600' : 'border-slate-300 group-hover:border-blue-300'}`
                  }>
                    {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                  </div>

                  <span className="font-semibold text-slate-700 text-lg">
                    {config.label}
                  </span>
                </div>
                
                <div className="transform transition-transform group-hover:scale-110">
                  <Icon className="w-8 h-8" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <Button 
          fullWidth 
          onClick={handleSubmit} 
          disabled={!selectedMood}
          className="bg-[#4F46E5] hover:bg-[#4338ca] py-4 text-lg shadow-xl shadow-indigo-200"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};