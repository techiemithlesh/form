const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    // console.log("mongodb url",mongoURI);
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true
        // useUnifiedTopology: true
      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      // Exit process with failure
      process.exit(1);
    }
  };
  

module.exports = connectDB;