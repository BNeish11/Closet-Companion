import * as storage from './storage';

// Core CRUD operations
export async function addItem(item) {
  return storage.addItem(item);
}

export async function getItems() {
  return storage.getItems();
}

export async function getItemById(id) {
  return storage.getItemById(id);
}

export async function updateItem(item) {
  return storage.updateItem(item);
}

export async function deleteItem(id) {
  return storage.deleteItem(id);
}

// Feature-specific queries
export async function getItemsByCategory(category) {
  const items = await storage.getItems();
  return items.filter(item => item.category === category);
}

export async function getCleanItems() {
  const items = await storage.getItems();
  return items.filter(item => item.laundry_status === 'clean');
}

export async function getDirtyItems() {
  const items = await storage.getItems();
  return items.filter(item => item.laundry_status === 'dirty');
}

export async function markItemAsWorn(id) {
  const item = await storage.getItemById(id);
  if (!item) return null;

  const updated = {
    ...item,
    wear_count: (item.wear_count || 0) + 1,
    last_worn_date: new Date().toISOString(),
    laundry_status: 'dirty'
  };

  return storage.updateItem(updated);
}

export async function getMostWornItems(limit = 5) {
  const items = await storage.getItems();
  return items
    .filter(item => item.wear_count > 0)
    .sort((a, b) => (b.wear_count || 0) - (a.wear_count || 0))
    .slice(0, limit);
}

export async function getLeastWornItems(limit = 5) {
  const items = await storage.getItems();
  return items
    .sort((a, b) => (a.wear_count || 0) - (b.wear_count || 0))
    .slice(0, limit);
}

export async function getUnusedItems() {
  const items = await storage.getItems();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return items.filter(item => {
    if (!item.last_worn_date) return true;
    return new Date(item.last_worn_date) < thirtyDaysAgo;
  });
}
