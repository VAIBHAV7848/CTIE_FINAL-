// ==================== DATA & CONSTANTS ====================
const MOOD_TYPE = {
  VeryHappy: 'Very Happy',
  Happy: 'Happy',
  Neutral: 'Neutral',
  Sad: 'Sad',
  VerySad: 'Very Sad',
};

const MOOD_CONFIG = {
  'Very Happy': { label: 'Very Happy', barColor: '#FDBA74', score: 5, darkColor: '#7C2D12' },
  'Happy': { label: 'Happy', barColor: '#86EFAC', score: 4, darkColor: '#14532D' },
  'Neutral': { label: 'Neutral', barColor: '#93C5FD', score: 3, darkColor: '#1E3A8A' },
  'Sad': { label: 'Sad', barColor: '#A5B4FC', score: 2, darkColor: '#312E81' },
  'Very Sad': { label: 'Very Sad', barColor: '#FCA5A5', score: 1, darkColor: '#7F1D1D' },
};

const INITIAL_DATA = [
  { id: '1', date: 'March 31', fullDate: new Date('2024-03-31'), mood: 'Sad', sleepHours: 4 },
  { id: '2', date: 'April 02', fullDate: new Date('2024-04-02'), mood: 'Happy', sleepHours: 7.5 },
  { id: '3', date: 'April 04', fullDate: new Date('2024-04-04'), mood: 'Very Sad', sleepHours: 3 },
  { id: '4', date: 'April 06', fullDate: new Date('2024-04-06'), mood: 'Neutral', sleepHours: 5.5 },
  { id: '5', date: 'April 07', fullDate: new Date('2024-04-07'), mood: 'Happy', sleepHours: 6.5 },
  { id: '6', date: 'April 09', fullDate: new Date('2024-04-09'), mood: 'Very Happy', sleepHours: 9.2 },
  { id: '7', date: 'April 10', fullDate: new Date('2024-04-10'), mood: 'Sad', sleepHours: 3.5 },
  { id: '8', date: 'April 12', fullDate: new Date('2024-04-12'), mood: 'Neutral', sleepHours: 7.8 },
  { id: '9', date: 'April 13', fullDate: new Date('2024-04-13'), mood: 'Happy', sleepHours: 8 },
  { id: '10', date: 'April 14', fullDate: new Date('2024-04-14'), mood: 'Very Sad', sleepHours: 2.5 },
  { id: '11', date: 'April 15', fullDate: new Date('2024-04-15'), mood: 'Very Happy', sleepHours: 9 },
];

