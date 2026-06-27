# Backend - NestJS API

Mock interview backend with NestJS, Drizzle ORM, and Gemini AI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Add your credentials to `.env`:

- `NEXT_PUBLIC_DRIZZLE_DB_URL`: Neon PostgreSQL connection string
- `NEXT_PUBLIC_GEMINI_API_KEY`: Google Gemini API key

4. Push database schema:

```bash
npm run db:push
```

## Development

Start dev server (hot reload):

```bash
npm run start:dev
```

Backend runs on http://localhost:5000

## API Endpoints

- `POST /api/interviews` - Create new mock interview
- `GET /api/interviews?email=user@example.com` - Get user's interviews
- `GET /api/interviews/:mockId` - Get interview by ID
- `POST /api/interviews/:mockId/answers` - Save user answer
- `GET /api/interviews/:mockId/feedback` - Get interview feedback

## Production

Build:

```bash
npm run build
```

Start:

```bash
npm start
```
