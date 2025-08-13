import mongoose, { Schema, InferSchemaType } from 'mongoose';

const TranscriptionSchema = new Schema(
  {
    audioUrl: { type: String, required: true },
    transcription: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Transcription = InferSchemaType<typeof TranscriptionSchema> & { _id: mongoose.Types.ObjectId };

export const TranscriptionModel = mongoose.model('Transcription', TranscriptionSchema);
