
# Microservices Backend untuk Learnify

## Arsitektur Microservices

Proyek ini mengimplementasikan arsitektur microservices dengan:

1. **Dashboard Service** (port 3001)
   - Menyediakan data statistik dan analitik untuk dashboard
   - API endpoint: `http://localhost:3001/api/dashboard/*`

2. **Question Bank Service** (port 3002)
   - Mengelola penyimpanan dan pengambilan data pertanyaan
   - API endpoint: `http://localhost:3002/api/questions`

3. **Question Creator Service** (port 3003)
   - Menangani pembuatan pertanyaan baru
   - API endpoint: `http://localhost:3003/api/*`

4. **Frontend** (port 8080)
   - Aplikasi React yang berkomunikasi dengan semua microservices melalui API

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
# Dashboard Service
cd dashboard
npm install
npm start

# Question Bank Service
cd questions
npm install
npm start

# Question Creator Service
cd creator
npm install
npm start
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

## API Endpoints

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
