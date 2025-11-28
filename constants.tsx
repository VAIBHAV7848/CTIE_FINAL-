import React from 'react';
import { MoodType, MoodConfig } from './types';

// Custom Filled Emoji Icons to match the design
export const MoodIcons = {
  [MoodType.VeryHappy]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FDBA74" />
      <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#7C2D12" />
      <circle cx="15" cy="9" r="1.5" fill="#7C2D12" />
    </svg>
  ),
  [MoodType.Happy]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#86EFAC" />
      <path d="M8 14.5C8 14.5 9.5 16 12 16C14.5 16 16 14.5 16 14.5" stroke="#14532D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#14532D" />
      <circle cx="15" cy="9" r="1.5" fill="#14532D" />
    </svg>
  ),
  [MoodType.Neutral]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#93C5FD" />
      <path d="M9 15H15" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#1E3A8A" />
      <circle cx="15" cy="9" r="1.5" fill="#1E3A8A" />
    </svg>
  ),
  [MoodType.Sad]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#A5B4FC" />
      <path d="M8 16C8 16 9.5 14.5 12 14.5C14.5 14.5 16 16 16 16" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1.5" fill="#312E81" />
      <circle cx="15" cy="10" r="1.5" fill="#312E81" />
      <path d="M7 6L6 7" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  [MoodType.VerySad]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FCA5A5" />
      <path d="M8 16C8 16 9.5 14 12 14C14.5 14 16 16 16 16" stroke="#7F1D1D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 8L10 9" stroke="#7F1D1D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 8L14 9" stroke="#7F1D1D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="10.5" r="1.5" fill="#7F1D1D" />
      <circle cx="15" cy="10.5" r="1.5" fill="#7F1D1D" />
    </svg>
  ),
};

export const MOOD_CONFIG: Record<MoodType, MoodConfig> = {
  [MoodType.VeryHappy]: { label: 'Very Happy', color: 'text-orange-900', barColor: '#FDBA74', score: 5 },
  [MoodType.Happy]: { label: 'Happy', color: 'text-green-900', barColor: '#86EFAC', score: 4 },
  [MoodType.Neutral]: { label: 'Neutral', color: 'text-blue-900', barColor: '#93C5FD', score: 3 },
  [MoodType.Sad]: { label: 'Sad', color: 'text-indigo-900', barColor: '#A5B4FC', score: 2 },
  [MoodType.VerySad]: { label: 'Very Sad', color: 'text-red-900', barColor: '#FCA5A5', score: 1 },
};

export const INITIAL_DATA = [
  { id: '1', date: 'March 31', fullDate: new Date('2024-03-31'), mood: MoodType.Sad, sleepHours: 4 },
  { id: '2', date: 'April 02', fullDate: new Date('2024-04-02'), mood: MoodType.Happy, sleepHours: 7.5 },
  { id: '3', date: 'April 04', fullDate: new Date('2024-04-04'), mood: MoodType.VerySad, sleepHours: 3 },
  { id: '4', date: 'April 06', fullDate: new Date('2024-04-06'), mood: MoodType.Neutral, sleepHours: 5.5 },
  { id: '5', date: 'April 07', fullDate: new Date('2024-04-07'), mood: MoodType.Happy, sleepHours: 6.5 },
  { id: '6', date: 'April 09', fullDate: new Date('2024-04-09'), mood: MoodType.VeryHappy, sleepHours: 9.2 },
  { id: '7', date: 'April 10', fullDate: new Date('2024-04-10'), mood: MoodType.Sad, sleepHours: 3.5 },
  { id: '8', date: 'April 12', fullDate: new Date('2024-04-12'), mood: MoodType.Neutral, sleepHours: 7.8 },
  { id: '9', date: 'April 13', fullDate: new Date('2024-04-13'), mood: MoodType.Happy, sleepHours: 8 },
  { id: '10', date: 'April 14', fullDate: new Date('2024-04-14'), mood: MoodType.VerySad, sleepHours: 2.5 },
  { id: '11', date: 'April 15', fullDate: new Date('2024-04-15'), mood: MoodType.VeryHappy, sleepHours: 9 },
];