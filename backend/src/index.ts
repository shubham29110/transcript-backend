import { createServer } from 'http';
import app from './server/app.js';
import { connectMongo } from './server/db.js';
import { env } from './server/env.js';

async function bootstrap() {
  await connectMongo();
  const server = createServer(app);
  server.listen(env.PORT, () => {
    console.log(`[voiceowl] API running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
