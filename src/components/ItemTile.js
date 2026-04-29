import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function ItemTile({ item }) {
  return (
    <View style={styles.container}>
      {item?.image_uri ? <Image source={{ uri: item.image_uri }} style={styles.img} /> : null}
      <Text numberOfLines={1} style={styles.label}>{item?.category || 'Item'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 100, margin: 8 },
  img: { width: 100, height: 100, borderRadius: 8, backgroundColor: colors.cardSoft },
  label: { color: colors.textSecondary, marginTop: 6, fontSize: 12 }
});
