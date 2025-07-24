const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/worldquestion';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample question data
const sampleQuestion = {
  text: "Should artificial intelligence be regulated by governments to ensure ethical development?",
  date: new Date(),
  category: "technology",
  tags: ["AI", "regulation", "ethics", "government"],
  isActive: true,
  totalVotes: 0,
  yesVotes: 0,
  noVotes: 0
};

// Add the question
const addSampleQuestion = async () => {
  try {
    await connectDB();
    
    // Import the Question model
    const Question = require('./models/Question');
    
    // Check if there's already an active question
    const existingActive = await Question.findOne({ isActive: true });
    if (existingActive) {
      console.log('⚠️  An active question already exists:', existingActive.text);
      return;
    }
    
    // Create new question
    const question = new Question(sampleQuestion);
    await question.save();
    
    console.log('✅ Sample question added successfully!');
    console.log('📝 Question:', question.text);
    console.log('🏷️  Category:', question.category);
    console.log('🆔 ID:', question._id);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error adding sample question:', error);
    mongoose.connection.close();
  }
};

addSampleQuestion(); 