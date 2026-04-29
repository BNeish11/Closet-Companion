import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { initializeDatabase } from '../db/client';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        await initializeDatabase();
      } catch (e) {
        // ignore for now; surface later
        // console.warn('DB init failed', e);
      }
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
