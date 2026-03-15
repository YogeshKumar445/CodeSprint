# CodeSprint Phase 1 Architecture

## Backend (Express)
- `src/app.js` → Express app + middleware + routes
- `src/server.js` → server startup
- `src/config` → DB and env config
- `src/models` → MongoDB models
- `src/controllers` → request handlers
- `src/routes` → route definitions
- `src/services` → business logic
- `src/middlewares` → auth/error middlewares
- `src/utils` → helper functions

## Frontend (React + Vite)
- `src/pages` → Login, Signup, Problems, ProblemDetail, Leaderboard
- `src/components` → reusable components
- `src/services` → API calls (axios/fetch)
- `src/context` → auth/app state
- `src/hooks` → custom hooks