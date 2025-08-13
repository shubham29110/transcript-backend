import type { Request, Response } from 'express';
import { createTranscription, listTranscriptions } from './service';

export async function postTranscription(req: Request, res: Response) {
    try {
        const result = await createTranscription(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        const status = err?.status ?? 500;
        res.status(status).json({ message: err?.message || 'Internal Server Error' });
    }
}

export async function getTranscriptions(_req: Request, res: Response) {
    try {
        const items = await listTranscriptions();
        res.json({ items });
    } catch (err: any) {
        const status = err?.status ?? 500;
        res.status(status).json({ message: err?.message || 'Internal Server Error' });
    }
}
