const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

const sampleQuestions = [
  {
    id: '1',
    text: 'Will artificial intelligence eventually replace human workers in most industries?',
    date: new Date('2024-01-15'),
    totalVotes: 15420,
    yesVotes: 8234,
    noVotes: 7186,
    isActive: true,
    category: 'technology',
    tags: ['AI', 'automation', 'employment'],
    trendAnalysis: 'Current voting shows 53.4% believe AI will replace most human workers, reflecting widespread concern about automation. This concern stems from rapid AI breakthroughs and lack of global regulatory frameworks. However, 46.6% remain optimistic about human adaptability and ingenuity.',
    comments: [
      {
        id: '1',
        text: 'AI will transform work, but humans will adapt and find new roles. History shows we always do.',
        timestamp: new Date('2024-01-15T10:30:00Z'),
        isAnonymous: true
      },
      {
        id: '2',
        text: 'The pace of AI advancement is unprecedented. We need to prepare for massive job displacement.',
        timestamp: new Date('2024-01-15T11:15:00Z'),
        isAnonymous: true
      },
      {
        id: '3',
        text: 'It depends on how we choose to implement AI. We can design it to augment rather than replace.',
        timestamp: new Date('2024-01-15T12:00:00Z'),
        isAnonymous: true
      }
    ]
  },
  {
    id: '2',
    text: 'Should humanity prioritize Mars colonization over solving Earth\'s problems?',
    date: new Date('2024-01-14'),
    totalVotes: 12850,
    yesVotes: 10280,
    noVotes: 2570,
    isActive: false,
    category: 'science',
    tags: ['space', 'mars', 'colonization'],
    trendAnalysis: '80% of voters support Mars colonization, indicating strong public enthusiasm for space exploration. This high support rate reflects humanity\'s innate curiosity and desire for expansion beyond Earth.',
    comments: [
      {
        id: '4',
        text: 'Mars colonization is humanity\'s insurance policy. We need a backup plan for our species.',
        timestamp: new Date('2024-01-14T09:20:00Z'),
        isAnonymous: true
      },
      {
        id: '5',
        text: 'We should fix Earth first. Mars won\'t solve our immediate problems here.',
        timestamp: new Date('2024-01-14T10:45:00Z'),
        isAnonymous: true
      }
    ]
  },
  {
    id: '3',
    text: 'Has social media made the world a better or worse place overall?',
    date: new Date('2024-01-13'),
    totalVotes: 18920,
    yesVotes: 5676,
    noVotes: 13244,
    isActive: false,
    category: 'society',
    tags: ['social media', 'technology', 'society'],
    trendAnalysis: '70% believe social media has made the world worse, reflecting growing concerns about its negative impacts including echo chambers, misinformation, and social anxiety.',
    comments: [
      {
        id: '6',
        text: 'Social media connects people globally but also creates echo chambers and spreads misinformation.',
        timestamp: new Date('2024-01-13T14:30:00Z'),
        isAnonymous: true
      },
      {
        id: '7',
        text: 'It\'s a tool. Like any tool, it can be used for good or bad. The problem is how we use it.',
        timestamp: new Date('2024-01-13T15:10:00Z'),
        isAnonymous: true
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldquestion', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');
    
    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('Inserted sample questions');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 