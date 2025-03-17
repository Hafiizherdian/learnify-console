
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Cek apakah file database ada, jika tidak, buat file kosong
const DB_PATH = path.join(__dirname, 'questions.json');
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// Fungsi untuk membaca dari database
const readQuestions = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Fungsi untuk menulis ke database
const writeQuestions = (questions) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(questions, null, 2));
};

// Routes untuk Question Bank Microservice
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

// Server start
app.listen(PORT, () => {
  console.log(`Question Bank Microservice berjalan di port ${PORT}`);
});
