# Closet Companion

Closet Companion is a mobile-first, offline-first prototype for an on-device AI wardrobe assistant. It helps users catalog clothing, receive outfit suggestions, track wear and laundry, and discover shopping gaps — prioritizing privacy by running inference locally.

This repository contains an Expo React Native frontend and a lightweight Python backend API (optional). The frontend is the primary product; the backend is intended for optional cloud features (sync, backups, model distribution) and local dev/testing.

## Features

- Closet (catalog): add, edit, and view clothing items with images and metadata.
- AI Tagging: on-device image preprocessing and lightweight classification (placeholder using TensorFlow Lite / ONNX mobile later).
- Suggestions: rule-based outfit recommendations with A/B comparison and feedback controls.
- Insights: wear analytics, underused detection, and donation suggestions.
- Laundry tracking: mark items dirty/clean and update availability.
- Shopping helpers: barcode scanning (planned), gap detection, and compatibility checks.

## Repo structure (key files)

- `src/` — React Native app source
	- `src/App.js` — app entry; initializes local DB and navigation
	- `src/navigation/index.js` — bottom-tab navigation
	- `src/screens/` — main screens: `Dashboard`, `Closet`, `Suggestions`, `Insights`, `Shopping`
	- `src/components/` — UI components and design tokens
	- `src/styles/` — design tokens (`colors.js`, `typography.js`, `spacing.js`, `shadows.js`)
- `db/` — local SQLite client and data access
	- `db/client.js` — initializes SQLite (expo-sqlite) and runs migrations
	- `db/items.js` — item CRUD helpers
- `services/ai/` — placeholder for image preprocessing and classifier integration
- `data/schema.sql` — reference SQLite schema

## Requirements

- Frontend: Node.js (16+ recommended), Expo CLI
- Backend (optional): Python 3.10+ (venv), `uvicorn`/`fastapi` recommended

## Frontend — Quick start (Expo)

1. Install dependencies

```bash
cd Closet-Companion
npm install
# or: yarn install
```

2. Start the Expo dev server

```bash
npm start
# or: expo start
```

3. Run on a device or emulator

- For iOS simulator (macOS): `npm run ios`
- For Android emulator or device: `npm run android`

Notes:
- The app initializes a local SQLite database (`db/client.js`) on first run. No manual DB setup required for the frontend.

## Backend (optional) — Quick start (FastAPI example)

> This project does not include a production backend by default. The steps below assume you add a Python backend under `backend/` (recommended structure: `backend/main.py`, `backend/requirements.txt`). Use these commands as a template for an optional API server used for sync or other cloud features.

1. Create and activate a virtual environment

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
```

2. Install requirements (example)

```bash
cd backend
pip install -r requirements.txt
# Example requirements: fastapi, uvicorn
```

3. Run the backend (development)

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

4. Example endpoints (suggested)

- `GET /health` — health check
- `POST /sync/items` — upload user items (opt-in)
- `GET /models/latest` — download signed model updates (if enabling cloud model updates)

Security & privacy note: Any cloud sync or backend usage should be opt-in and documented to users; store minimal personally identifiable data.

## Development notes

- The frontend uses `expo-sqlite` for local persistence; see `db/client.js` for schema creation.
- AI integration is stubbed under `services/ai/tagging.js`. Replace with on-device TFLite or ONNX inference when ready.
- To test flow end-to-end locally without a backend, use the frontend-only flows — adding items, running suggestions, and storing feedback are all local-first.

## Want to contribute?

1. Pick an issue or feature branch.
2. Run the frontend as above and open a pull request with a clear description and any migration steps.

---

If you want, I can also scaffold a minimal FastAPI backend (`backend/main.py`) and a `requirements.txt` template. Would you like that? 
