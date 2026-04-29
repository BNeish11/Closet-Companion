import { executeSql } from './client';

export async function addItem(item) {
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
    item.created_at || new Date().toISOString()
  ];

  return executeSql(sql, params);
}

export async function getItems() {
  const res = await executeSql('SELECT * FROM items ORDER BY created_at DESC');
  const rows = [];
  for (let i = 0; i < res.rows.length; i += 1) rows.push(res.rows.item(i));
  // parse occasion_tags
  return rows.map(r => ({ ...r, occasion_tags: r.occasion_tags ? JSON.parse(r.occasion_tags) : [] }));
}

export async function getItemById(id) {
  const res = await executeSql('SELECT * FROM items WHERE id = ? LIMIT 1', [id]);
  if (res.rows.length === 0) return null;
  const r = res.rows.item(0);
  return { ...r, occasion_tags: r.occasion_tags ? JSON.parse(r.occasion_tags) : [] };
}

export async function updateItem(item) {
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
    item.id
  ];
  return executeSql(sql, params);
}

export async function deleteItem(id) {
  return executeSql('DELETE FROM items WHERE id = ?', [id]);
}
