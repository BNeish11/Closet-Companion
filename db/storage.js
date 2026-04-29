/*
  db/storage.js
  Provides a unified storage API for items used by the frontend.
  - If native SQLite is available (via ./client's executeSql), use SQL path.
  - Otherwise fall back to localForage (IndexedDB) for web.
*/
import { Platform } from 'react-native';
import localforage from 'localforage';
import db, { executeSql } from './client';

const LF_KEY = 'closet:items:v1';

async function sqlAddItem(item) {
  const sql = `INSERT INTO items (id, image_uri, category, subcategory, color, fabric, season, occasion_tags, comfort_rating, wear_count, last_worn_date, laundry_status, favorite_score, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    item.id,
    item.image_uri || null,
    item.category || null,
    item.subcategory || null,
    item.color || null,
    item.fabric || null,
    item.season || null,
    item.occasion_tags ? JSON.stringify(item.occasion_tags) : null,
    item.comfort_rating || null,
    item.wear_count || 0,
    item.last_worn_date || null,
    item.laundry_status || 'clean',
    item.favorite_score || null,
    item.created_at || new Date().toISOString(),
  ];
  return executeSql(sql, params);
}

async function sqlGetItems() {
  const res = await executeSql('SELECT * FROM items ORDER BY created_at DESC');
  const rows = [];
  for (let i = 0; i < res.rows.length; i += 1) rows.push(res.rows.item(i));
  return rows.map((r) => ({ ...r, occasion_tags: r.occasion_tags ? JSON.parse(r.occasion_tags) : [] }));
}

async function sqlGetItemById(id) {
  const res = await executeSql('SELECT * FROM items WHERE id = ? LIMIT 1', [id]);
  if (res.rows.length === 0) return null;
  const r = res.rows.item(0);
  return { ...r, occasion_tags: r.occasion_tags ? JSON.parse(r.occasion_tags) : [] };
}

async function sqlUpdateItem(item) {
  const sql = `UPDATE items SET image_uri = ?, category = ?, subcategory = ?, color = ?, fabric = ?, season = ?, occasion_tags = ?, comfort_rating = ?, wear_count = ?, last_worn_date = ?, laundry_status = ?, favorite_score = ? WHERE id = ?`;
  const params = [
    item.image_uri || null,
    item.category || null,
    item.subcategory || null,
    item.color || null,
    item.fabric || null,
    item.season || null,
    item.occasion_tags ? JSON.stringify(item.occasion_tags) : null,
    item.comfort_rating || null,
    item.wear_count || 0,
    item.last_worn_date || null,
    item.laundry_status || 'clean',
    item.favorite_score || null,
    item.id,
  ];
  return executeSql(sql, params);
}

async function sqlDeleteItem(id) {
  return executeSql('DELETE FROM items WHERE id = ?', [id]);
}

// localforage helpers
async function lfGetAll() {
  const arr = (await localforage.getItem(LF_KEY)) || [];
  // ensure newest first by created_at
  return arr.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}

async function lfAddItem(item) {
  const arr = (await localforage.getItem(LF_KEY)) || [];
  arr.unshift(item);
  await localforage.setItem(LF_KEY, arr);
  return item;
}

async function lfGetItemById(id) {
  const arr = (await localforage.getItem(LF_KEY)) || [];
  return arr.find((x) => x.id === id) || null;
}

async function lfUpdateItem(item) {
  const arr = (await localforage.getItem(LF_KEY)) || [];
  const idx = arr.findIndex((x) => x.id === item.id);
  if (idx === -1) throw new Error('Item not found');
  arr[idx] = { ...arr[idx], ...item };
  await localforage.setItem(LF_KEY, arr);
  return arr[idx];
}

async function lfDeleteItem(id) {
  const arr = (await localforage.getItem(LF_KEY)) || [];
  const next = arr.filter((x) => x.id !== id);
  await localforage.setItem(LF_KEY, next);
  return true;
}

// Detection: prefer SQL if executeSql works; otherwise use localforage
async function usesSql() {
  if (!executeSql) return false;
  try {
    // quick check: attempt a harmless query that won't fail if table missing
    await executeSql('SELECT 1', []);
    return true;
  } catch (e) {
    return false;
  }
}

export async function addItem(item) {
  if (await usesSql()) return sqlAddItem(item);
  return lfAddItem(item);
}

export async function getItems() {
  if (await usesSql()) return sqlGetItems();
  return lfGetAll();
}

export async function getItemById(id) {
  if (await usesSql()) return sqlGetItemById(id);
  return lfGetItemById(id);
}

export async function updateItem(item) {
  if (await usesSql()) return sqlUpdateItem(item);
  return lfUpdateItem(item);
}

export async function deleteItem(id) {
  if (await usesSql()) return sqlDeleteItem(id);
  return lfDeleteItem(id);
}

export default {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
