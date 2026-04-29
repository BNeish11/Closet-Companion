import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import spacing from '../styles/spacing';

export default function Grid({ data, renderItem, numColumns = 3, keyExtractor, gap = 'md' }) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={[styles.row, { gap: spacing.gap[gap] }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.container.default
  },
  row: {
    justifyContent: 'space-between'
  }
});
