import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function Button({ title, onPress, style, variant = 'primary', disabled = false }) {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const shadowAnim = React.useRef(new Animated.Value(4)).current;

  const handlePressIn = () => {
    setPressed(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shadowAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true
      }),
      Animated.timing(shadowAnim, {
        toValue: 4,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          shadowOpacity: shadowAnim.interpolate({
            inputRange: [2, 4],
            outputRange: [0.15, 0.3]
          })
        }
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.button,
          styles[variant],
          style
        ]}
        activeOpacity={1}
      >
        {variant === 'primary' ? (
          <View style={styles.gradientButton}>
            <Text style={[typography.button, styles.primaryText]}>{title}</Text>
          </View>
        ) : (
          <Text style={[typography.button, styles[`${variant}Text`]]}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.padding.medium,
    paddingHorizontal: spacing.padding.large,
    borderRadius: spacing.radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48
  },
  
  // PRIMARY BUTTON (Gradient Yellow)
  primary: {
    backgroundColor: colors.accentPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },
  
  gradientButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // SECONDARY BUTTON
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },

  // OUTLINE BUTTON
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accentSecondary,
    shadowColor: 'transparent'
  },



  // TEXT COLORS
  primaryText: {
    color: colors.textOnAccent,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  secondaryText: {
    color: colors.textPrimary
  },
  outlineText: {
    color: colors.accentSecondary
  }
});
