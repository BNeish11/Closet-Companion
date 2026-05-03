import React, { useEffect, useState } from 'react';

// Debug banner (unchanged)
try {
  if (typeof document !== 'undefined') {
    const rootEl = document.getElementById('root');
    if (rootEl && !document.getElementById('cc-debug-banner')) {
      const b = document.createElement('div');
      b.id = 'cc-debug-banner';
      b.style.cssText =
        'position:fixed;top:0;left:0;right:0;background:#fffae6;color:#333;padding:6px 8px;z-index:99999;font-family:sans-serif;border-bottom:1px solid #eee;text-align:center';
      b.innerText = 'DEBUG: bundle loaded — App module executing';
      rootEl.appendChild(b);
    }
  }
} catch (e) {}

import { ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { initializeDatabase } from '../db/client';
import colors from './styles/colors';

// ✅ GOOGLE FONTS (NO TTF FILES)
import {
  useFonts,
  BodoniModa_400Regular,
  BodoniModa_700Bold,
} from '@expo-google-fonts/bodoni-moda';

import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function App() {
  const [ready, setReady] = useState(false);

  // ✅ Load fonts safely
  const [fontsLoaded] = useFonts({
    BodoniModa_400Regular,
    BodoniModa_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // ✅ Only initialize DB (fonts handled separately)
        await initializeDatabase();
      } catch (e) {
        console.warn('Init error:', e);
      }

      if (mounted) setReady(true);
      console.log('App ready');
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Graceful fallback:
  // App loads EVEN IF fonts fail
  const isAppReady = ready;

  if (!isAppReady) {
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