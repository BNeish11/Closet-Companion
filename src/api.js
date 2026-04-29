import BACKEND_URL from './config';

export function apiUrl(path) {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${BACKEND_URL}${path}`;
}

export async function fetchJson(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`API error ${res.status} ${res.statusText}: ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export default { apiUrl, fetchJson };
