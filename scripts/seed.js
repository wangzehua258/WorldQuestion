const mongoose = require('mongoose');
const Question = require('../models/Question');
const Comment = require('../models/Comment');
require('dotenv').config();

const sampleQuestions = [
  {
    text: 'Will artificial intelligence eventually replace human workers in most industries?',
    date: new Date('2024-01-15'),
    category: 'technology',
    tags: ['AI', 'automation', 'employment'],
    isActive: true,
    aiSummary: 'Based on current voting trends, people are more concerned about AI replacing jobs than excited about its potential. This reflects widespread anxiety about automation and economic displacement.',
    totalVotes: 15420,
    yesVotes: 8234,
    noVotes: 7186
  },
  {
    text: 'Should humanity prioritize Mars colonization over solving Earth\'s problems?',
    date: new Date('2024-01-14'),
    category: 'science',
    tags: ['space', 'mars', 'colonization'],
    isActive: false,
    aiSummary: 'The overwhelming support for Mars colonization shows humanity\'s innate desire for exploration and expansion, despite the practical challenges of space travel.',
    totalVotes: 12850,
    yesVotes: 10280,
    noVotes: 2570
  },
  {
    text: 'Has social media made the world a better or worse place overall?',
    date: new Date('2024-01-13'),
    category: 'society',
    tags: ['social media', 'technology', 'society'],
    isActive: false,
    aiSummary: 'The majority believe social media has made the world worse, reflecting growing concerns about its negative impacts on mental health and society.',
    totalVotes: 18920,
    yesVotes: 5676,
    noVotes: 13244
  },
  {
    text: 'Should governments implement universal basic income to address automation?',
    date: new Date('2024-01-12'),
    category: 'politics',
    tags: ['UBI', 'automation', 'economics'],
    isActive: false,
    aiSummary: 'Public opinion is divided on UBI, with concerns about cost and work incentives balanced against the need to address economic inequality.',
    totalVotes: 11230,
    yesVotes: 6738,
    noVotes: 4492
  },
  {
    text: 'Is climate change the most urgent global crisis facing humanity?',
    date: new Date('2024-01-11'),
    category: 'environment',
    tags: ['climate change', 'environment', 'crisis'],
    isActive: false,
    aiSummary: 'Climate change is widely recognized as a critical issue, though opinions vary on its urgency compared to other global challenges.',
    totalVotes: 14560,
    yesVotes: 10192,
    noVotes: 4368
  }
];

const sampleComments = [
  {
    content: 'AI will transform work, but humans will adapt and find new roles. History shows we always do.',
    isAnonymous: true,
    isPinned: true,
    userIp: '192.168.1.1',
    likes: 45
  },
  {
    content: 'The pace of AI advancement is unprecedented. We need to prepare for massive job displacement.',
    isAnonymous: true,
    isPinned: true,
    userIp: '192.168.1.2',
    likes: 32
  },
  {
    content: 'It depends on how we choose to implement AI. We can design it to augment rather than replace.',
    isAnonymous: true,
    isPinned: true,
    userIp: '192.168.1.3',
    likes: 28
  },
  {
    content: 'I work in tech and see this happening already. Many jobs are being automated.',
    isAnonymous: true,
    isPinned: false,
    userIp: '192.168.1.4',
    likes: 15
  },
  {
    content: 'Humans have unique creativity and emotional intelligence that AI cannot replicate.',
    isAnonymous: true,
    isPinned: false,
    userIp: '192.168.1.5',
    likes: 22
  }
];

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/worldquestion';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Question.deleteMany({});
    await Comment.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert questions
    const questions = await Question.insertMany(sampleQuestions);
    console.log(`✅ Inserted ${questions.length} questions`);

    // Insert comments for the first question (current active question)
    const currentQuestion = questions[0];
    const commentsWithQuestionId = sampleComments.map(comment => ({
      ...comment,
      questionId: currentQuestion._id,
      timestamp: new Date()
    }));

    await Comment.insertMany(commentsWithQuestionId);
    console.log(`✅ Inserted ${commentsWithQuestionId.length} comments`);

    // Add some comments to other questions
    const additionalComments = [
      {
        questionId: questions[1]._id,
        content: 'Mars colonization is humanity\'s insurance policy. We need a backup plan for our species.',
        isAnonymous: true,
        isPinned: true,
        userIp: '192.168.1.6',
        likes: 18,
        timestamp: new Date()
      },
      {
        questionId: questions[1]._id,
        content: 'We should fix Earth first. Mars won\'t solve our immediate problems here.',
        isAnonymous: true,
        isPinned: true,
        userIp: '192.168.1.7',
        likes: 25,
        timestamp: new Date()
      },
      {
        questionId: questions[2]._id,
        content: 'Social media connects people globally but also creates echo chambers and spreads misinformation.',
        isAnonymous: true,
        isPinned: true,
        userIp: '192.168.1.8',
        likes: 31,
        timestamp: new Date()
      },
      {
        questionId: questions[2]._id,
        content: 'It\'s a tool. Like any tool, it can be used for good or bad. The problem is how we use it.',
        isAnonymous: true,
        isPinned: true,
        userIp: '192.168.1.9',
        likes: 19,
        timestamp: new Date()
      }
    ];

    await Comment.insertMany(additionalComments);
    console.log(`✅ Inserted ${additionalComments.length} additional comments`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample data summary:');
    console.log(`   Questions: ${questions.length}`);
    console.log(`   Comments: ${commentsWithQuestionId.length + additionalComments.length}`);
    console.log(`   Current active question: "${questions[0].text}"`);
    
    // Display current question stats
    const currentQuestionStats = questions[0];
    console.log(`   Current question stats:`);
    console.log(`     Total votes: ${currentQuestionStats.totalVotes.toLocaleString()}`);
    console.log(`     Yes votes: ${currentQuestionStats.yesVotes.toLocaleString()} (${currentQuestionStats.yesPercentage}%)`);
    console.log(`     No votes: ${currentQuestionStats.noVotes.toLocaleString()} (${currentQuestionStats.noPercentage}%)`);

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding
connectDB().then(seedDatabase); 