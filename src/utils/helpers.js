/**
 * Helper functions for the app
 */

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(dateString) {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getDaysAgo(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}
