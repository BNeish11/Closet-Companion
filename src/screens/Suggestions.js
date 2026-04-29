import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useStore } from '../store';
import Card from '../components/Card';
import Button from '../components/Button';
import ToggleChip from '../components/ToggleChip';
import Grid from '../components/Grid';
import ItemTile from '../components/ItemTile';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';

const { width } = Dimensions.get('window');
const FEEDBACK_OPTIONS = ['Too Hot', 'Too Cold', 'Uncomfortable', 'Wrong Occasion', 'Not Interested'];

export default function Suggestions() {
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [reasoningExpanded, setReasoningExpanded] = useState(false);
  const [temperatureBias, setTemperatureBias] = useState('neutral');

  const { user, updateTemperatureBias, addFeedback } = useStore();

  const outfitA = {
    id: 'outfit-a',
    items: [
      { id: '1', category: 'Tops', color: 'White' },
      { id: '2', category: 'Bottoms', color: 'Blue' },
      { id: '3', category: 'Shoes', color: 'Black' }
    ],
    reason: 'Perfect for mild weather (18°C). Comfortable and versatile combination.',
    score: 8.5
  };

  const outfitB = {
    id: 'outfit-b',
    items: [
      { id: '4', category: 'Tops', color: 'Yellow' },
      { id: '5', category: 'Bottoms', color: 'Cream' },
      { id: '6', category: 'Jackets', color: 'Beige' }
    ],
    reason: 'Light and airy for warm weather (22°C). Great for casual outings.',
    score: 7.8
  };

  const toggleFeedback = (option) => {
    if (selectedFeedback.includes(option)) {
      setSelectedFeedback(selectedFeedback.filter(f => f !== option));
    } else {
      setSelectedFeedback([...selectedFeedback, option]);
    }
  };

  const handleSubmitFeedback = () => {
    if (selectedFeedback.length === 0) {
      alert('Please select at least one feedback option');
      return;
    }

    addFeedback({
      outfitId: outfitA.id,
      tags: selectedFeedback,
      timestamp: new Date().toISOString()
    });

    alert('Feedback saved! We\'ll learn from this.');
    setSelectedFeedback([]);
  };

  const handleTemperatureChange = (bias) => {
    setTemperatureBias(bias);
    updateTemperatureBias(bias);
  };

  const renderOutfitCard = (outfit, label) => (
    <View style={styles.outfitCard}>
      <Text style={[typography.label, { marginBottom: spacing.margin.small }]}>
        {label}
      </Text>
      <View style={styles.itemPreview}>
        <Grid
          data={outfit.items}
          renderItem={({ item }) => <ItemTile item={item} size="sm" />}
          numColumns={3}
          keyExtractor={(item) => item.id}
          gap="xs"
        />
      </View>
      <Text style={[typography.bodySmall, { marginTop: spacing.margin.medium, color: colors.success }]}>
        Score: {outfit.score}/10
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={typography.heading2}>Daily Suggestions</Text>
        </View>

        {/* Temperature Preference */}
        <Card variant="default" style={styles.tempCard}>
          <Text style={[typography.label, styles.label]}>How do you feel?</Text>
          <View style={styles.tempOptions}>
            {['cold', 'neutral', 'hot'].map(bias => (
              <TouchableOpacity
                key={bias}
                style={[
                  styles.tempButton,
                  temperatureBias === bias && styles.tempButtonActive
                ]}
                onPress={() => handleTemperatureChange(bias)}
              >
                <Text style={[
                  typography.body,
                  temperatureBias === bias && styles.tempButtonTextActive
                ]}>
                  {bias === 'cold' ? '🥶' : bias === 'hot' ? '🔥' : '😊'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* A/B Outfit Comparison */}
        <View style={styles.section}>
          <Text style={typography.heading3}>Pick an Outfit</Text>
          <View style={styles.outfitsContainer}>
            {renderOutfitCard(outfitA, 'Option A')}
            {renderOutfitCard(outfitB, 'Option B')}
          </View>
        </View>

        {/* Reasoning Panel */}
        <Card variant="default" style={styles.reasoningCard}>
          <TouchableOpacity
            onPress={() => setReasoningExpanded(!reasoningExpanded)}
            style={styles.reasoningHeader}
          >
            <Text style={typography.label}>Why these suggestions?</Text>
            <Text style={typography.heading3}>{reasoningExpanded ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {reasoningExpanded && (
            <View style={styles.reasoningContent}>
              <Text style={[typography.bodySmall, { marginBottom: spacing.margin.small }]}>
                📍 <Text style={{ fontWeight: '600' }}>Outfit A:</Text> {outfitA.reason}
              </Text>
              <Text style={[typography.bodySmall, { marginBottom: spacing.margin.small }]}>
                📍 <Text style={{ fontWeight: '600' }}>Outfit B:</Text> {outfitB.reason}
              </Text>
              <Text style={[typography.caption, { color: colors.textMuted, marginTop: spacing.margin.medium }]}>
                Based on: Weather, your comfort preferences, and wear history
              </Text>
            </View>
          )}
        </Card>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={typography.heading3}>How'd you feel?</Text>
          <Card variant="default">
            <View style={styles.feedbackChips}>
              {FEEDBACK_OPTIONS.map(option => (
                <ToggleChip
                  key={option}
                  label={option}
                  selected={selectedFeedback.includes(option)}
                  onPress={() => toggleFeedback(option)}
                />
              ))}
            </View>
            <View style={styles.feedbackActions}>
              <Button
                title="Skip"
                onPress={() => setSelectedFeedback([])}
                variant="secondary"
                style={{ flex: 1 }}
              />
              <Button
                title="Submit"
                onPress={handleSubmitFeedback}
                variant="primary"
                style={{ flex: 1, marginLeft: spacing.margin.medium }}
              />
            </View>
          </Card>
        </View>

        {/* Refresh Button */}
        <View style={styles.actions}>
          <Button
            title="🔄 Get Different Options"
            onPress={() => alert('Generating new suggestions...')}
            variant="primary"
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
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  },
  label: {
    marginBottom: spacing.margin.small,
    color: colors.textSecondary
  },
  tempCard: {
    marginHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  tempOptions: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    justifyContent: 'space-around'
  },
  tempButton: {
    flex: 1,
    paddingVertical: spacing.padding.medium,
    borderRadius: spacing.radius.base,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.divider,
    alignItems: 'center'
  },
  tempButtonActive: {
    backgroundColor: colors.accentAction,
    borderColor: colors.accentAction
  },
  tempButtonTextActive: {
    color: colors.textOnAccent,
    fontSize: 24
  },
  section: {
    paddingHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  outfitsContainer: {
    flexDirection: 'row',
    gap: spacing.gap.md,
    marginTop: spacing.margin.medium
  },
  outfitCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: spacing.radius.base,
    padding: spacing.padding.medium,
    borderWidth: 2,
    borderColor: colors.divider
  },
  itemPreview: {
    height: 120
  },
  reasoningCard: {
    marginHorizontal: spacing.container.default,
    marginBottom: spacing.margin.large
  },
  reasoningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reasoningContent: {
    marginTop: spacing.margin.medium,
    paddingTop: spacing.padding.medium,
    borderTopWidth: 1,
    borderTopColor: colors.divider
  },
  feedbackChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gap.sm,
    marginBottom: spacing.margin.medium
  },
  feedbackActions: {
    flexDirection: 'row',
    gap: spacing.gap.md
  },
  actions: {
    paddingHorizontal: spacing.container.default,
    paddingVertical: spacing.padding.large
  }
});
