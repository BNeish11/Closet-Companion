import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDaysAgo, formatDate } from '../utils/helpers';
import { updateItem as updateItemDB, deleteItem, markItemAsWorn } from '../../db/items';
import { useStore } from '../store';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

export default function ItemDetail({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { updateItem: storeUpdateItem, removeItem } = useStore();

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route.params.item);
    }
  }, [route?.params?.item]);

  const daysAgo = item.last_worn_date ? getDaysAgo(item.last_worn_date) : null;

  const handleMarkWorn = async () => {
    setLoading(true);
    try {
      const updated = await markItemAsWorn(item.id);
      storeUpdateItem(updated);
      alert('Marked as worn! Keep track of your favorites.');
    } catch (err) {
      console.error('Error marking worn:', err);
      alert('Failed to mark as worn');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure? This cannot be undone.')) return;

    setLoading(true);
    try {
      await deleteItem(item.id);
      removeItem(item.id);
      alert('Item deleted');
      navigation.goBack();
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[typography.body, styles.backButton]}>← Back</Text>
          </TouchableOpacity>
          <Text style={typography.heading2}>Item Details</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Item Image */}
        {item.image_uri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image_uri }} style={styles.image} />
          </View>
        )}

        {/* Basic Info */}
        <Card variant="spacious" style={styles.card}>
          <Text style={[typography.label, styles.label]}>Category</Text>
          <Text style={typography.heading3}>{item.category}</Text>
          {item.color && (
            <>
              <Text style={[typography.label, styles.label]}>Color</Text>
              <Text style={typography.body}>{item.color}</Text>
            </>
          )}
          {item.fabric && (
            <>
              <Text style={[typography.label, styles.label]}>Fabric</Text>
              <Text style={typography.body}>{item.fabric}</Text>
            </>
          )}
        </Card>

        {/* Tags & Metadata */}
        <Card variant="default" style={styles.card}>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={typography.caption}>Season</Text>
              <Text style={[typography.label, { color: colors.accentAction }]}>
                {item.season || 'N/A'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.tag}>
              <Text style={typography.caption}>Comfort</Text>
              <Text style={[typography.label, { color: colors.success }]}>
                {item.comfort_rating}/5 ⭐
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.tag}>
              <Text style={typography.caption}>Status</Text>
              <Text
                style={[
                  typography.label,
                  {
                    color:
                      item.laundry_status === 'clean' ? colors.success : colors.warning
                  }
                ]}
              >
                {item.laundry_status?.toUpperCase()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Wear History */}
        <Card variant="default" style={styles.card}>
          <Text style={[typography.label, styles.label]}>Wear History</Text>
          <View style={styles.wearStats}>
            <View style={styles.wearStat}>
              <Text style={[typography.heading2, { color: colors.accentAction }]}>
                {item.wear_count || 0}
              </Text>
              <Text style={typography.bodySmall}>Total Wears</Text>
            </View>
            <View style={styles.wearStat}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                {daysAgo !== null ? `${daysAgo} days ago` : 'Never worn'}
              </Text>
              <Text style={typography.caption}>Last Worn</Text>
            </View>
          </View>
        </Card>

        {/* Occasions */}
        {item.occasion_tags && item.occasion_tags.length > 0 && (
          <Card variant="default" style={styles.card}>
            <Text style={[typography.label, styles.label]}>Occasions</Text>
            <View style={styles.occasionTags}>
              {item.occasion_tags.map(occasion => (
                <View key={occasion} style={styles.occasionTag}>
                  <Text style={[typography.caption, { color: colors.textOnAccent }]}>
                    {occasion}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Worn Today"
            onPress={handleMarkWorn}
            variant="primary"
            disabled={loading}
          />
          <Button
            title="✏️ Edit"
            onPress={() => navigation.navigate('AddItem', { item })}
            variant="secondary"
            style={{ marginTop: spacing.margin.medium }}
            disabled={loading}
          />
          <Button
            title="🗑️ Delete"
            onPress={handleDelete}
            variant="secondary"
            style={{ marginTop: spacing.margin.medium, borderColor: colors.error }}
            disabled={loading}
          />
        </View>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.accentAction} />
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  backButton: {
    color: colors.accentAction
  },
  imageContainer: {
    height: 300,
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  },
  image: {
    flex: 1,
    borderRadius: spacing.radius.lg,
    backgroundColor: colors.surface
  },
  card: {
    marginHorizontal: spacing.container.default,
    marginBottom: spacing.margin.medium
  },
  label: {
    marginBottom: spacing.margin.small,
    color: colors.textSecondary
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tag: {
    flex: 1,
    alignItems: 'center'
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.divider
  },
  wearStats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  wearStat: {
    alignItems: 'center'
  },
  occasionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gap.sm
  },
  occasionTag: {
    backgroundColor: colors.accentAction,
    paddingHorizontal: spacing.padding.medium,
    paddingVertical: spacing.padding.small,
    borderRadius: spacing.radius.full
  },
  actions: {
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});