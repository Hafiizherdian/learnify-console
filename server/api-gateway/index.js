
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Service URLs from environment variables
const DASHBOARD_SERVICE_URL = process.env.DASHBOARD_SERVICE_URL || 'http://dashboard-service:3001';
const QUESTIONS_SERVICE_URL = process.env.QUESTIONS_SERVICE_URL || 'http://questions-service:3002';
const CREATOR_SERVICE_URL = process.env.CREATOR_SERVICE_URL || 'http://creator-service:3003';

// Configuration for proxy paths
const proxyConfigs = [
  {
    path: '/api/dashboard',
    target: DASHBOARD_SERVICE_URL,
    pathRewrite: {
      '^/api/dashboard': '/api/dashboard'
    }
  },
  {
    path: '/api/questions',
    target: QUESTIONS_SERVICE_URL,
    pathRewrite: {
      '^/api/questions': '/api/questions'
    }
  },
  {
    path: '/api/creator',
    target: CREATOR_SERVICE_URL,
    pathRewrite: {
      '^/api/creator': '/api'
    }
  }
];

// Setup proxy routes
proxyConfigs.forEach(config => {
  app.use(config.path, createProxyMiddleware({
    target: config.target,
    pathRewrite: config.pathRewrite,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error(`Proxy error: ${err.message}`);
      res.status(503).json({
        status: 'error',
        message: 'Service temporarily unavailable',
        service: config.path.split('/')[2]
      });
    }
  }));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'api-gateway',
    services: {
      dashboard: DASHBOARD_SERVICE_URL,
      questions: QUESTIONS_SERVICE_URL,
      creator: CREATOR_SERVICE_URL
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Routing to services:
    - Dashboard: ${DASHBOARD_SERVICE_URL}
    - Questions: ${QUESTIONS_SERVICE_URL} 
    - Creator: ${CREATOR_SERVICE_URL}`);
});
