# 🗄️ Real Data Setup Guide

## Step 1: Set up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Update backend environment

### Option B: Docker MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option C: Local MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

## Step 2: Configure Backend Environment

Create `backend/.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/worldquestion
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/worldquestion

# Security
JWT_SECRET=worldquestion-dev-secret-key
CORS_ORIGIN=http://localhost:3030

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Step 3: Configure Frontend Environment

Create `.env.local` file in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 4: Start with Real Data

### Start Backend
```bash
cd backend
npm run dev
```

### Seed Database (Optional)
```bash
cd backend
npm run seed
```

### Start Frontend
```bash
# In another terminal
npm run dev
```

## Step 5: Test Real Data Flow

1. **Frontend loads** → API calls backend
2. **Backend queries** → MongoDB database
3. **Real data returns** → Frontend displays
4. **User votes** → Saved to database
5. **Results update** → Real-time from database

## Step 6: Verify Real Data

### Check Backend Health
```bash
curl http://localhost:5000/health
```

### Check Current Question
```bash
curl http://localhost:5000/api/questions/current
```

### Check Database
```bash
# Connect to MongoDB
mongosh
use worldquestion
db.questions.find()
db.votes.find()
db.comments.find()
```

## 🎯 What's Different Now

### Before (Fake Data):
- Static data in `data/questions.ts`
- No real persistence
- No backend integration
- Simulated voting

### After (Real Data):
- Data from MongoDB database
- Real API endpoints
- Persistent voting
- Real-time updates
- Database seeding

## 🚀 Production Ready

The application now uses:
- ✅ Real MongoDB database
- ✅ Express.js backend API
- ✅ Real data persistence
- ✅ API integration
- ✅ Error handling
- ✅ Loading states
- ✅ Database seeding

Your WorldQuestion platform is now fully functional with real data! 