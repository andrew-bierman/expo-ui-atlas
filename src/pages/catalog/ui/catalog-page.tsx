import { Button, Column, Host, Picker, Text } from '@expo/ui';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
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
import { spacing, useTheme } from '../../../shared/theme';
import { Notice, SearchField } from '../../../shared/ui';
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
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<Family | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [category, setCategory] = useState<Category | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const results = filterCatalog(catalog, query, family, category);
  return (
    <FlatList
      style={{ backgroundColor: t.background }}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={results}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: spacing.md, gap: spacing.sm }}
      ListHeaderComponent={
        <View style={{ gap: spacing.sm }}>
          <SearchField value={query} onChange={setQuery} />
          <Host
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            style={{ width: '100%' }}
          >
            <Column spacing={spacing.sm}>
              <Text>API</Text>
              <Picker selectedValue={family} onValueChange={setFamily}>
                <Picker.Item value={CatalogFilter.All} label="All APIs" />
                {familyOptions.map((f) => (
                  <Picker.Item key={f.id} value={f.id} label={f.label} />
                ))}
              </Picker>
              <Text>Category</Text>
              <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item value={CatalogFilter.All} label="All categories" />
                {categories.map((c) => (
                  <Picker.Item key={c} value={c} label={c} />
                ))}
              </Picker>
              <Text>{`${results.length} collections`}</Text>
              <Button
                label="Clear filters"
                onPress={() => {
                  setQuery('');
                  setFamily(CatalogFilter.All);
                  setCategory(CatalogFilter.All);
                }}
              />
            </Column>
          </Host>
        </View>
      }
      renderItem={renderCatalogEntry}
      ListEmptyComponent={
        <Notice title="No matching components">
          Try a broader search or clear the filters.
        </Notice>
      }
    />
  );
}
