import React, { useState } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function Card({ children, style, variant = 'default', onPress, interactive = false }) {
  const elevationAnim = React.useRef(new Animated.Value(variant === 'default' ? 6 : 2)).current;

  const handlePressIn = () => {
    if (interactive) {
      Animated.timing(elevationAnim, {
        toValue: (variant === 'default' ? 6 : 2) + 4,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      Animated.timing(elevationAnim, {
        toValue: variant === 'default' ? 6 : 2,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  };

  const CardWrapper = interactive ? Pressable : View;
  const animatedStyle = interactive ? {
    elevation: elevationAnim,
    shadowOpacity: elevationAnim.interpolate({
      inputRange: [2, 10],
      outputRange: [0.15, 0.35]
    })
  } : {};

  return (
    <CardWrapper
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        styles[variant],
        interactive && { overflow: 'hidden' },
        animatedStyle,
        style
      ]}
    >
      {children}
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: spacing.margin.medium,
    overflow: 'hidden'
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
