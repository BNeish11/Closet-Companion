import React, { useEffect, useState } from 'react';

// DOM debug banner (unchanged)
try {
  if (typeof document !== 'undefined') {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      const existing = document.getElementById('cc-debug-banner');
      if (!existing) {
        const b = document.createElement('div');
        b.id = 'cc-debug-banner';
        b.style.cssText =
          'position:fixed;top:0;left:0;right:0;background:#fffae6;color:#333;padding:6px 8px;z-index:99999;font-family:sans-serif;border-bottom:1px solid #eee;text-align:center';
        b.innerText = 'DEBUG: bundle loaded — App module executing';
        rootEl.appendChild(b);
      }
    }
  }
} catch (e) {}

import { SafeAreaView, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font'; // ✅ ADD THIS
import Navigation from './navigation';
import { initializeDatabase } from '../db/client';
import colors from './styles/colors';

export default function App() {
  const [ready, setReady] = useState(false);

  console.log('App module loaded');

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // ✅ LOAD FONTS HERE
        await Font.loadAsync({
          Brasika: require('./assets/fonts/Brasika-Regular.ttf'),
          OpenSauce: require('./assets/fonts/OpenSauce-Light.ttf'),
        });

        // ✅ THEN INIT DB
        await initializeDatabase();
      } catch (e) {
        console.warn('Init error:', e);
      }

      console.log('App + Fonts + DB ready');

      if (mounted) setReady(true);
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // ⛔ Prevent render until fonts + DB loaded
  if (!ready) {
    return (
      <LinearGradient
        colors={[colors.backgroundTop, colors.backgroundBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <ActivityIndicator size="large" color={colors.accentPrimary} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.backgroundTop, colors.backgroundBottom]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBg}
    >
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBg: {
    flex: 1,
  },
});
