
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dataService = require('./data-service');

const app = express();
const PORT = process.env.PORT || 3003;
const QUESTIONS_SERVICE_URL = process.env.QUESTIONS_SERVICE_URL || 'http://questions-service:3002';

app.use(cors());
app.use(express.json());

// Health check middleware to verify questions service connectivity
const checkQuestionsServiceHealth = async (req, res, next) => {
  try {
    await axios.get(`${QUESTIONS_SERVICE_URL}/health`);
    next();
  } catch (error) {
    console.error('Questions service health check failed:', error.message);
    res.status(503).json({ 
      message: 'Questions service unavailable',
      error: 'Service dependency unavailable'
    });
  }
};

// Endpoint untuk menyimpan pertanyaan baru (proxy ke question bank service)
app.post('/api/create', checkQuestionsServiceHealth, async (req, res) => {
  try {
    console.log(`Sending new question to ${QUESTIONS_SERVICE_URL}/api/questions`);
    // Forward request to Question Bank service
    const response = await axios.post(`${QUESTIONS_SERVICE_URL}/api/questions`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating question:', error);
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({ 
      message: 'Failed to create question', 
      error: error.message 
    });
  }
});

// Endpoint untuk mendapatkan kategori yang tersedia
app.get('/api/categories', (req, res) => {
  res.json(dataService.getCategories());
});

// Endpoint untuk mendapatkan tingkat kesulitan yang tersedia
app.get('/api/difficulties', (req, res) => {
  res.json(dataService.getDifficulties());
});

// Save draft question in creator service
app.post('/api/drafts', (req, res) => {
  const draft = dataService.saveDraft(req.body);
  res.status(201).json(draft);
});

// Get all draft questions
app.get('/api/drafts', (req, res) => {
  res.json(dataService.getDrafts());
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'question-creator',
    dependencies: {
      questionsService: QUESTIONS_SERVICE_URL
    }
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Question Creator Microservice running on port ${PORT}`);
  console.log(`Connected to Question Bank service at: ${QUESTIONS_SERVICE_URL}`);
});
