import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getItems, getCleanItems, getDirtyItems } from '../../db/items';
import { useStore } from '../store';
import Grid from '../components/Grid';
import ItemTile from '../components/ItemTile';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function Dashboard({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [closetPreview, setClosetPreview] = useState([]);
  const [cleanCount, setCleanCount] = useState(0);
  const [dirtyCount, setDirtyCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { items, setItems } = useStore();

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const itemsData = await getItems();
      setItems(itemsData || []);
      setTotalItems((itemsData || []).length);

      const clean = await getCleanItems();
      const dirty = await getDirtyItems();

      setCleanCount(clean.length);
      setDirtyCount(dirty.length);

      // Show first 6 items as preview
      setClosetPreview((itemsData || []).slice(0, 6));
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Closet')}>
      <ItemTile item={item} size="sm" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={typography.heading1}>Closet Companion</Text>
        </View>

        {/* Quick Stats */}
        <Card variant="spacious" style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{totalItems}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: colors.success }]}>{cleanCount}</Text>
              <Text style={styles.statLabel}>Clean</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: colors.warning }]}>{dirtyCount}</Text>
              <Text style={styles.statLabel}>Dirty</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="+ Add Item"
            onPress={() => navigation.navigate('AddItem')}
            variant="primary"
            style={{ flex: 1 }}
          />
          <Button
            title="View Suggestions"
            onPress={() => navigation.navigate('Suggestions')}
            variant="secondary"
            style={{ flex: 1, marginLeft: spacing.margin.medium }}
          />
        </View>

        {/* Closet Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={typography.heading3}>Recent Items</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Closet')}>
              <Text style={[typography.body, { color: colors.accentAction }]}>View All →</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accentAction} />
            </View>
          ) : closetPreview.length === 0 ? (
            <Card variant="default">
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                No items yet. Add your first item to get started!
              </Text>
              <Button
                title="Add Item"
                onPress={() => navigation.navigate('AddItem')}
                variant="primary"
                style={{ marginTop: spacing.margin.medium }}
              />
            </Card>
          ) : (
            <Grid
              data={closetPreview}
              renderItem={renderItem}
              numColumns={3}
              keyExtractor={(item) => item.id}
              gap="md"
            />
          )}
        </View>

        {/* Features Preview */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Features</Text>
          <View style={styles.featureGrid}>
            <Card variant="compact" style={styles.featureCard}>
              <Text style={typography.label}>📊 Insights</Text>
              <Text style={[typography.caption, { marginTop: spacing.margin.small }]}>
                Track wear patterns
              </Text>
            </Card>
            <Card variant="compact" style={styles.featureCard}>
              <Text style={typography.label}>🎯 Suggestions</Text>
              <Text style={[typography.caption, { marginTop: spacing.margin.small }]}>
                Get outfit ideas
              </Text>
            </Card>
            <Card variant="compact" style={styles.featureCard}>
              <Text style={typography.label}>🛍️ Shopping</Text>
              <Text style={[typography.caption, { marginTop: spacing.margin.small }]}>
                Smart recommendations
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: spacing.padding.large
  },
  statsCard: {
    marginHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  stat: {
    alignItems: 'center',
    flex: 1
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accentAction
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: spacing.margin.xs,
    fontSize: 12
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.divider
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  section: {
    paddingHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.margin.medium
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureGrid: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    marginTop: spacing.margin.medium
  },
  featureCard: {
    flex: 1,
    padding: spacing.padding.medium
  }
});
