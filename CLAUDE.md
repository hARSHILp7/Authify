# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Authify is a full-stack authentication application — React (Vite) frontend + Node.js/Express backend — using JWT tokens, bcrypt password hashing, and MongoDB via Mongoose.

## Development Commands

### Backend (run from `server/`)
```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start without auto-reload
```

### Frontend (run from `client/`)
```bash
npm run dev    # Start Vite dev server on port 3000
npm run build  # Production build
npm run lint   # ESLint check
npm run preview # Preview production build
```

Both servers must run concurrently during development. Frontend expects backend at `VITE_API_URL` (default: `http://localhost:5000`).

## Environment Setup

**`server/.env`**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/authify
JWT_SECRET=your_super_secret_key_change_this
```

**`client/.env`**
```
VITE_API_URL=http://localhost:5000
```

## Architecture

### Backend (`server/`)
- **Entry**: `server.js` — Express app, CORS setup, route mounting
- **Routes**: `routes/authRoutes.js` — `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`
- **Controllers**: `controllers/authController.js` — business logic for signup, login, getMe
- **Middleware**: `middleware/authMiddleware.js` — verifies JWT Bearer token, attaches `req.user`
- **Model**: `models/User.js` — Mongoose schema (name, email, hashed password); password never returned via `.select('-password')`
- **Config**: `config/db.js` — Mongoose connection

JWT tokens expire in 7 days; bcrypt uses 10 salt rounds.

### Frontend (`client/src/`)
- **`context/AuthContext.jsx`** — global auth state (user + token), persisted in localStorage
- **`services/authService.js`** — Axios instance; request interceptor attaches JWT; response interceptor clears auth and redirects on 401
- **`components/ProtectedRoute.jsx`** — wraps `/dashboard`; redirects unauthenticated users to `/login`
- **`pages/`** — `LoginPage.jsx`, `SignUpPage.jsx`, `DashboardPage.jsx` are the active pages
- **`App.jsx`** — React Router setup

> Note: `Login.jsx` and `SignUp.jsx` in `src/` are legacy components, superseded by the `pages/` versions. `TestPage.jsx` at route `/test` is a manual testing playground for API calls.

## Testing

No automated test suite is configured. `client/src/TestPage.jsx` (route `/test`) provides manual API testing with fake and real login/signup flows, and displays current auth state and API responses.
