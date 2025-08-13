import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './env';

let memory: MongoMemoryServer | null = null;

export async function connectMongo() {
  const uri = env.MONGO_URI;
  if (!uri) {
    memory = await MongoMemoryServer.create();
    await mongoose.connect(memory.getUri(), { dbName: 'voiceowl' });
  } else {
    await mongoose.connect(uri);
  }
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  if (memory) {
    await memory.stop();
    memory = null;
  }
}
