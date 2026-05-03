# NutriSnap Backend (Express + MongoDB)

Matches the frontend client in `src/lib/api.ts`.

## Setup
```bash
npm install
cp .env.example .env   # then edit .env with your Mongo URI + JWT secret
npm run dev
```
Server runs at http://localhost:5000 — frontend hits http://localhost:5000/api.

## Endpoints
- POST /api/auth/register  { name, email, password }
- POST /api/auth/login     { email, password }
- GET  /api/auth/me        (Bearer token)
- PUT  /api/users/goal     { goal, dailyTargets }
- POST /api/meals/upload   (multipart: image, type)
- POST /api/meals          { ... }
- GET  /api/meals?date=YYYY-MM-DD
- DEL  /api/meals/:id
- GET  /api/logs/today
- GET  /api/logs/weekly
- POST /api/logs/water     { liters }
- GET  /api/suggestions
