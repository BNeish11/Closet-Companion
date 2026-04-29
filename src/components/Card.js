import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import shadows from '../styles/shadows';

export default function Card({ children, style }) {
  return <View style={[styles.card, shadows.low, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 8, backgroundColor: colors.cardBg }
});
