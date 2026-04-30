import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function ItemTile({ item, size = 'md', onPress }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 1.08,
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

  const sizeMap = {
    sm: 80,
    md: 120,
    lg: 160
  };
  const imageSize = sizeMap[size];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: pressed ? 0.85 : 1
        }
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {item?.image_uri ? (
          <Image
            source={{ uri: item.image_uri }}
            style={[styles.img, { width: imageSize, height: imageSize }]}
          />
        ) : (
          <View style={[styles.placeholder, { width: imageSize, height: imageSize }]} />
        )}
      </TouchableOpacity>
      <Text numberOfLines={1} style={[typography.caption, styles.label]}>
        {item?.category || 'Item'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.margin.medium
  },
  img: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden'
  },
  placeholder: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },
  label: {
    color: colors.textSecondary,
    marginTop: spacing.margin.small,
    fontSize: 12,
    fontWeight: '500'
  }
});
