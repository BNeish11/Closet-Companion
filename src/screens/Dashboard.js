// ADD THESE IMPORTS AT TOP
import { useCallback } from 'react';

export default function Dashboard({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [closetPreview, setClosetPreview] = useState([]);
  const [cleanCount, setCleanCount] = useState(0);
  const [dirtyCount, setDirtyCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // ✅ NEW STATE
  const [weather, setWeather] = useState(null);

  const { items, setItems } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadData();
      loadWeather(); // ✅ NEW
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

  // ✅ WEATHER MOCK (READY FOR API)
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

        {/* 🌦️ WEATHER CARD */}
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
              <ActivityIndicator color={colors.accentAction} />
            )}
          </Card>
        </View>

        {/* Quick Stats (UNCHANGED) */}
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

        {/* 📸 CAMERA CARD */}
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

        {/* Quick Actions (UNCHANGED) */}
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

        {/* Closet Preview (UNCHANGED) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={typography.heading3}>Recent Items</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Closet')}>
              <Text style={[typography.body, { color: colors.accentAction }]}>
                View All →
              </Text>
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

      </ScrollView>
    </SafeAreaView>
  );
}