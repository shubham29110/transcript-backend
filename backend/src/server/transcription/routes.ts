import { Router } from 'express';
import { getTranscriptions, postTranscription } from './controller';

const router = Router();

// POST /transcription
router.post('/', postTranscription);

// GET /transcription (optional bonus endpoint)
router.get('/', getTranscriptions);

export default router;
