# WorldQuestion - Daily World Questions Platform

A modern voting platform that asks one world-changing question every day. Vote, see results, share your perspective, and become part of global trend analysis.

## Product Overview

**One-liner:** A daily world question voting platform where you can vote, see results, share your stance, and become part of global trend analysis.

## Core Features

### 1. Daily World Questions
- One thought-provoking question every day
- Simple Yes/No voting mechanism
- Real-time results and percentages

### 2. Data Visualization
- Beautiful pie charts showing vote distribution
- Real-time vote updates
- Total vote counts and percentages

### 3. AI Trend Analysis
- Intelligent analysis based on voting results
- Interpretation of current social trends
- Deep insights and context

### 4. Featured Comments
- Curated user comments display
- Time-sorted featured comments
- Expandable/collapsible comment sections

### 5. Social Sharing
- Beautiful share card generation
- Download share images
- Native sharing support

### 6. Historical Questions
- Browse past questions
- Historical vote comparisons
- Question popularity rankings

## Technology Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date handling:** date-fns
- **Image generation:** html2canvas

### Backend
- **Runtime:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Validation:** Joi
- **Security:** Helmet, CORS, Rate limiting
- **Authentication:** JWT (future)

## Quick Start

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
npm install
npm start
```

### Production Build
```bash
npm run build
```

## Project Structure

```
├── backend/                 # Backend API
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── server.js           # Main server file
│   └── package.json
├── src/
│   ├── components/         # React components
│   │   ├── QuestionCard.tsx
│   │   ├── VoteChart.tsx
│   │   ├── ShareCard.tsx
│   │   └── HistoryQuestions.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── data/               # Sample data
│   │   └── questions.ts
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # App entry point
│   └── index.css           # Global styles
└── README.md
```

## API Endpoints

### Questions
- `GET /api/questions/current` - Get current question
- `GET /api/questions` - Get all questions (paginated)
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions/:id/vote` - Vote on a question
- `POST /api/questions/:id/comments` - Add comment
- `GET /api/questions/trending/top` - Get trending questions

### Health
- `GET /api/health` - Health check

## User Flow

1. **Visit Website** → See today's world question
2. **Vote** → Click Yes or No button
3. **View Results** → See vote results, charts, trend analysis
4. **Browse Comments** → Read featured user comments
5. **Share Vote** → Generate and share voting card
6. **Explore History** → Browse past questions and results

## Design Features

- **Modern UI:** Clean, professional design focused on content
- **Responsive Layout:** Perfect adaptation to all device sizes
- **Smooth Animations:** Elegant transitions and hover effects
- **Data Visualization:** Intuitive charts for vote results
- **Social Sharing:** Beautiful share card design

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/worldquestion
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

### Frontend
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Future Roadmap

- [ ] User authentication system
- [ ] Comment posting functionality
- [ ] Question recommendation algorithm
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Real-time data synchronization
- [ ] More chart types
- [ ] Question categorization
- [ ] Admin panel for question management
- [ ] Analytics dashboard

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## License

MIT License 