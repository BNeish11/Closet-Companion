import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function Button({ title, onPress, style, variant = 'primary' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary, style]}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textSecondary]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: { backgroundColor: colors.navy },
  secondary: { backgroundColor: colors.cardSoft },
  text: { fontWeight: '600' },
  textPrimary: { color: colors.textPrimary },
  textSecondary: { color: colors.textPrimary }
});
