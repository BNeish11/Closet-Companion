import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { fetchJson } from '../api';
import { useStore } from '../store';
import { Card, Button, Grid, ItemTile } from '../components';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

// API Functions
async function getItems() {
  try {
    return await fetchJson('/items');
  } catch (err) {
    console.error('Error fetching items:', err);
    return [];
  }
}

async function getCleanItems() {
  try {
    return await fetchJson('/items?status=clean');
  } catch (err) {
    console.error('Error fetching clean items:', err);
    return [];
  }
}

async function getDirtyItems() {
  try {
    return await fetchJson('/items?status=dirty');
  } catch (err) {
    console.error('Error fetching dirty items:', err);
    return [];
  }
}

export default function Dashboard({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [closetPreview, setClosetPreview] = useState([]);
  const [cleanCount, setCleanCount] = useState(0);
  const [dirtyCount, setDirtyCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [weather, setWeather] = useState(null);

  const { items, setItems } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadData();
      loadWeather();
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

      setClosetPreview((itemsData || []).slice(0, 6));
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async () => {
    try {
      setWeather({
        temp: 68,
        condition: 'Partly Cloudy',
        high: 75,
        low: 55
      });
    } catch (e) {
      console.error('Weather error', e);
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

        {/* Weather Card */}
        <View style={styles.section}>
          <Card variant="spacious" style={styles.statsCard}>
            {weather ? (
              <View>
                <Text style={typography.heading3}>{weather.temp}°</Text>
                <Text style={typography.body}>{weather.condition}</Text>
                <Text style={[typography.caption, { marginTop: spacing.margin.small }]}>
                  High {weather.high}° • Low {weather.low}°
                </Text>
              </View>
            ) : (
              <ActivityIndicator color={colors.accentSecondary} />
            )}
          </Card>
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

        {/* Camera Card */}
        <View style={styles.section}>
          <Card variant="spacious" style={styles.statsCard}>
            <Text style={typography.heading3}>Add with Camera</Text>
            <Text style={[typography.caption, { marginTop: spacing.margin.small }]}>
              Capture clothing and auto-tag items
            </Text>

            <Button
              title="Open Camera"
              onPress={() => navigation.navigate('Camera')}
              variant="primary"
              style={{ marginTop: spacing.margin.medium }}
            />
          </Card>
        </View>

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
              <Text style={[typography.body, { color: colors.accentSecondary }]}>
                View All →
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accentSecondary} />
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

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.container.default
  },
  header: {
    paddingVertical: spacing.margin.large,
    paddingHorizontal: spacing.padding.small
  },
  section: {
    marginBottom: spacing.margin.large
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.margin.medium,
    paddingHorizontal: spacing.padding.small
  },
  statsCard: {
    marginBottom: spacing.margin.medium
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.margin.small
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'Montserrat_400Regular'
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.divider
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    marginBottom: spacing.margin.large,
    paddingHorizontal: spacing.padding.small
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.padding.large
  }
});