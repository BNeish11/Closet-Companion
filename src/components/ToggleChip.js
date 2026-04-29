import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function ToggleChip({ label, selected = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected ? styles.selected : styles.unselected]}
      android_ripple={{ color: colors.accentAction, radius: 20 }}
    >
      <Text style={[typography.label, selected ? styles.textSelected : styles.text]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.padding.compact,
    paddingHorizontal: spacing.padding.small,
    borderRadius: spacing.radius.full,
    marginRight: spacing.margin.small
  },
  selected: {
    backgroundColor: colors.accentAction
  },
  unselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider
  },
  text: {
    color: colors.textSecondary
  },
  textSelected: {
    color: colors.textOnAccent
  }
});
