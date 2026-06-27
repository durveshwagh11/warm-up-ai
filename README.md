# Mock Interview AI

AI-powered interview preparation platform with NestJS backend and Next.js frontend.

## Project Structure

```
/
├── frontend/          # Next.js application
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   └── lib/           # Frontend utilities
│
├── backend/           # NestJS API
│   ├── src/
│   │   ├── interview/ # Interview module (controllers, services)
│   │   ├── database/  # Database module (Drizzle ORM)
│   │   └── ai/        # AI module (Gemini integration)
│   └── utils/         # Legacy utils (migrating to NestJS)
│
└── package.json       # Root scripts
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (Neon DB)
- Google Gemini API key
- Clerk account (for auth)

### Installation

1. Clone and install:

```bash
git clone <repo-url>
npm install
```

2. Setup backend:

```bash
cd backend
cp .env.example .env
# Add your credentials to .env
npm run db:push
```

3. Setup frontend:

```bash
cd frontend
# Configure .env.local with Clerk keys
```

### Development

Run frontend only:

```bash
npm run dev:frontend
```

Run backend only:

```bash
npm run dev:backend
```

Run both (separate terminals):

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev:frontend` | Start frontend dev server       |
| `npm run dev:backend`  | Start backend dev server        |
| `npm run build`        | Build both frontend and backend |
| `npm run db:push`      | Push database schema            |
| `npm run db:studio`    | Open Drizzle Studio             |

## Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Clerk Authentication
- Radix UI

**Backend:**

- NestJS
- Drizzle ORM
- Neon PostgreSQL
- Google Gemini AI

## Features

- AI-generated interview questions
- Real-time answer recording
- Automated feedback with ratings
- User authentication
- Interview history tracking
