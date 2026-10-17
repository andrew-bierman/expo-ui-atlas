import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  type Category,
  catalog,
  categories,
  type Family,
  families,
  filterCatalog,
} from '../../../entities/catalog-entry';
import { useTheme } from '../../../shared/theme';
import { Body, Notice, Pill } from '../../../shared/ui';
export default function Browse() {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<Family | 'all'>('all');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const results = filterCatalog(catalog, query, family, category);
  const columns = width > 1100 ? 3 : width > 720 ? 2 : 1;
  const reset = () => {
    setQuery('');
    setFamily('all');
    setCategory('all');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      <FlatList
        key={columns}
        data={results}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: width > 720 ? 36 : 20,
          paddingBottom: 60,
          maxWidth: 1440,
          width: '100%',
          alignSelf: 'center',
        }}
        columnWrapperStyle={columns > 1 ? { gap: 16 } : undefined}
        ListHeaderComponent={
          <View style={{ gap: 24, marginBottom: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  color: t.accent,
                  fontSize: 13,
                  fontWeight: '800',
                  letterSpacing: 2,
                }}
              >
                ATLAS / EXPO UI
              </Text>
              <Text style={{ color: t.muted, fontSize: 12 }}>
                SDK 58 · VOL. 01
              </Text>
            </View>
            <View style={{ gap: 12, paddingVertical: 16 }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: t.text,
                  fontSize: width > 720 ? 66 : 44,
                  lineHeight: width > 720 ? 70 : 48,
                  letterSpacing: -2,
                  fontWeight: '600',
                  maxWidth: 780,
                }}
              >
                Native interfaces.{'\n'}An open field to explore.
              </Text>
              <Text
                style={{
                  color: t.muted,
                  fontSize: 17,
                  lineHeight: 26,
                  maxWidth: 620,
                }}
              >
                A hands-on collection of Expo UI. Browse the building blocks,
                try the controls, and discover what each platform can do.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {Object.entries(families).map(([id, f]) => (
                <Pressable
                  key={id}
                  accessibilityRole="button"
                  onPress={() => {
                    setFamily(id as Family);
                    setCategory('all');
                  }}
                  style={{
                    flexGrow: 1,
                    flexBasis: 230,
                    borderRadius: 18,
                    padding: 20,
                    backgroundColor: t.surface,
                    borderWidth: 1,
                    borderColor: family === id ? t.accent : t.border,
                    gap: 10,
                  }}
                >
                  <Text
                    style={{ color: t.accent, fontSize: 12, fontWeight: '700' }}
                  >
                    {f.short} / {catalog.filter((e) => e.family === id).length}{' '}
                    COLLECTIONS
                  </Text>
                  <Text
                    style={{ color: t.text, fontSize: 21, fontWeight: '600' }}
                  >
                    {f.label} ↗
                  </Text>
                  <Body muted>{f.description}</Body>
                </Pressable>
              ))}
            </View>
            <View style={{ gap: 14 }}>
              <TextInput
                accessibilityLabel="Search components"
                placeholder="Search components, modifiers, interactions…"
                placeholderTextColor={t.muted}
                value={query}
                onChangeText={setQuery}
                style={{
                  backgroundColor: t.surface,
                  color: t.text,
                  padding: 18,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: t.border,
                  fontSize: 16,
                }}
                clearButtonMode="while-editing"
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                <Pill
                  label="All APIs"
                  selected={family === 'all'}
                  onPress={() => setFamily('all')}
                />
                {Object.entries(families).map(([id, f]) => (
                  <Pill
                    key={id}
                    label={f.label}
                    selected={family === id}
                    onPress={() => setFamily(id as Family)}
                  />
                ))}
              </ScrollView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                <Pill
                  label="All categories"
                  selected={category === 'all'}
                  onPress={() => setCategory('all')}
                />
                {categories.map((c) => (
                  <Pill
                    key={c}
                    label={c}
                    selected={category === c}
                    onPress={() => setCategory(c)}
                  />
                ))}
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                accessibilityLiveRegion="polite"
                style={{
                  color: t.muted,
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                }}
              >
                {results.length} COLLECTIONS TO EXPLORE
              </Text>
              <Pill label="Clear filters" onPress={reset} />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${families[item.family].label}`}
            onPress={() => router.push(`/component/${item.id}`)}
            style={({ pressed }) => ({
              flex: 1,
              maxWidth: columns > 1 ? `${100 / columns}%` : undefined,
              marginBottom: 16,
              padding: 22,
              backgroundColor: t.surface,
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 20,
              gap: 12,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: t.accent,
                  fontSize: 11,
                  fontWeight: '800',
                  letterSpacing: 1,
                }}
              >
                {families[item.family].label.toUpperCase()} /{' '}
                {item.category.toUpperCase()}
              </Text>
              <Text style={{ color: t.muted }}>↗</Text>
            </View>
            <Text
              style={{
                color: t.text,
                fontSize: 25,
                fontWeight: '600',
                letterSpacing: -0.5,
              }}
            >
              {item.name}
            </Text>
            <Body muted>{item.summary}</Body>
            <Text style={{ color: t.muted, fontSize: 11, marginTop: 8 }}>
              {item.platforms
                .map((p) => ({ ios: 'iOS', android: 'Android', web: 'Web' })[p])
                .join(' + ')}{' '}
              · {item.exports.length} building blocks
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Notice title="No specimens found">
            Try a component name like “slider”, or clear the filters to see the
            whole atlas.
          </Notice>
        }
        ListFooterComponent={
          <View style={{ paddingTop: 28, gap: 8 }}>
            <Text style={{ color: t.text, fontSize: 17, fontWeight: '600' }}>
              Made for curiosity.
            </Text>
            <Body muted>
              Live specimens use Expo UI. The catalog shell uses React Native.
              Direct native collections open on their supported platform.
            </Body>
          </View>
        }
      />
    </SafeAreaView>
  );
}
