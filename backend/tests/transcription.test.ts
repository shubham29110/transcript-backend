import request from 'supertest';
import app from '../src/server/app';
import { connectMongo, disconnectMongo } from '../src/server/db';

beforeAll(async () => {
  await connectMongo();
});

afterAll(async () => {
  await disconnectMongo();
});

it('creates a transcription and returns id', async () => {
  const res = await request(app)
    .post('/transcription')
    .send({ audioUrl: 'https://example.com/sample.mp3' })
    .expect(201);

  expect(res.body).toHaveProperty('id');
  expect(typeof res.body.id).toBe('string');
});

it('lists transcriptions', async () => {
  await request(app).post('/transcription').send({ audioUrl: 'https://example.com/a.mp3' });
  const res = await request(app).get('/transcription').expect(200);
  expect(Array.isArray(res.body.items)).toBe(true);
  expect(res.body.items[0]).toHaveProperty('_id');
});
