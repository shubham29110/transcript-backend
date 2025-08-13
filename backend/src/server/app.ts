import express from 'express';
import { json } from 'express';
import transcriptionRouter from '../server/transcription/routes';

const app = express();
app.use(json());

app.get('/ping', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/transcription', transcriptionRouter);

export default app;
