
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3003;
const QUESTIONS_SERVICE_URL = process.env.QUESTIONS_SERVICE_URL || 'http://localhost:3002';

app.use(cors());
app.use(express.json());

// Endpoint untuk menyimpan pertanyaan baru (proxy ke question bank service)
app.post('/api/create', async (req, res) => {
  try {
    console.log(`Mengirim pertanyaan baru ke ${QUESTIONS_SERVICE_URL}/api/questions`);
    // Forward request to Question Bank service
    const response = await axios.post(`${QUESTIONS_SERVICE_URL}/api/questions`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ 
      message: 'Gagal membuat pertanyaan', 
      error: error.message 
    });
  }
});

// Endpoint untuk mendapatkan kategori yang tersedia
app.get('/api/categories', (req, res) => {
  // Static list of categories
  const categories = [
    { id: 'matematika', name: 'Matematika' },
    { id: 'sains', name: 'Sains' },
    { id: 'bahasa', name: 'Bahasa' },
    { id: 'sejarah', name: 'Sejarah' },
    { id: 'geografi', name: 'Geografi' },
    { id: 'lainnya', name: 'Lainnya' }
  ];
  
  res.json(categories);
});

// Endpoint untuk mendapatkan tingkat kesulitan yang tersedia
app.get('/api/difficulties', (req, res) => {
  const difficulties = [
    { id: 'mudah', name: 'Mudah' },
    { id: 'sedang', name: 'Sedang' },
    { id: 'sulit', name: 'Sulit' }
  ];
  
  res.json(difficulties);
});

// Server start
app.listen(PORT, () => {
  console.log(`Question Creator Microservice berjalan di port ${PORT}`);
  console.log(`Terhubung ke Question Bank service di: ${QUESTIONS_SERVICE_URL}`);
});
