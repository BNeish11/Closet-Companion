import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

export default function Grid({ data, renderItem, numColumns = 3, keyExtractor }) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 8 },
  row: { justifyContent: 'space-between' }
});
