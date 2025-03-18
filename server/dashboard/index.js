
const express = require('express');
const cors = require('cors');
const dataService = require('./data-service');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes untuk Dashboard Microservice
app.get('/api/dashboard/stats', (req, res) => {
  res.json(dataService.getStats());
});

app.get('/api/dashboard/activity', (req, res) => {
  res.json(dataService.getActivityData());
});

app.get('/api/dashboard/categories', (req, res) => {
  res.json(dataService.getCategoryData());
});

app.get('/api/dashboard/recent-questions', (req, res) => {
  res.json(dataService.getRecentQuestions());
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'dashboard'
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Dashboard Microservice running on port ${PORT}`);
});
