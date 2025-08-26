const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/easylist', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
