-- SQLite schema for Closet Companion
CREATE TABLE IF NOT EXISTS items (
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
);

CREATE TABLE IF NOT EXISTS outfits (
  id TEXT PRIMARY KEY,
  item_ids TEXT,
  weather_tag TEXT,
  occasion_tag TEXT,
  comfort_score REAL,
  user_feedback TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  outfit_id TEXT,
  tags TEXT,
  timestamp TEXT
);

CREATE TABLE IF NOT EXISTS laundry (
  item_id TEXT PRIMARY KEY,
  status TEXT,
  date_marked_dirty TEXT,
  date_cleaned TEXT
);
