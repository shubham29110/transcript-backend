import { TranscriptionModel } from './model';
import { downloadAudio } from './download';
import { withRetries } from './retry';
import type { CreateTranscriptionRequest } from './types';
import { env } from '../env';

function dummyTranscribe(_audio: Buffer): string {
  // In real life call a speech-to-text provider
  return 'transcribed text';
}

export async function createTranscription(payload: CreateTranscriptionRequest) {
  if (!payload?.audioUrl || typeof payload.audioUrl !== 'string') {
    throw Object.assign(new Error('audioUrl is required'), { status: 400 });
  }

  const audio = await withRetries(
    () => downloadAudio(payload.audioUrl),
    env.DOWNLOAD_RETRY_ATTEMPTS,
    env.DOWNLOAD_RETRY_BASE_MS
  );

  const text = dummyTranscribe(audio);

  const doc = await TranscriptionModel.create({ audioUrl: payload.audioUrl, transcription: text });
  return { id: String(doc._id) };
}

export async function listTranscriptions() {
  const docs = await TranscriptionModel.find({}).sort({ createdAt: -1 }).lean();
  return docs.map((d) => ({
    _id: String(d._id),
    audioUrl: d.audioUrl,
    transcription: d.transcription,
    createdAt: d.createdAt as Date,
  }));
}
