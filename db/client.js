import * as SQLite from 'expo-sqlite';

const DB_NAME = 'closet.db';
const db = SQLite.openDatabase(DB_NAME);

function executeSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      },
      err => reject(err)
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
    );`
  ];

  for (const s of stmts) {
    // eslint-disable-next-line no-await-in-loop
    await executeSql(s);
  }

  return true;
}

export { executeSql };

export default db;
