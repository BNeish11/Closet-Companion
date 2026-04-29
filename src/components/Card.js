import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import shadows from '../styles/shadows';
import spacing from '../styles/spacing';

export default function Card({ children, style, variant = 'default' }) {
  return <View style={[styles.card, styles[variant], shadows.small, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface
  },
  default: {
    padding: spacing.padding.medium
  },
  compact: {
    padding: spacing.padding.small
  },
  spacious: {
    padding: spacing.padding.large
  }
});
