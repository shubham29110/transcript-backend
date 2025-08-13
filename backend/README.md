# VoiceOwl Backend (Node.js + TypeScript + MongoDB)

## Overview
This is a minimal backend API that accepts an audio file URL, downloads (or mocks) it, generates a dummy transcription, and stores the result in MongoDB.  
Built for the **VoiceOwl Developer Evaluation Task**.

---

## Features
- **POST `/transcription`** → Create a transcription record from an audio URL.
- **GET `/transcription`** → List all stored transcriptions (bonus).
- Real audio download (when `MOCK_DOWNLOAD=false`) with timeout and retry support.
- Clean separation into routes, controllers, services, and models.
- In-memory MongoDB (`mongodb-memory-server`) fallback for local development/testing.
- Jest + Supertest test suite.
- Environment variables via `.env`.

---

## Project Structure
- src/
- index.ts
- server/
- app.ts
- db.ts
- env.ts
- transcription/
- controller.ts
- download.ts
- model.ts
- retry.ts
- routes.ts
- service.ts
- types.ts
- tests/
- transcription.test.ts
- .env.example
- package.json
- tsconfig.json
- README.md



---

## Tech Stack
- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Database:** MongoDB / MongoMemoryServer
- **Testing:** Jest + Supertest
- **HTTP Client:** Axios
- **Env Management:** dotenv

---

## Setup & Run
copy .env.example .env

### Install Dependencies
```bash
npm install
npm run dev
npm run test
```or
npm test

```curl

curl -X POST http://localhost:4000/transcription \
  -H "Content-Type: application/json" \
  -d '{"audioUrl": "https://example.com/sample.mp3"}'


curl http://localhost:4000/transcription
