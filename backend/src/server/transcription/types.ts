export interface CreateTranscriptionRequest {
  audioUrl: string;
}

export interface CreateTranscriptionResponse {
  id: string; // MongoDB _id as string
}

export interface TranscriptionDoc {
  _id: string;
  audioUrl: string;
  transcription: string;
  createdAt: Date;
}
