import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMostWornItems, getUnusedItems, getItems, deleteItem } from '../../db/items';
import { useStore } from '../store';
import Card from '../components/Card';
import Button from '../components/Button';
import ItemTile from '../components/ItemTile';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

const { width } = Dimensions.get('window');

const achievements = [
  { id: 1, title: 'Frequent Wearer', icon: '👕', unlocked: true, requirement: '50+ wears' },
  { id: 2, title: 'Adventurous', icon: '✨', unlocked: true, requirement: '10+ unique outfits' },
  { id: 3, title: 'Laundry Champion', icon: '🧺', unlocked: false, requirement: '100+ washes' },
  { id: 4, title: 'Sustainability Star', icon: '♻️', unlocked: false, requirement: '5+ items donated' }
];

export default function Insights() {
  const [loading, setLoading] = useState(false);
  const [wearData, setWearData] = useState([]);
  const [mostWornItems, setMostWornItems] = useState([]);
  const [unusedItems, setUnusedItems] = useState([]);
  const [donateIndex, setDonateIndex] = useState(0);
  const [donatedItems, setDonatedItems] = useState([]);
  const { removeItem } = useStore();

  useFocusEffect(
    React.useCallback(() => {
      loadAnalytics();
    }, [])
  );

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const items = await getItems();
      const mostWorn = await getMostWornItems(5);
      const unused = await getUnusedItems();

      setMostWornItems(mostWorn);
      setUnusedItems(unused);

      // Build wear data for last 7 days
      const wearByDay = buildWearData(items);
      setWearData(wearByDay);
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const buildWearData = (items) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const wearCounts = {};

    days.forEach((_, idx) => {
      wearCounts[idx] = 0;
    });

    items.forEach(item => {
      if (item.last_worn_date) {
        const lastWorn = new Date(item.last_worn_date);
        const dayDiff = Math.floor((today - lastWorn) / (1000 * 60 * 60 * 24));
        if (dayDiff >= 0 && dayDiff < 7) {
          const dayIdx = (6 - dayDiff) % 7;
          wearCounts[dayIdx] += 1;
        }
      }
    });

    return days.map((day, idx) => ({ day, count: wearCounts[idx] }));
  };

  const maxWear = Math.max(...wearData.map(d => d.count));

  const handleDonate = async (item) => {
    try {
      await deleteItem(item.id);
      removeItem(item.id);
      setDonatedItems([...donatedItems, item.id]);
      alert(`${item.color} ${item.category} donated! ♻️`);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to donate item');
    }
  };

  const handleKeep = () => {
    setDonateIndex(donateIndex + 1);
  };

  const currentDonateItem = unusedItems[donateIndex];

  const renderWearChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {wearData.map((day, idx) => {
          const height = (day.count / maxWear) * 80;
          return (
            <View key={idx} style={styles.barColumn}>
              <View
                style={[
                  styles.bar,
                  { height: height, backgroundColor: colors.accentAction }
                ]}
              />
              <Text style={[typography.caption, styles.dayLabel]}>{day.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderMostWorn = ({ item }) => (
    <Card variant="compact" style={styles.itemCard}>
      <View style={styles.itemContent}>
        <ItemTile item={item} size="sm" />
        <View style={styles.itemStats}>
          <Text style={[typography.label, { fontSize: 10 }]}>{item.color}</Text>
          <Text style={[typography.bodySmall, { color: colors.accentAction, marginTop: 4 }]}>
            {item.wearCount} wears
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderAchievement = ({ item }) => (
    <View style={[styles.achievement, !item.unlocked && styles.achievementLocked]}>
      <Text style={styles.achievementIcon}>{item.icon}</Text>
      <Text style={[typography.label, { fontSize: 10, marginTop: spacing.margin.xs }]}>
        {item.title}
      </Text>
      <Text style={[typography.caption, { fontSize: 8, color: colors.textMuted }]}>
        {item.requirement}
      </Text>
      {!item.unlocked && (
        <View style={styles.lockBadge}>
          <Text style={{ fontSize: 8 }}>🔒</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accentAction} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={typography.heading2}>Insights</Text>
        </View>

        {/* Wear Tracking */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Weekly Wear Pattern</Text>
          <Card variant="spacious" style={{ marginTop: spacing.margin.medium }}>
            {renderWearChart()}
            <Text style={[typography.bodySmall, { textAlign: 'center', marginTop: spacing.margin.medium, color: colors.textSecondary }]}>
              You've worn {wearData.reduce((a, b) => a + b.count, 0)} items this week
            </Text>
          </Card>
        </View>

        {/* Most Worn Items */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Your Favorites</Text>
          <FlatList
            data={mostWornItems}
            renderItem={renderMostWorn}
            keyExtractor={(item) => item.id}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Unused Items - Swipe to Donate */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Unused Items</Text>
          <Card variant="spacious" style={styles.swipeCard}>
            {donateIndex < unusedItems.length ? (
              <>
                <View style={styles.swipeContent}>
                  <ItemTile item={currentDonateItem} size="lg" />
                  <Text style={[typography.body, { marginTop: spacing.margin.large }]}>
                    {currentDonateItem.color} {currentDonateItem.category}
                  </Text>
                  <Text style={[typography.bodySmall, { color: colors.warning, marginTop: spacing.margin.small }]}>
                    Not worn in {currentDonateItem.daysUnused} days
                  </Text>
                </View>
                <View style={styles.swipeActions}>
                  <Button
                    title="← Keep"
                    onPress={handleKeep}
                    variant="secondary"
                    style={{ flex: 1 }}
                  />
                  <Button
                    title="Donate →"
                    onPress={() => handleDonate(currentDonateItem)}
                    variant="primary"
                    style={{ flex: 1, marginLeft: spacing.margin.medium }}
                  />
                </View>
              </>
            ) : (
              <View style={styles.donationComplete}>
                <Text style={typography.heading2}>✅</Text>
                <Text style={[typography.heading3, { marginTop: spacing.margin.large }]}>
                  All caught up!
                </Text>
                <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.margin.small }]}>
                  You've reviewed {donatedItems.length} unused items. Great job keeping your closet fresh!
                </Text>
              </View>
            )}
          </Card>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Achievements</Text>
          <FlatList
            data={achievements}
            renderItem={renderAchievement}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.achievementRow}
            scrollEnabled={false}
          />
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Card variant="default">
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[typography.heading3, { color: colors.accentAction }]}>
                  {mostWornItems.length}
                </Text>
                <Text style={typography.caption}>Favorites</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[typography.heading3, { color: colors.warning }]}>
                  {unusedItems.length}
                </Text>
                <Text style={typography.caption}>Unused</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[typography.heading3, { color: colors.success }]}>
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </Text>
                <Text style={typography.caption}>Unlocked</Text>
              </View>
            </View>
          </Card>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  },
  section: {
    paddingHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  chartContainer: {
    alignItems: 'center'
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
    width: '100%'
  },
  barColumn: {
    alignItems: 'center',
    flex: 1
  },
  bar: {
    width: '60%',
    borderRadius: spacing.radius.xs,
    marginBottom: spacing.margin.small
  },
  dayLabel: {
    color: colors.textSecondary
  },
  horizontalList: {
    gap: spacing.gap.md,
    marginTop: spacing.margin.medium
  },
  itemCard: {
    width: 100,
    padding: spacing.padding.small
  },
  itemContent: {
    alignItems: 'center'
  },
  itemStats: {
    alignItems: 'center',
    marginTop: spacing.margin.small
  },
  swipeCard: {
    marginTop: spacing.margin.medium,
    minHeight: 300,
    justifyContent: 'center'
  },
  swipeContent: {
    alignItems: 'center',
    marginBottom: spacing.margin.large
  },
  swipeActions: {
    flexDirection: 'row',
    gap: spacing.gap.md
  },
  donationComplete: {
    alignItems: 'center',
    paddingVertical: spacing.padding.large
  },
  achievementRow: {
    gap: spacing.gap.md,
    marginBottom: spacing.margin.medium
  },
  achievement: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: spacing.radius.base,
    padding: spacing.padding.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accentAction
  },
  achievementLocked: {
    opacity: 0.5,
    borderColor: colors.divider
  },
  achievementIcon: {
    fontSize: 32
  },
  lockBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center'
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.divider
  }
});
