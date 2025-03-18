
# Microservices Backend untuk Learnify

## Arsitektur Microservices

Proyek ini mengimplementasikan arsitektur microservices dengan:

1. **API Gateway** (port 3000)
   - Single entry point untuk semua API requests
   - Routing ke microservices yang sesuai
   - Load balancing dan service discovery
   - API endpoint: `http://localhost:3000/api/*`

2. **Dashboard Service** (port 3001)
   - Menyediakan data statistik dan analitik untuk dashboard
   - API endpoint: `http://localhost:3001/api/dashboard/*`
   - Independen dan dapat di-deploy secara terpisah
   - Memiliki database sendiri

3. **Question Bank Service** (port 3002)
   - Mengelola penyimpanan dan pengambilan data pertanyaan
   - API endpoint: `http://localhost:3002/api/questions`
   - Memiliki database sendiri (file JSON)
   - Independen dan dapat di-deploy secara terpisah

4. **Question Creator Service** (port 3003)
   - Menangani pembuatan pertanyaan baru
   - Menyimpan draft pertanyaan dalam database sendiri
   - API endpoint: `http://localhost:3003/api/*`
   - Berkomunikasi dengan Question Bank service melalui API
   - Independen dan dapat di-deploy secara terpisah

5. **Frontend** (port 8080)
   - Aplikasi React yang berkomunikasi dengan API Gateway
   - Menggunakan environment variables untuk konfigurasi endpoint API

## Prinsip Microservices yang Diimplementasikan

- **API Gateway Pattern**: Single entry point untuk semua requests
- **Deployment Independen**: Setiap layanan dapat di-deploy secara terpisah
- **Database per Service**: Setiap layanan memiliki penyimpanan data sendiri
- **Komunikasi melalui API**: Layanan berkomunikasi menggunakan REST API
- **Isolasi**: Tidak ada ketergantungan kode antar layanan, hanya melalui API
- **Containerization**: Setiap layanan di-Dockerize untuk isolasi lingkungan

## Cara Menjalankan dengan Docker

### Prasyarat
- Docker dan Docker Compose

### Menjalankan dengan Docker Compose

```bash
# Build semua container
docker-compose build

# Jalankan semua container
docker-compose up

# Atau jalankan di background
docker-compose up -d

# Hentikan semua container
docker-compose down
```

## Cara Menjalankan Tanpa Docker

### Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm (v6 atau lebih tinggi)

### Instalasi dan Menjalankan Setiap Layanan

```bash
# API Gateway
cd server/api-gateway
npm install
npm start

# Dashboard Service
cd server/dashboard
npm install
npm start

# Question Bank Service
cd server/questions
npm install
npm start

# Question Creator Service
cd server/creator
npm install
npm start

# Frontend
npm install
npm run dev
```

### Menjalankan semua service sekaligus dari root:

```bash
# Masuk ke direktori server
cd server

# Install dependencies
npm install

# Jalankan semua service
npm run start:all
```

## Environment Variables

### Frontend (.env)
```
VITE_API_GATEWAY=http://localhost:3000/api
```

### API Gateway
```
PORT=3000
DASHBOARD_SERVICE_URL=http://dashboard-service:3001
QUESTIONS_SERVICE_URL=http://questions-service:3002
CREATOR_SERVICE_URL=http://creator-service:3003
```

### Creator Service
```
PORT=3003
QUESTIONS_SERVICE_URL=http://questions-service:3002 (in Docker) or http://localhost:3002 (local)
```

## API Endpoints

### API Gateway
- `GET /health` - Health check for the API Gateway
- All other endpoints are proxied to respective services

### Dashboard Service
- `GET /api/dashboard/stats` - Mendapatkan statistik dashboard
- `GET /api/dashboard/activity` - Mendapatkan data aktivitas
- `GET /api/dashboard/categories` - Mendapatkan distribusi kategori
- `GET /api/dashboard/recent-questions` - Mendapatkan pertanyaan terbaru

### Question Bank Service
- `GET /api/questions` - Mendapatkan semua pertanyaan
- `GET /api/questions/:id` - Mendapatkan pertanyaan berdasarkan ID
- `POST /api/questions` - Membuat pertanyaan baru
- `PUT /api/questions/:id` - Memperbarui pertanyaan
- `DELETE /api/questions/:id` - Menghapus pertanyaan

### Question Creator Service
- `POST /api/create` - Membuat pertanyaan baru (proxy ke Question Bank)
- `GET /api/categories` - Mendapatkan daftar kategori yang tersedia
- `GET /api/difficulties` - Mendapatkan daftar tingkat kesulitan yang tersedia
- `POST /api/drafts` - Menyimpan draft pertanyaan
- `GET /api/drafts` - Mendapatkan semua draft pertanyaan
