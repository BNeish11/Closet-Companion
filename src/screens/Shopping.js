import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

const { width } = Dimensions.get('window');

// Mock data
const gapAnalysis = [
  { category: 'Tops', owned: 15, recommended: 12, gap: -3, priority: 'full' },
  { category: 'Bottoms', owned: 5, recommended: 8, gap: 3, priority: 'high' },
  { category: 'Shoes', owned: 4, recommended: 6, gap: 2, priority: 'high' },
  { category: 'Jackets', owned: 2, recommended: 4, gap: 2, priority: 'medium' },
  { category: 'Accessories', owned: 8, recommended: 10, gap: 2, priority: 'low' }
];

const recommendations = [
  {
    id: '1',
    name: 'Dark Denim Jeans',
    category: 'Bottoms',
    price: 79.99,
    compatibilityScore: 9,
    matches: 12,
    isDuplicate: false
  },
  {
    id: '2',
    name: 'White Sneakers',
    category: 'Shoes',
    price: 89.99,
    compatibilityScore: 8.5,
    matches: 18,
    isDuplicate: false
  },
  {
    id: '3',
    name: 'Blazer - Navy',
    category: 'Jackets',
    price: 149.99,
    compatibilityScore: 7.8,
    matches: 8,
    isDuplicate: false
  },
  {
    id: '4',
    name: 'Crew Neck Tee - Gray',
    category: 'Tops',
    price: 29.99,
    compatibilityScore: 6.5,
    matches: 5,
    isDuplicate: true
  }
];

