// Centralized frontend config for backend host.
// Use Expo Constants (manifest.extra.BACKEND_URL) if available, or environment var, else default.
let BACKEND_URL = 'http://127.0.0.1:8000';
try {
  // eslint-disable-next-line global-require
  const Constants = require('expo-constants');
  if (Constants && Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.BACKEND_URL) {
    BACKEND_URL = Constants.manifest.extra.BACKEND_URL;
  }
} catch (e) {
  // expo-constants not available (web or plain RN), fall through
}

if (typeof process !== 'undefined' && process.env && process.env.BACKEND_URL) {
  BACKEND_URL = process.env.BACKEND_URL;
}

export default BACKEND_URL;
