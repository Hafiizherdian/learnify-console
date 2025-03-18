
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'questions.json');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Check if database file exists, if not, create an empty file
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
  console.log(`Created new questions database at ${DB_PATH}`);
}

// Function to read from database
const readQuestions = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions database:', error);
    return [];
  }
};

// Function to write to database
const writeQuestions = (questions) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(questions, null, 2));
  } catch (error) {
    console.error('Error writing to questions database:', error);
  }
};

// Routes for Question Bank Microservice
app.get('/api/questions', (req, res) => {
  const questions = readQuestions();
  res.json(questions);
});

app.get('/api/questions/:id', (req, res) => {
  const questions = readQuestions();
  const question = questions.find(q => q.id === req.params.id);
  
  if (!question) {
    return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' });
  }
  
  res.json(question);
});

app.post('/api/questions', (req, res) => {
  const questions = readQuestions();
  const newQuestion = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date()
  };
  
  questions.push(newQuestion);
  writeQuestions(questions);
  
  res.status(201).json(newQuestion);
});

app.put('/api/questions/:id', (req, res) => {
  const questions = readQuestions();
  const index = questions.findIndex(q => q.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' });
  }
  
  const updatedQuestion = {
    ...req.body,
    id: req.params.id
  };
  
  questions[index] = updatedQuestion;
  writeQuestions(questions);
  
  res.json(updatedQuestion);
});

app.delete('/api/questions/:id', (req, res) => {
  const questions = readQuestions();
  const filteredQuestions = questions.filter(q => q.id !== req.params.id);
  
  if (filteredQuestions.length === questions.length) {
    return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' });
  }
  
  writeQuestions(filteredQuestions);
  res.json({ message: 'Pertanyaan berhasil dihapus' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'question-bank',
    database: DB_PATH
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Question Bank Microservice running on port ${PORT}`);
  console.log(`Using database at: ${DB_PATH}`);
});
