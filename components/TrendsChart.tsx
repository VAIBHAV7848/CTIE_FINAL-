import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { MoodEntry, MoodType } from '../types';
import { MOOD_CONFIG, MoodIcons } from '../constants';

interface TrendsChartProps {
  data: MoodEntry[];
}

// Map sleep hours to Y-axis grid lines 0, 2.5, 5, 7.5, 10 for visual spacing
// 9+ -> 9.5
// 7-8 -> 7.5
// 5-6 -> 5.5
// 3-4 -> 3.5
// 0-2 -> 1.0

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const val = payload.value;
  let label = '';
  
  // Custom visual labels
  if (val === 0) label = '0-2 hours';
  else if (val === 2.5) label = '3-4 hours';
  else if (val === 5) label = '5-6 hours';
  else if (val === 7.5) label = '7-8 hours';
  else if (val === 10) label = '9+ hours';
  else return null; 

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="start" fill="#94a3b8" fontSize={11} fontWeight={500}>
        <tspan dx="10">💤 {label}</tspan>
      </text>
    </g>
  );
};

const CustomBarLabel = (props: any) => {
  const { x, y, width, index, data } = props;
  if (!data || !data[index]) return null;
  
  const mood = data[index].mood as MoodType;
  const Icon = MoodIcons[mood];

  return (
    <g transform={`translate(${x + width / 2 - 14},${y - 32})`}>
       <foreignObject width="28" height="28">
          <div>
            <Icon width="28" height="28" />
          </div>
       </foreignObject>
    </g>
  );
};

export const TrendsChart: React.FC<TrendsChartProps> = ({ data }) => {
  // Normalize data for chart visualization
  const chartData = data.map(d => {
    let visualHeight = 0;
    if (d.sleepHours >= 9) visualHeight = 10;
    else if (d.sleepHours >= 7) visualHeight = 7.5;
    else if (d.sleepHours >= 5) visualHeight = 5;
    else if (d.sleepHours >= 3) visualHeight = 2.5;
    else visualHeight = 1;

    return {
      ...d,
      visualHeight
    };
  });

  // Take only last 11 or so to fit nicely like the image
  const displayData = chartData.slice(-11);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={displayData}
        margin={{ top: 50, right: 10, left: 30, bottom: 0 }}
        barSize={36} 
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
          dy={15}
          interval={0} // Show all ticks
        />
        
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={<CustomYAxisTick />}
          domain={[0, 11]}
          ticks={[0, 2.5, 5, 7.5, 10]}
          width={80}
        />

        <Bar 
          dataKey="visualHeight" 
          radius={[18, 18, 18, 18]} 
          animationDuration={1000}
        >
          {displayData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={MOOD_CONFIG[entry.mood].barColor} />
          ))}
          <LabelList dataKey="visualHeight" content={<CustomBarLabel data={displayData} />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};