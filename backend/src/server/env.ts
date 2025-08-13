import dotenv from 'dotenv';

dotenv.config();

function toInt(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const env = {
  PORT: toInt(process.env.PORT, 4000),
  MONGO_URI: process.env.MONGO_URI,
  MOCK_DOWNLOAD: (process.env.MOCK_DOWNLOAD ?? 'true').toLowerCase() === 'true',
  DOWNLOAD_TIMEOUT_MS: toInt(process.env.DOWNLOAD_TIMEOUT_MS, 8000),
  DOWNLOAD_RETRY_ATTEMPTS: toInt(process.env.DOWNLOAD_RETRY_ATTEMPTS, 3),
  DOWNLOAD_RETRY_BASE_MS: toInt(process.env.DOWNLOAD_RETRY_BASE_MS, 300),
} as const;