// ==================== MOOD ICONS ====================
const getMoodIconSVG = (mood) => {
  const iconMap = {
    'Very Happy': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FDBA74" />
      <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#7C2D12" />
      <circle cx="15" cy="9" r="1.5" fill="#7C2D12" />
    </svg>`,
    'Happy': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#86EFAC" />
      <path d="M8 14.5C8 14.5 9.5 16 12 16C14.5 16 16 14.5 16 14.5" stroke="#14532D" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#14532D" />
      <circle cx="15" cy="9" r="1.5" fill="#14532D" />
    </svg>`,
    'Neutral': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#93C5FD" />
      <path d="M9 15H15" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#1E3A8A" />
      <circle cx="15" cy="9" r="1.5" fill="#1E3A8A" />
    </svg>`,
    'Sad': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#A5B4FC" />
      <path d="M8 16C8 16 9.5 14.5 12 14.5C14.5 14.5 16 16 16 16" stroke="#312E81" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="10" r="1.5" fill="#312E81" />
      <circle cx="15" cy="10" r="1.5" fill="#312E81" />
      <path d="M7 6L6 7" stroke="#312E81" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    </svg>`,
    'Very Sad': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FCA5A5" />
      <path d="M8 16C8 16 9.5 14 12 14C14.5 14 16 16 16 16" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" />
      <path d="M8 8L10 9" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" />
      <path d="M16 8L14 9" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="10.5" r="1.5" fill="#7F1D1D" />
      <circle cx="15" cy="10.5" r="1.5" fill="#7F1D1D" />
    </svg>`,
  };
  return iconMap[mood] || '';
};

// ==================== STATE ====================
let history = [...INITIAL_DATA];
let isModalOpen = false;
let selectedMood = null;

// ==================== UTILITY FUNCTIONS ====================
const formatCurrentDate = () => {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return now.toLocaleDateString('en-US', options);
};

const calculateStats = () => {
  const recent = history.slice(-5);
  if (recent.length === 0) {
    return { avgMood: 'Neutral', avgSleepRange: '0-2' };
  }

  // Calculate average sleep
  const totalSleep = recent.reduce((acc, curr) => acc + curr.sleepHours, 0);
  const avgSleepVal = totalSleep / recent.length;
  let avgSleepRange = '0-2';
  if (avgSleepVal >= 9) avgSleepRange = '9+';
  else if (avgSleepVal >= 7) avgSleepRange = '7-8';
  else if (avgSleepVal >= 5) avgSleepRange = '5-6';
  else if (avgSleepVal >= 3) avgSleepRange = '3-4';
  else avgSleepRange = '0-2';

  // Calculate average mood
  const totalMoodScore = recent.reduce((acc, curr) => acc + MOOD_CONFIG[curr.mood].score, 0);
  const avgMoodScore = Math.round(totalMoodScore / recent.length);
  const moodEntry = Object.entries(MOOD_CONFIG).find(([_, config]) => config.score === avgMoodScore);
  const avgMood = moodEntry ? moodEntry[0] : 'Neutral';

  return { avgMood, avgSleepRange };
};

// ==================== RENDER FUNCTIONS ====================
const renderHeader = () => {
  return `
    <header class="flex justify-between items-center mb-8 max-w-7xl mx-auto">
      <div class="flex items-center gap-3" style="transition: all 0.3s ease;">
        <div class="bg-blue-600 rounded-xl p-2 text-white" style="transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.1) rotate(5deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5.67 1.5 1.5S7.83 14 7 14s-1.5-.67-1.5-1.5S6.17 11 7 11zm8 0c.83 0 1.5.67 1.5 1.5S15.83 14 15 14s-1.5-.67-1.5-1.5S14.17 11 15 11z" /></svg>
        </div>
        <span class="font-bold text-lg text-slate-700">Mood tracker</span>
      </div>
      <div class="flex items-center gap-2" style="transition: all 0.3s ease;">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Lisa" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" style="transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" />
        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="transition: all 0.3s ease;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  `;
};

const renderHeroSection = () => {
  return `
    <section class="text-center mb-12">
      <h1 class="text-4xl font-bold text-slate-700 mb-3">Hello, Lisa!</h1>
      <h2 class="text-4xl font-bold text-slate-800 mb-4">How are you feeling today?</h2>
      <p class="text-slate-400 font-medium mb-8">${formatCurrentDate()}</p>
      <button class="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-8 py-3 rounded-2xl shadow-lg shadow-indigo-200 btn-base" onclick="openModal()">
        Log today's mood
      </button>
    </section>
  `;
};

const renderStatsCards = (stats) => {
  const avgMoodConfig = MOOD_CONFIG[stats.avgMood];
  const avgMoodIcon = getMoodIconSVG(stats.avgMood);

  return `
    <div class="lg:col-span-4 flex flex-col gap-6">
      <!-- Average Mood Card -->
      <div class="bg-[#93C5FD] bg-opacity-100 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] stats-card" style="transition: all 0.3s ease;">
        <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-300 to-blue-400 opacity-50 z-0"></div>
        <div class="absolute -right-8 -top-8 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>

        <div class="relative z-10">
          <p class="text-slate-700 font-medium mb-6">Average Mood <span class="text-slate-500 text-sm font-normal">(Last 5 check-ins)</span></p>
          
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-white p-2 rounded-full shadow-sm w-12 h-12 flex items-center justify-center">
              ${avgMoodIcon}
            </div>
            <span class="text-3xl font-bold text-slate-800">${avgMoodConfig.label}</span>
          </div>
          
          <p class="text-slate-800 flex items-center gap-2 text-sm font-medium">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Same as the previous 5 check-ins
          </p>
        </div>
      </div>

      <!-- Average Sleep Card -->
      <div class="bg-[#4338CA] rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] text-white stats-card" style="transition: all 0.3s ease;">
        <div class="absolute -right-4 bottom-0 w-32 h-64 bg-indigo-500 rounded-full blur-xl opacity-40 transform rotate-12"></div>
        
        <div class="relative z-10">
          <p class="text-indigo-200 font-medium mb-6">Average Sleep <span class="text-indigo-300 text-sm font-normal">(Last 5 check-ins)</span></p>
          
          <div class="flex items-center gap-4 mb-4">
            <span class="text-3xl font-bold text-indigo-100 italic">z<span class="text-xl">z</span></span>
            <span class="text-4xl font-bold">${stats.avgSleepRange} Hours</span>
          </div>
          
          <p class="text-indigo-200 flex items-center gap-2 text-sm font-medium">
            <svg class="w-4 h-4 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Increase from the previous 5 check-ins
          </p>
        </div>
      </div>
    </div>
  `;
};

const renderChart = () => {
  const chartData = history.map(d => {
    let visualHeight = 0;
    if (d.sleepHours >= 9) visualHeight = 10;
    else if (d.sleepHours >= 7) visualHeight = 7.5;
    else if (d.sleepHours >= 5) visualHeight = 5;
    else if (d.sleepHours >= 3) visualHeight = 2.5;
    else visualHeight = 1;
    return { ...d, visualHeight };
  });

  const displayData = chartData.slice(-11);
  
  // Create SVG chart
  const maxHeight = 400;
  const barWidth = 36;
  const margin = { top: 50, right: 10, left: 80, bottom: 20 };
  const totalWidth = displayData.length * (barWidth + 20) + margin.left + margin.right;
  const svgHeight = maxHeight + margin.top + margin.bottom;

  let svg = `<svg width="100%" height="${svgHeight}" viewBox="0 0 ${totalWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Grid lines
  const yTicks = [0, 2.5, 5, 7.5, 10];
  const yLabels = ['0-2 hours', '3-4 hours', '5-6 hours', '7-8 hours', '9+ hours'];
  
  yTicks.forEach((tick, idx) => {
    const y = margin.top + maxHeight - (tick / 10) * maxHeight;
    svg += `<line x1="${margin.left}" y1="${y}" x2="${totalWidth - margin.right}" y2="${y}" stroke="#f1f5f9" stroke-dasharray="3,3" />`;
    svg += `<text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#94a3b8" font-weight="500">💤 ${yLabels[idx]}</text>`;
  });

  // X axis labels
  displayData.forEach((entry, idx) => {
    const x = margin.left + idx * (barWidth + 20) + barWidth / 2;
    svg += `<text x="${x}" y="${svgHeight - 5}" text-anchor="middle" font-size="11" fill="#64748b" font-weight="500">${entry.date}</text>`;
  });

  // Bars
  displayData.forEach((entry, idx) => {
    const x = margin.left + idx * (barWidth + 20);
    const barHeight = (entry.visualHeight / 10) * maxHeight;
    const y = margin.top + maxHeight - barHeight;
    const color = MOOD_CONFIG[entry.mood].barColor;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${color}" rx="18" ry="18" />`;
    
    // Mood icon on top of bar
    const iconSvg = getMoodIconSVG(entry.mood);
    svg += `<g transform="translate(${x + barWidth / 2 - 14}, ${y - 32})">`;
    svg += iconSvg.replace('<svg ', '<svg width="28" height="28" ').replace('</svg>', '') + '</svg></g>';
  });

  svg += '</svg>';
  
  return svg;
};

