const mongoose = require('mongoose');
const Question = require('../models/Question');
const ProposedQuestion = require('../models/ProposedQuestion');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldquestion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function rotateWeeklyQuestion() {
  try {
    console.log('🔄 Starting weekly question rotation...');
    
    // Get current date info
    const now = new Date();
    console.log(`📅 Rotation time: ${now.toISOString()}`);
    
    // Perform the rotation
    const result = await Question.rotateWeeklyQuestion();
    
    if (result.success) {
      console.log('✅ Weekly rotation completed successfully!');
      
      if (result.archivedQuestion) {
        console.log(`📚 Archived question: "${result.archivedQuestion.text}"`);
        console.log(`   Final votes - Yes: ${result.archivedQuestion.yesVotes}, No: ${result.archivedQuestion.noVotes}`);
      }
      
      if (result.selectedProposal) {
        console.log(`🎯 Selected proposal: "${result.selectedProposal.text}"`);
        console.log(`   Submitted by: ${result.selectedProposal.submittedBy}`);
        console.log(`   Votes received: ${result.selectedProposal.votes}`);
      }
      
      console.log(`🆕 New active question: "${result.newQuestion.text}"`);
      console.log(`   Category: ${result.newQuestion.category}`);
      
      // Reset all active proposals to allow new submissions
      await ProposedQuestion.updateMany(
        { status: 'active' },
        { 
          status: 'rejected',
          rejectedAt: new Date()
        }
      );
      
      console.log('🔄 Reset all active proposals for new cycle');
      
    } else {
      console.log('❌ Weekly rotation failed');
    }
    
  } catch (error) {
    console.error('💥 Error during weekly rotation:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the rotation
rotateWeeklyQuestion(); 