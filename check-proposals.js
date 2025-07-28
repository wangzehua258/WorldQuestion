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

// Check proposed questions
const checkProposals = async () => {
  try {
    await connectDB();
    
    // Import the ProposedQuestion model
    const ProposedQuestion = require('./models/ProposedQuestion');
    
    // Check if proposals exist
    const count = await ProposedQuestion.countDocuments();
    console.log(`📊 Found ${count} proposed questions in database`);
    
    if (count > 0) {
      const proposals = await ProposedQuestion.find().limit(3);
      console.log('📝 Sample proposals:');
      proposals.forEach((proposal, index) => {
        console.log(`${index + 1}. ID: ${proposal._id}`);
        console.log(`   Text: ${proposal.text.substring(0, 50)}...`);
        console.log(`   Votes: ${proposal.votes}`);
        console.log('---');
      });
    } else {
      console.log('❌ No proposed questions found. You need to submit some first!');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error checking proposals:', error);
    mongoose.connection.close();
  }
};

checkProposals(); 