const renderMoodModal = () => {
  const moodOptions = Object.keys(MOOD_CONFIG).map((mood, idx) => {
    const icon = getMoodIconSVG(mood);
    const isSelected = selectedMood === mood;
    const selectedClass = isSelected ? 'selected' : '';
    
    return `
      <button onclick="selectMood('${mood}')" class="w-full mood-button ${selectedClass}">
        <div class="flex items-center gap-4">
          <div class="radio-circle">
            <div class="radio-circle-inner"></div>
          </div>
          <span class="font-semibold text-slate-700 text-lg">${mood}</span>
        </div>
        <div class="mood-icon-wrapper">
          ${icon}
        </div>
      </button>
    `;
  });

  return `
    <div id="modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="closeModal(event)">
      <div class="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl" onclick="event.stopPropagation()">
        <button onclick="closeModal()" class="absolute top-6 right-6 modal-close-btn">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-800 mb-6">Log your mood</h2>
          <div class="flex gap-2 mb-8">
            <div class="h-1 flex-1 bg-blue-600 rounded-full"></div>
            <div class="h-1 flex-1 bg-blue-100 rounded-full"></div>
            <div class="h-1 flex-1 bg-blue-100 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-slate-800">How was your mood today?</h3>
        </div>

        <div class="space-y-3 mb-8">
          ${moodOptions.join('')}
        </div>

        <button onclick="submitMood()" ${!selectedMood ? 'disabled' : ''} class="w-full btn-primary py-4 text-lg" style="border-radius: 1rem;">
          Continue
        </button>
      </div>
    </div>
  `;
};

