import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export { connectToMongoDB };
