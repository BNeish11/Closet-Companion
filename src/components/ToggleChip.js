import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function ToggleChip({ label, selected = false, onPress }) {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 10,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: pressed ? 0.85 : 1
        }
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.chip,
          selected ? styles.selected : styles.unselected
        ]}
        android_ripple={{ color: colors.accentSecondary, radius: 20 }}
      >
        <Text style={[typography.label, selected ? styles.textSelected : styles.text]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.padding.compact,
    paddingHorizontal: spacing.padding.medium,
    borderRadius: spacing.radius.full,
    marginRight: spacing.margin.small,
    borderWidth: 1.5
  },
  
  // UNSELECTED STATE
  unselected: {
    backgroundColor: 'transparent',
    borderColor: colors.accentSecondary
  },
  
  // SELECTED STATE (Green)
  selected: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: colors.toggleActive
  },
  
  // TEXT COLORS
  text: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500'
  },
  textSelected: {
    color: colors.toggleActive,
    fontWeight: '600'
  }
});
