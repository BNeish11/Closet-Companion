import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function Button({ title, onPress, style, variant = 'primary' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles[variant], style]}
      activeOpacity={0.7}
    >
      <Text style={[typography.button, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.padding.small,
    paddingHorizontal: spacing.padding.medium,
    borderRadius: spacing.radius.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: colors.accentAction
  },
  secondary: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.divider
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accentAction
  },
  primaryText: {
    color: colors.textOnAccent
  },
  secondaryText: {
    color: colors.textPrimary
  },
  outlineText: {
    color: colors.accentAction
  }
});
