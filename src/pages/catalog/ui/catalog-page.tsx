import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  type CatalogEntry,
  CatalogFilter,
  type Category,
  catalog,
  categories,
  Family,
  familyOptions,
  filterCatalog,
} from '../../../entities/catalog-entry';
import { useTheme } from '../../../shared/theme';
import { Body, Notice, Pill, SearchField } from '../../../shared/ui';
import { CatalogCard } from './catalog-card';

function renderCatalogEntry({ item }: { item: CatalogEntry }) {
  return (
    <CatalogCard
      entry={item}
      onPress={() => router.push(`/component/${item.id}`)}
    />
  );
}
export default function Browse() {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<Family | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [category, setCategory] = useState<Category | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const results = filterCatalog(catalog, query, family, category);
  const columns = width > 1100 ? 3 : width > 720 ? 2 : 1;
  const reset = () => {
    setQuery('');
    setFamily(CatalogFilter.All);
    setCategory(CatalogFilter.All);
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
              {familyOptions.map(({ id, ...f }) => (
                <Pressable
                  key={id}
                  accessibilityRole="button"
                  onPress={() => {
                    setFamily(id);
                    setCategory(CatalogFilter.All);
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
              <SearchField value={query} onChange={setQuery} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                <Pill
                  label="All APIs"
                  selected={family === CatalogFilter.All}
                  onPress={() => setFamily(CatalogFilter.All)}
                />
                {familyOptions.map(({ id, ...f }) => (
                  <Pill
                    key={id}
                    label={f.label}
                    selected={family === id}
                    onPress={() => setFamily(id)}
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
                  selected={category === CatalogFilter.All}
                  onPress={() => setCategory(CatalogFilter.All)}
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
        renderItem={renderCatalogEntry}
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
              Built with Expo UI and Expo Router native tabs. Direct native
              collections open on their supported platform.
            </Body>
          </View>
        }
      />
    </SafeAreaView>
  );
}
