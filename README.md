# Closet Companion

Closet Companion is a mobile-first, offline-first prototype for an on-device AI wardrobe assistant. It helps users catalog clothing, receive outfit suggestions, track wear and laundry, and discover shopping gaps — prioritizing privacy by running inference locally.

Quick Startup — run these steps in order (backend → frontend)

1) Open a terminal and clone / change into the repo root

```powershell
cd C:\Users\Bella\GitHub\Closet-Companion
```

2) Start the optional Python backend (recommended if you want sync or cloud features)

Windows PowerShell (recommended):

```powershell
# create and activate a virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# install backend deps
pip install -r backend/requirements.txt

# start the backend (development)
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

macOS / Linux:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Verify the backend is running by visiting:

- http://127.0.0.1:8000/health
- http://127.0.0.1:8000/docs

If you need the backend reachable from other devices on your network, start with `--host 0.0.0.0` and use your machine IP (ensure firewall allows port 8000):

```powershell
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Configuring the frontend backend host
 - The frontend reads the backend host from `src/config.js`. By default it uses `http://127.0.0.1:8000`.
 - For Expo, set `expo.extra.BACKEND_URL` in `app.json` or `app.config.js` to point to `http://<YOUR_PC_IP>:8000` for device testing.
 - Example `app.json` addition:

```json
{
	"expo": {
		"extra": {
			"BACKEND_URL": "http://192.168.0.139:8000"
		}
	}
}
```

 - Alternatively set the environment variable `BACKEND_URL` when running web or Metro.

3) Start the Expo React Native frontend

```powershell
# install frontend deps (run once)
npm install

# start Expo dev server
npx expo start
# or
npm start
```

Open the app:
- Scan the QR code with the Expo Go app on your phone, or
- Press `a` in the terminal to open Android emulator, or
- Press `i` (macOS) to open iOS simulator.

Notes:
- The frontend will initialize a local SQLite DB automatically on first run (`db/client.js`).
- The frontend can run without the backend for local-first flows; skip step 2 if you only want to test offline features.

Troubleshooting (common beginner issues)

- "npm not recognized": you must install Node.js (which includes npm) and then close and re-open PowerShell so the PATH updates. Recommended install methods:
	- Official installer: https://nodejs.org/en/download (LTS)
	- Winget (CLI): `winget install OpenJS.NodeJS.LTS`
	After install, verify:
	```powershell
	node -v
	npm -v
	```

- If `npx expo start` prompts to install Expo CLI, allow it — `npx` runs the tool without a global install.

- Keep backend and frontend in separate terminals:
	1. Terminal A: activate Python `.venv` (if using backend) and run `uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000`.
	2. Terminal B: run `npm install` then `npx expo start` for the frontend.

- PowerShell & virtualenv: when activating `.venv` on Windows you may need to set execution policy for the session:
	```powershell
	Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
	.venv\Scripts\Activate.ps1
	```

- If you still see errors, copy the exact terminal output and paste it here and I will help diagnose.

This repository contains an Expo React Native frontend and a lightweight Python backend API (optional). The frontend is the primary product; the backend is intended for optional cloud features (sync, backups, model distribution) and local dev-testing.

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

### Step 1: Install dependencies

```bash
cd Closet-Companion
npm install
# or: yarn install
```

### Step 2: Start the Expo dev server

```bash
npm start
# or: expo start
```

You should see a QR code in the terminal.

### Step 3: Run on a device or emulator

**Option A: Use Expo Go app (recommended for quick testing)**
- Install the "Expo Go" app on your phone (iOS App Store or Google Play)
- Scan the QR code displayed in the terminal with your phone's camera
- The app will load in Expo Go

**Option B: Use an emulator**
- For iOS simulator (macOS): press `i` in terminal, or `npm run ios`
- For Android emulator or device: press `a` in terminal, or `npm run android`

Notes:
- The app initializes a local SQLite database (`db/client.js`) on first run. No manual DB setup required for the frontend.
- The app is fully functional offline; the backend is optional.

## App Walkthrough — How to use Closet Companion

Once the app launches, you'll see a **bottom navigation bar with 5 tabs**. Here's what each screen does:

### 🏠 **Home (Dashboard)**
The hub of the app showing:
- **Quick stats**: Total items, items worn recently, laundry status
- **Add Item button** (+): Tap to add a new clothing item
  - Take or upload a photo
  - Add details: name, category (tops, bottoms, outerwear, etc.), color, size, brand
  - Optionally tag with AI (on-device classification)
  - Save to your closet

### 👚 **Closet**
Your wardrobe catalog:
- **Browse all items**: Tap any item to view details, edit, or mark as dirty/clean
- **Add more items**: Tap the + button to add new pieces
- **Item detail view**: See full info, wear history, and laundry status
- Grid view shows:
  - Item photo
  - Name and category
  - Wear count (how many times worn)
  - Laundry status (clean/dirty indicator)

### ✨ **Suggestions**
AI-powered outfit recommendations:
- **Get suggestions**: App suggests outfit combinations based on your items
- **Compare options**: A/B view lets you choose between different outfit pairings
- **Feedback**: Rate suggestions as helpful or not to improve future recommendations
- **Smart rules**: Considers item types (e.g., suggests bottoms with tops automatically)

### 📊 **Insights**
Analytics and wardrobe health:
- **Wear frequency**: See which items you wear most (and which are gathering dust)
- **Underused items**: Identify pieces worn less than 3 times
- **Laundry status**: Overview of clean vs dirty items
- **Donation suggestions**: App suggests items that might be good to donate based on wear patterns
- **Color & category breakdown**: Visual charts of your wardrobe composition

### 🛍️ **Shopping**
Shopping assistant and gap detection:
- **Gaps**: App identifies missing item categories or color combinations in your wardrobe
- **Compatibility checks**: See which new items would pair well with existing pieces
- **Shopping list**: Plan purchases based on suggestions

---

## Typical user flows:

**First Time:**
1. Launch app (creates local database)
2. Go to **Home** → tap **+ Add Item**
3. Add 3–5 clothing items to build your closet

**Next Session:**
1. Check **Home** for quick stats
2. Go to **Closet** to review items or add more
3. Go to **Suggestions** to get an outfit recommendation
4. Go to **Insights** to see which items you're wearing most

**When laundry day arrives:**
1. Go to **Closet**
2. Tap on a dirty item and mark it "clean" (or vice versa)
3. Return to **Home** to see updated clean/dirty count

---

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
