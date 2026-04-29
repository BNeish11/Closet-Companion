import { Platform } from 'react-native';

// Robust import for expo-sqlite across SDKs/bundlers. Use dynamic require
// to avoid static build-time errors when bundler/export shape changes.
let SQLite = null;
// Only attempt to require native `expo-sqlite` on non-web platforms so the
// web bundler doesn't try to resolve the package's Web/WASM assets.
if (Platform && Platform.OS !== 'web') {
  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const mod = require('expo-sqlite');
  // mod may be the module namespace, or the default export, or the function itself
  if (mod && typeof mod.openDatabase === 'function') {
    SQLite = mod;
  } else if (mod && typeof mod.default === 'object' && typeof mod.default.openDatabase === 'function') {
    SQLite = mod.default;
  } else if (typeof mod === 'function') {
    // some packages export the function directly
    SQLite = { openDatabase: mod };
  } else {
    SQLite = null;
  }
  } catch (e) {
    SQLite = null; // expo-sqlite not available (native missing)
  }
} else {
  SQLite = null; // avoid importing expo-sqlite on web
}

const DB_NAME = 'closet.db';
let db = null;
if (SQLite && typeof SQLite.openDatabase === 'function') {
  try {
    db = SQLite.openDatabase(DB_NAME);
  } catch (e) {
    db = null;
  }
}

// Provide a helpful shim when running on web (or when sqlite isn't available)
const webShim = {
  transaction: () => {
    throw new Error('expo-sqlite not available on this platform. Use the web fallback implementation.');
  }
};

if (!db) db = webShim;

function executeSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, err) => reject(err),
        );
      },
      (err) => reject(err),
    );
  });
}

export async function initializeDatabase() {
  const stmts = [
    `CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      image_uri TEXT,
      category TEXT,
      subcategory TEXT,
      color TEXT,
      fabric TEXT,
      season TEXT,
      occasion_tags TEXT,
      comfort_rating INTEGER,
      wear_count INTEGER DEFAULT 0,
      last_worn_date TEXT,
      laundry_status TEXT,
      favorite_score REAL,
      created_at TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS outfits (
      id TEXT PRIMARY KEY,
      item_ids TEXT,
      weather_tag TEXT,
      occasion_tag TEXT,
      comfort_score REAL,
      user_feedback TEXT,
      created_at TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      outfit_id TEXT,
      tags TEXT,
      timestamp TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS laundry (
      item_id TEXT PRIMARY KEY,
      status TEXT,
      date_marked_dirty TEXT,
      date_cleaned TEXT
    );`,
  ];

  // If we're running on web (shim), return false to indicate DB not initialized.
  if (!db || db === webShim) return false;

  for (const s of stmts) {
    // eslint-disable-next-line no-await-in-loop
    // If executeSql rejects, let it bubble up so caller can handle migration errors.
    // eslint-disable-next-line no-await-in-loop
    await executeSql(s);
  }

  return true;
}

export { executeSql };
export default db;
