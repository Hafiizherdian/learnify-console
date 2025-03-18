
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dataService = require('./data-service');

const app = express();
const PORT = process.env.PORT || 3003;
const QUESTIONS_SERVICE_URL = process.env.QUESTIONS_SERVICE_URL || 'http://questions-service:3002';

app.use(cors());
app.use(express.json());

// Create question via Question Service API
app.post('/api/questions', async (req, res) => {
  try {
    console.log(`Sending new question to ${QUESTIONS_SERVICE_URL}/api/questions`);
    // Make API call to Question Bank service
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

// Get categories from local data service
app.get('/api/categories', (req, res) => {
  res.json(dataService.getCategories());
});

// Get difficulties from local data service
app.get('/api/difficulties', (req, res) => {
  res.json(dataService.getDifficulties());
});

// Save draft question in creator service's own database
app.post('/api/drafts', (req, res) => {
  const draft = dataService.saveDraft(req.body);
  res.status(201).json(draft);
});

// Get all draft questions from creator's database
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
