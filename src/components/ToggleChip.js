import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function ToggleChip({ label, selected = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected ? styles.selected : styles.unselected]}>
      <Text style={[styles.text, selected ? styles.textSelected : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
    marginRight: spacing.sm
  },
  selected: { backgroundColor: colors.primary },
  unselected: { backgroundColor: '#eee' },
  text: { color: '#111' },
  textSelected: { color: '#fff' }
});
