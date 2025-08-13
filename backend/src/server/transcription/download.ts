import axios from 'axios';
import { env } from '../env';

export async function downloadAudio(url: string): Promise<Buffer> {
  if (!url || typeof url !== 'string') {
    throw Object.assign(new Error('Invalid audio URL'), { status: 400 });
  }

  if (env.MOCK_DOWNLOAD) {
    await new Promise((r) => setTimeout(r, 50));
    return Buffer.from(`MOCK_AUDIO_FROM:${url}`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.DOWNLOAD_TIMEOUT_MS);

  try {
    const resp = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
      signal: controller.signal,
      validateStatus: (status) => status >= 200 && status < 300,
    });
    return Buffer.from(resp.data);
  } catch {
    throw Object.assign(new Error(`Failed to download audio from ${url}`), { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
