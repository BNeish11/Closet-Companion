import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getItems, getItemsByCategory } from '../../db/items';
import { useStore } from '../store';
import Grid from '../components/Grid';
import ItemTile from '../components/ItemTile';
import Button from '../components/Button';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Shoes', 'Jackets', 'Accessories'];

export default function Closet({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const { items, setItems, selectedCategory, setSelectedCategory } = useStore();

  // Load items when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    setLoading(true);
    try {
      const itemsData = await getItems();
      setItems(itemsData || []);
      filterItems(selectedCategory, itemsData || []);
    } catch (err) {
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (category, itemsList) => {
    if (category === 'All' || !category) {
      setFilteredItems(itemsList);
    } else {
      setFilteredItems(itemsList.filter(item => item.category === category));
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterItems(category, items);
  };

  const handleItemPress = (item) => {
    navigation.navigate('ItemDetail', { item });
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive
      ]}
      onPress={() => handleCategorySelect(category)}
    >
      <Text
        style={[
          typography.label,
          selectedCategory === category ? styles.categoryLabelActive : styles.categoryLabel
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <ItemTile item={item} size="md" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.heading2}>My Closet</Text>
        <Button
          title="+ Add Item"
          onPress={() => navigation.navigate('AddItem')}
          variant="primary"
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => renderCategoryButton(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        />
      </View>

      {/* Items Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accentAction} />
        </View>
      ) : filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[typography.body, styles.emptyText]}>
            No items in {selectedCategory || 'closet'}
          </Text>
          <Button
            title="Add your first item"
            onPress={() => navigation.navigate('AddItem')}
            variant="primary"
            style={{ marginTop: spacing.margin.large }}
          />
        </View>
      ) : (
        <Grid
          data={filteredItems}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item) => item.id}
          gap="md"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  header: {
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    paddingVertical: spacing.padding.small
  },
  filterContent: {
    paddingHorizontal: spacing.container.default,
    gap: spacing.gap.sm
  },
  categoryButton: {
    paddingVertical: spacing.padding.compact,
    paddingHorizontal: spacing.padding.medium,
    borderRadius: spacing.radius.full,
    backgroundColor: colors.surfaceDark,
    borderWidth: 1,
    borderColor: colors.divider
  },
  categoryButtonActive: {
    backgroundColor: colors.accentAction,
    borderColor: colors.accentAction
  },
  categoryLabel: {
    color: colors.textSecondary
  },
  categoryLabelActive: {
    color: colors.textOnAccent
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.container.default
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center'
  }
});
