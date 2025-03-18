
// In a real microservice architecture, this would connect to a database
// For this example, we'll use in-memory data

// Data analitik untuk dashboard
const stats = {
  totalQuestions: 245,
  categories: 18,
  aiGenerated: 78,
  difficultyLevels: 3
};

// Data untuk chart aktivitas
const activityData = [
  { name: 'Sen', pertanyaan: 4 },
  { name: 'Sel', pertanyaan: 7 },
  { name: 'Rab', pertanyaan: 5 },
  { name: 'Kam', pertanyaan: 9 },
  { name: 'Jum', pertanyaan: 6 },
  { name: 'Sab', pertanyaan: 2 },
  { name: 'Min', pertanyaan: 3 },
];

// Data untuk distribusi kategori
const categoryData = [
  { name: 'Matematika', value: 35 },
  { name: 'Sains', value: 25 },
  { name: 'Bahasa', value: 20 },
  { name: 'Sejarah', value: 15 },
  { name: 'Lainnya', value: 5 },
];

// Data pertanyaan terbaru
let recentQuestions = [
  {
    id: '1',
    title: 'Apa ibu kota Prancis?',
    category: 'Geografi',
    difficulty: 'Mudah',
    createdAt: '2023-06-10T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Bagaimana proses fotosintesis bekerja?',
    category: 'Biologi',
    difficulty: 'Sedang',
    createdAt: '2023-06-09T14:15:00.000Z',
  },
  {
    id: '3',
    title: 'Selesaikan x: 2x + 5 = 15',
    category: 'Matematika',
    difficulty: 'Mudah',
    createdAt: '2023-06-08T09:45:00.000Z',
  },
  {
    id: '4',
    title: 'Apa yang menyebabkan gempa bumi?',
    category: 'Geologi',
    difficulty: 'Sedang',
    createdAt: '2023-06-07T16:20:00.000Z',
  }
];

// Exported service functions
module.exports = {
  getStats: () => stats,
  getActivityData: () => activityData,
  getCategoryData: () => categoryData,
  getRecentQuestions: () => recentQuestions,
  addRecentQuestion: (question) => {
    recentQuestions.unshift(question);
    recentQuestions = recentQuestions.slice(0, 10); // Keep only 10 most recent
    return recentQuestions;
  }
};
