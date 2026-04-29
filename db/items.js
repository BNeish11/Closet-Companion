import * as storage from './storage';

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
