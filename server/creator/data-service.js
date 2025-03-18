
// In a real microservice architecture, this would connect to a database
// For this example, we'll use in-memory data

// Static list of categories
const categories = [
  { id: 'matematika', name: 'Matematika' },
  { id: 'sains', name: 'Sains' },
  { id: 'bahasa', name: 'Bahasa' },
  { id: 'sejarah', name: 'Sejarah' },
  { id: 'geografi', name: 'Geografi' },
  { id: 'lainnya', name: 'Lainnya' }
];

// Static list of difficulties
const difficulties = [
  { id: 'mudah', name: 'Mudah' },
  { id: 'sedang', name: 'Sedang' },
  { id: 'sulit', name: 'Sulit' }
];

// Store draft questions (in a real app, this would be in a database)
let draftQuestions = [];

module.exports = {
  getCategories: () => categories,
  getDifficulties: () => difficulties,
  saveDraft: (question) => {
    const draftId = question.id || crypto.randomUUID();
    const draft = { ...question, id: draftId, draft: true };
    
    const existingIndex = draftQuestions.findIndex(q => q.id === draftId);
    if (existingIndex >= 0) {
      draftQuestions[existingIndex] = draft;
    } else {
      draftQuestions.push(draft);
    }
    
    return draft;
  },
  getDrafts: () => draftQuestions
};
