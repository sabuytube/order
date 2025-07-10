import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(MONGO_URI);
  return cached.conn;
}
