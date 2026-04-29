import React, { useEffect, useState } from 'react';

// Immediate DOM debug banner to show bundle execution before React mounts (web only)
try {
  if (typeof document !== 'undefined') {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      const existing = document.getElementById('cc-debug-banner');
      if (!existing) {
        const b = document.createElement('div');
        b.id = 'cc-debug-banner';
        b.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#fffae6;color:#333;padding:6px 8px;z-index:99999;font-family:sans-serif;border-bottom:1px solid #eee;text-align:center';
        b.innerText = 'DEBUG: bundle loaded — App module executing';
        rootEl.appendChild(b);
      }
    }
  }
} catch (e) {
  // ignore DOM errors
}
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { initializeDatabase } from '../db/client';

export default function App() {
  const [ready, setReady] = useState(false);

  console.log('App module loaded');
  try {
    // Ensure a visible browser console message for web (some RN consoles route to terminal)
    // eslint-disable-next-line no-undef
    if (typeof window !== 'undefined' && window && window.console) window.console.log('App module loaded (window)');
  } catch (e) {}

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        await initializeDatabase();
      } catch (e) {
        // ignore for now; surface later
        // console.warn('DB init failed', e);
      }
      console.log('DB init finished');
      try {
        if (typeof window !== 'undefined' && window && window.console) window.console.log('DB init finished (window)');
      } catch (e) {}
      if (mounted) setReady(true);
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
