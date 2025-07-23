# WorldQuestion - Daily World Questions Platform

A stunning, modern voting platform that asks one world-changing question every day. Vote, see results, share your perspective, and become part of global trend analysis.

![WorldQuestion Platform](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4.18.2-green?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-green?style=for-the-badge&logo=mongodb)

## 🌍 Product Overview

**One-liner:** A daily world question voting platform where you can vote, see results, share your stance, and become part of global trend analysis.

## ✨ Core Features

### 🗳️ Daily World Questions
- One thought-provoking question every day
- Simple Yes/No voting mechanism
- Real-time results and percentages

### 📊 Beautiful Data Visualization
- Stunning doughnut charts showing vote distribution
- Real-time vote updates with animations
- Total vote counts and percentages

### 🤖 AI Trend Analysis
- Intelligent analysis based on voting results
- Interpretation of current social trends
- Deep insights and context

### 💬 Featured Comments
- Curated user comments display
- Time-sorted featured comments
- Expandable/collapsible comment sections

### 📱 Social Sharing
- Beautiful share card generation
- Download share images
- Native sharing support

### 📚 Historical Questions
- Browse past questions
- Historical vote comparisons
- Question popularity rankings

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Charts:** Chart.js with react-chartjs-2
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Date handling:** date-fns
- **Image generation:** html2canvas

### Backend
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB with Mongoose ODM
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Express Validator
- **Logging:** Morgan
- **Compression:** Compression middleware

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/worldquestion.git
cd worldquestion

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup
```bash
# Start MongoDB (if using local)
mongod

# Or use MongoDB Atlas (cloud)
# Update backend/.env with your connection string
```

### 3. Environment Configuration
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Backend (backend/.env)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/worldquestion
CORS_ORIGIN=http://localhost:3030
```

### 4. Database Seeding
```bash
# Seed the database with sample data
cd backend
npm run seed
cd ..
```

### 5. Start the Application
```bash
# Terminal 1: Start backend (port 5000)
cd backend
npm run dev

# Terminal 2: Start frontend (port 3030)
npm run dev
```

### 6. Access the Application
- **Frontend:** http://localhost:3030
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## 📁 Project Structure

```
worldquestion/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── VoteChart.tsx      # Beautiful charts
│   └── ShareCard.tsx      # Share card modal
├── services/              # API services
│   └── api.ts            # Backend integration
├── data/                  # Sample data
│   └── questions.ts       # Question data
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
├── backend/               # Express.js Backend
│   ├── models/           # MongoDB models
│   │   ├── Question.js   # Question schema
│   │   ├── Vote.js       # Vote schema
│   │   └── Comment.js    # Comment schema
│   ├── routes/           # API routes
│   │   └── questions.js  # Question endpoints
│   ├── scripts/          # Database scripts
│   │   └── seed.js       # Seeding script
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── env.example       # Environment template
├── public/                # Static assets
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔌 API Endpoints

### Questions
- `GET /api/questions/current` - Get current active question
- `GET /api/questions/history` - Get historical questions
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions/:id/vote` - Vote on a question
- `GET /api/questions/:id/stats` - Get vote statistics

### Comments
- `GET /api/questions/:id/comments` - Get comments for a question
- `POST /api/questions/:id/comments` - Add a comment

### Health
- `GET /health` - Health check endpoint

## 🎨 Design Features

### Modern UI/UX
- **Glassmorphism effects** with backdrop blur
- **Gradient backgrounds** and beautiful color schemes
- **Smooth animations** with Framer Motion
- **Responsive design** that works on all devices
- **Interactive elements** with hover and tap effects

### Beautiful Components
- **Animated vote buttons** with scale effects
- **Stunning charts** with custom styling
- **Elegant cards** with shadows and borders
- **Professional typography** with Inter font
- **Icon integration** with Lucide React

### User Experience
- **Intuitive navigation** with smooth transitions
- **Real-time feedback** for user actions
- **Accessible design** with proper contrast
- **Mobile-first approach** for all screen sizes

## 📊 Data Flow

1. **User visits** → Frontend loads current question from API
2. **User votes** → Frontend sends vote to backend API
3. **Backend processes** → Updates MongoDB and returns results
4. **Results display** → Frontend shows beautiful charts and analysis
5. **Comments section** → Loads featured comments from API
6. **Share functionality** → Generates and shares voting card
7. **History browsing** → Loads historical questions from API

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/worldquestion

# Security
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3030

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database Models

#### Question Schema
```javascript
{
  text: String,           // Question text
  date: Date,            // Question date
  category: String,      // technology, society, etc.
  tags: [String],        // Question tags
  isActive: Boolean,     // Current active question
  aiSummary: String,     // AI-generated analysis
  totalVotes: Number,    // Total vote count
  yesVotes: Number,      // Yes votes count
  noVotes: Number        // No votes count
}
```

#### Vote Schema
```javascript
{
  questionId: ObjectId,  // Reference to question
  choice: String,        // 'yes' or 'no'
  userIp: String,        // Voter IP (for duplicate prevention)
  timestamp: Date        // Vote timestamp
}
```

#### Comment Schema
```javascript
{
  questionId: ObjectId,  // Reference to question
  content: String,       // Comment text
  isAnonymous: Boolean,  // Anonymous comment
  isPinned: Boolean,     // Featured comment
  userIp: String,        // Commenter IP
  likes: Number          // Like count
}
```

## 🎯 Future Roadmap

### Phase 1 (Current) ✅
- ✅ Beautiful UI/UX design
- ✅ Voting functionality
- ✅ Results visualization
- ✅ Share cards
- ✅ Historical questions
- ✅ Real backend integration
- ✅ MongoDB database
- ✅ API endpoints
- ✅ Database seeding

### Phase 2 (Next)
- [ ] User authentication
- [ ] Real-time voting updates (WebSocket)
- [ ] Comment posting from frontend
- [ ] User profiles
- [ ] Question categories
- [ ] Admin dashboard

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] AI-powered question generation
- [ ] Social features

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy to Railway/Heroku
# Connect MongoDB Atlas
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Chart.js** for data visualization
- **Lucide** for beautiful icons

---

**Made with ❤️ by the WorldQuestion Team** 