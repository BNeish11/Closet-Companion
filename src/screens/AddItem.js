import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-slider/slider';
import { addItem } from '../../db/items';
import { useStore } from '../store';
import { generateId } from '../utils/helpers';
import Button from '../components/Button';
import Card from '../components/Card';
import ToggleChip from '../components/ToggleChip';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

const CATEGORIES = ['Tops', 'Bottoms', 'Shoes', 'Jackets', 'Accessories'];
const FABRICS = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim', 'Leather'];
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter', 'All-Season'];
const OCCASIONS = ['Casual', 'Work', 'Formal', 'Sport', 'Party'];

export default function AddItem({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [color, setColor] = useState('');
  const [fabric, setFabric] = useState(FABRICS[0]);
  const [season, setSeason] = useState(SEASONS[4]);
  const [comfortRating, setComfortRating] = useState(3);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const { addItem: storeAddItem } = useStore();

  const toggleOccasion = (occasion) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };

  const handleAddItem = async () => {
    if (!color.trim()) {
      alert('Please enter a color');
      return;
    }

    setLoading(true);
    try {
      const newItem = {
        id: generateId(),
        category,
        color,
        fabric,
        season,
        comfort_rating: comfortRating,
        occasion_tags: selectedOccasions,
        laundry_status: 'clean',
        wear_count: 0,
        created_at: new Date().toISOString()
      };

      await addItem(newItem);
      storeAddItem(newItem);

      alert('Item added successfully!');
      navigation.goBack();
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[typography.body, styles.backButton]}>← Back</Text>
        </TouchableOpacity>
        <Text style={typography.heading2}>Add Item</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Category</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.pickerInput}
              itemStyle={{ color: colors.textPrimary }}
            >
              {CATEGORIES.map(cat => (
                <Picker.Item key={cat} label={cat} value={cat} color={colors.textPrimary} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* Color */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Color</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Navy Blue"
            placeholderTextColor={colors.textMuted}
            value={color}
            onChangeText={setColor}
          />
        </Card>

        {/* Fabric */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Fabric</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={fabric}
              onValueChange={setFabric}
              style={styles.pickerInput}
              itemStyle={{ color: colors.textPrimary }}
            >
              {FABRICS.map(f => (
                <Picker.Item key={f} label={f} value={f} color={colors.textPrimary} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* Season */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Season</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={season}
              onValueChange={setSeason}
              style={styles.pickerInput}
              itemStyle={{ color: colors.textPrimary }}
            >
              {SEASONS.map(s => (
                <Picker.Item key={s} label={s} value={s} color={colors.textPrimary} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* Comfort Rating */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Comfort Level</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={comfortRating}
              onValueChange={setComfortRating}
              minimumTrackTintColor={colors.accentAction}
              maximumTrackTintColor={colors.divider}
            />
            <Text style={[typography.body, { color: colors.accentAction }]}>
              {comfortRating} / 5
            </Text>
          </View>
        </Card>

        {/* Occasions */}
        <Card variant="default">
          <Text style={[typography.label, styles.label]}>Occasions</Text>
          <View style={styles.chipContainer}>
            {OCCASIONS.map(occasion => (
              <ToggleChip
                key={occasion}
                label={occasion}
                selected={selectedOccasions.includes(occasion)}
                onPress={() => toggleOccasion(occasion)}
              />
            ))}
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={{ flex: 1 }}
          />
          <Button
            title={loading ? 'Adding...' : 'Add Item'}
            onPress={handleAddItem}
            variant="primary"
            style={{ flex: 1, marginLeft: spacing.margin.medium }}
            disabled={loading}
          />
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.medium
  },
  label: {
    marginBottom: spacing.margin.small,
    color: colors.textSecondary
  },
  input: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: spacing.radius.base,
    paddingHorizontal: spacing.padding.medium,
    paddingVertical: spacing.padding.small,
    color: colors.textPrimary,
    fontSize: 14
  },
  picker: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: spacing.radius.base,
    overflow: 'hidden'
  },
  pickerInput: {
    color: colors.textPrimary
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.gap.md
  },
  slider: {
    flex: 1,
    height: 40
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gap.sm
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    marginTop: spacing.margin.lg,
    marginBottom: spacing.margin.xl
  }
});