import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function ItemTile({ item, size = 'md' }) {
  const sizeMap = {
    sm: 80,
    md: 120,
    lg: 160
  };
  const imageSize = sizeMap[size];

  return (
    <View style={styles.container}>
      {item?.image_uri ? (
        <Image
          source={{ uri: item.image_uri }}
          style={[styles.img, { width: imageSize, height: imageSize }]}
        />
      ) : (
        <View style={[styles.placeholder, { width: imageSize, height: imageSize }]} />
      )}
      <Text numberOfLines={1} style={[typography.caption, styles.label]}>
        {item?.category || 'Item'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  img: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface
  },
  placeholder: {
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface
  },
  label: {
    color: colors.textSecondary,
    marginTop: spacing.margin.small
  }
});