export default function Shopping() {
  const [budget, setBudget] = useState(150);
  const [expandedGapIndex, setExpandedGapIndex] = useState(null);

  const filteredRecommendations = recommendations.filter(item => item.price <= budget);

  const priorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return colors.warning;
      case 'medium':
        return colors.accentSecondary;
      case 'low':
        return colors.success;
      default:
        return colors.divider;
    }
  };

  const renderGapItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => setExpandedGapIndex(expandedGapIndex === index ? null : index)}
    >
      <Card variant="default" style={styles.gapCard}>
        <View style={styles.gapHeader}>
          <View style={styles.gapLeft}>
            <Text style={[typography.label, { flex: 1 }]}>{item.category}</Text>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityColor(item.priority) }
              ]}
            >
              <Text style={[typography.caption, { color: colors.textOnAccent, fontSize: 10 }]}>
                {item.priority.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={[typography.heading3, { color: colors.accentAction }]}>
            {Math.abs(item.gap)} {item.gap > 0 ? '↑' : '✓'}
          </Text>
        </View>

        {expandedGapIndex === index && (
          <View style={styles.gapExpanded}>
            <View style={styles.gapRow}>
              <Text style={typography.bodySmall}>Owned</Text>
              <Text style={[typography.bodySmall, { fontWeight: 'bold' }]}>{item.owned}</Text>
            </View>
            <View style={styles.gapRow}>
              <Text style={typography.bodySmall}>Recommended</Text>
              <Text style={[typography.bodySmall, { fontWeight: 'bold' }]}>{item.recommended}</Text>
            </View>
            {item.gap > 0 && (
              <Button
                title={`Shop ${item.category}`}
                onPress={() => alert(`Showing ${item.category} recommendations`)}
                variant="primary"
                style={{ marginTop: spacing.margin.medium }}
              />
            )}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  const renderRecommendation = ({ item }) => (
    <Card variant="default" style={styles.recommendationCard}>
      <View style={styles.recHeader}>
        <View style={styles.recTitle}>
          <Text style={typography.label} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {item.category}
          </Text>
        </View>
        <Text style={[typography.heading3, { color: colors.accentAction }]}>
          ${item.price}
        </Text>
      </View>

      <View style={styles.recStats}>
        <View style={styles.recStat}>
          <Text style={[typography.bodySmall, { color: colors.success }]}>
            {item.compatibilityScore}/10
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Match Score
          </Text>
        </View>
        <View style={styles.recStat}>
          <Text style={[typography.bodySmall, { color: colors.accentSecondary }]}>
            {item.matches} fits
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Outfits
          </Text>
        </View>
      </View>

      {item.isDuplicate && (
        <View style={styles.duplicateWarning}>
          <Text style={[typography.caption, { color: colors.warning }]}>
            ⚠️ Similar item already in closet
          </Text>
        </View>
      )}

      <Button
        title="View in Store"
        onPress={() => alert(`Opening ${item.name} listing...`)}
        variant="primary"
        style={{ marginTop: spacing.margin.medium }}
      />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={typography.heading2}>Shopping Guide</Text>
        </View>

        {/* Budget Slider */}
        <Card variant="spacious" style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={[typography.label, styles.label]}>Max Budget</Text>
            <Text style={[typography.heading3, { color: colors.accentAction }]}>
              ${budget}
            </Text>
          </View>
          <View style={styles.budgetSlider}>
            <Text style={typography.caption}>$25</Text>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  { width: `${(budget / 300) * 100}%` }
                ]}
              />
            </View>
            <Text style={typography.caption}>$300</Text>
          </View>
          <View style={styles.budgetControls}>
            {[50, 100, 150, 200, 300].map(amount => (
              <TouchableOpacity
                key={amount}
                onPress={() => setBudget(amount)}
                style={[
                  styles.budgetButton,
                  budget === amount && styles.budgetButtonActive
                ]}
              >
                <Text
                  style={[
                    typography.caption,
                    budget === amount
                      ? styles.budgetButtonTextActive
                      : styles.budgetButtonText
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Gap Analysis */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Closet Gaps</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: spacing.margin.medium }]}>
            What's missing from your wardrobe
          </Text>
          <FlatList
            data={gapAnalysis}
            renderItem={renderGapItem}
            keyExtractor={(item, idx) => `${item.category}-${idx}`}
            scrollEnabled={false}
          />
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.recHeader2}>
            <Text style={typography.heading3}>Smart Recommendations</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {filteredRecommendations.length} in budget
            </Text>
          </View>
          {filteredRecommendations.length === 0 ? (
            <Card variant="default">
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                No items match your budget. Try increasing your limit.
              </Text>
            </Card>
          ) : (
            <FlatList
              data={filteredRecommendations}
              renderItem={renderRecommendation}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Scanner */}
        <View style={styles.section}>
          <Card variant="spacious" style={styles.scannerCard}>
            <Text style={[typography.label, { marginBottom: spacing.margin.medium }]}>
              Found something in store?
            </Text>
            <Button
              title="📱 Scan Barcode"
              onPress={() => alert('Opening camera for barcode scan...')}
              variant="primary"
              style={{ marginBottom: spacing.margin.medium }}
            />
            <Button
              title="Type Product Info"
              onPress={() => alert('Opening product form...')}
              variant="secondary"
            />
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
  header: {
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  },
  section: {
    paddingHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  label: {
    marginBottom: spacing.margin.small,
    color: colors.textSecondary
  },
  budgetCard: {
    marginHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.margin.medium
  },
  budgetSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.gap.sm,
    marginBottom: spacing.margin.large
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.divider,
    borderRadius: spacing.radius.full,
    overflow: 'hidden'
  },
  sliderFill: {
    height: '100%',
    backgroundColor: colors.accentAction,
    borderRadius: spacing.radius.full
  },
  budgetControls: {
    flexDirection: 'row',
    gap: spacing.gap.sm,
    justifyContent: 'space-between'
  },
  budgetButton: {
    flex: 1,
    paddingVertical: spacing.padding.small,
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center'
  },
  budgetButtonActive: {
    backgroundColor: colors.accentAction,
    borderColor: colors.accentAction
  },
  budgetButtonText: {
    color: colors.textSecondary
  },
  budgetButtonTextActive: {
    color: colors.textOnAccent,
    fontWeight: '600'
  },
  gapCard: {
    marginBottom: spacing.margin.medium
  },
  gapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gapLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.gap.sm,
    alignItems: 'center'
  },
  priorityBadge: {
    paddingHorizontal: spacing.padding.small,
    paddingVertical: spacing.padding.compact,
    borderRadius: spacing.radius.xs
  },
  gapExpanded: {
    marginTop: spacing.margin.medium,
    paddingTop: spacing.padding.medium,
    borderTopWidth: 1,
    borderTopColor: colors.divider
  },
  gapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.margin.small
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.margin.medium
  },
  recTitle: {
    flex: 1,
    marginRight: spacing.margin.medium
  },
  recStats: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    marginBottom: spacing.margin.medium,
    paddingBottom: spacing.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  recStat: {
    flex: 1
  },
  recommendationCard: {
    marginBottom: spacing.margin.medium
  },
  duplicateWarning: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
    paddingHorizontal: spacing.padding.small,
    paddingVertical: spacing.padding.compact,
    borderRadius: spacing.radius.xs,
    marginBottom: spacing.margin.medium
  },
  recHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.margin.medium
  },
  scannerCard: {
    marginHorizontal: 0,
    paddingHorizontal: spacing.padding.large
  }
});
