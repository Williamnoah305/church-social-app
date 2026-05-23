# Church Social Media App - Setup Guide

## Prerequisites

- Node.js 16+ (https://nodejs.org/)
- PostgreSQL 12+ (https://www.postgresql.org/download/)
- Git (https://git-scm.com/)
- Docker & Docker Compose (optional, but recommended)

## Option 1: Setup with Docker (Recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Williamnoah305/church-social-app.git
cd church-social-app
```

### Step 2: Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env` and update the values as needed.

### Step 3: Start Services with Docker Compose
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Database with pre-loaded schema

### Step 4: Verify Services
```bash
# Check if backend is running
curl http://localhost:5000/health

# Should return: {"status":"Server is running"}
```

### Step 5: Start Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

Frontend will run on http://localhost:3000

---

## Option 2: Manual Setup (Without Docker)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Williamnoah305/church-social-app.git
cd church-social-app
```

### Step 2: Setup Database

1. Install PostgreSQL
2. Create a database:
```bash
psql -U postgres -c "CREATE DATABASE church_app;"
```

3. Load the schema:
```bash
psql -U postgres -d church_app -f database/schema.sql
```

### Step 3: Setup Backend
```bash
cd backend
npm install
cp ../.env.example ../.env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=church_app
JWT_SECRET=your-super-secret-key
```

Start the backend:
```bash
npm run dev
```

You should see: `🙏 Church App Backend running on port 5000`

### Step 4: Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

The app will open at http://localhost:3000

---

## Troubleshooting

### Database Connection Error
**Error**: `ECONNREFUSED 127.0.0.1:5432`

**Solution**: 
- Make sure PostgreSQL is running
- Check your `.env` database credentials
- Verify PostgreSQL is listening on port 5432

### Port Already in Use
**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### Node Modules Issues
**Error**: `Module not found`

**Solution**:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. Review the [API Documentation](./API.md)
2. Check the [Database Schema](./DATABASE.md)
3. Start implementing features:
   - Authentication
   - Posts & Comments
   - Events Management
   - Donations
   - Volunteer Coordination

## Deployment

For production deployment, consider:
- Heroku, AWS, or DigitalOcean for hosting
- Environment variable management
- SSL certificates
- Database backups
- CI/CD pipelines

## Need Help?

Open an issue on GitHub or check the documentation.