// ==================== EVENT HANDLERS ====================
const openModal = () => {
  isModalOpen = true;
  selectedMood = null;
  render();
  // Ensure no scroll when modal is open
  document.body.style.overflow = 'hidden';
};

const closeModal = (event) => {
  if (event && event.target.id !== 'modal-backdrop') return;
  
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) {
    backdrop.style.opacity = '0';
    setTimeout(() => {
      isModalOpen = false;
      selectedMood = null;
      render();
      document.body.style.overflow = 'auto';
    }, 200);
  } else {
    isModalOpen = false;
    selectedMood = null;
    render();
    document.body.style.overflow = 'auto';
  }
};

const selectMood = (mood) => {
  selectedMood = mood;
  render();
};

const submitMood = () => {
  if (!selectedMood) return;

  // Add success animation to button
  const btn = event.target;
  btn.disabled = true;
  
  // Fade out modal smoothly
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) {
    backdrop.style.opacity = '0';
  }
  
  setTimeout(() => {
    const sleepHours = Number((Math.random() * (9.5 - 2) + 2).toFixed(1));
    const today = new Date();
    const newEntry = {
      id: Date.now().toString(),
      date: today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).split(',')[0],
      fullDate: today,
      mood: selectedMood,
      sleepHours: sleepHours
    };

    history.push(newEntry);
    isModalOpen = false;
    selectedMood = null;
    render();
  }, 300);
};

// ==================== MAIN RENDER ====================
const render = () => {
  const stats = calculateStats();
  const app = document.getElementById('app');
  
  // Create new content
  const newContent = `
    <div class="min-h-screen p-4 md:p-8 font-sans text-slate-800">
      ${renderHeader()}
      
      <main class="max-w-7xl mx-auto">
        ${renderHeroSection()}
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          ${renderStatsCards(stats)}
          
          <div class="lg:col-span-8">
            <div class="bg-white rounded-[2rem] p-8 h-full shadow-sm chart-card" style="transition: all 0.3s ease;">
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-slate-800">Mood and sleep trends</h3>
              </div>
              <div class="overflow-x-auto">
                ${renderChart()}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      ${isModalOpen ? renderMoodModal() : ''}
    </div>
  `;
  
  app.innerHTML = newContent;
  
  // Reattach modal close handler if modal is open
  if (isModalOpen) {
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }
  }
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  render();
});
