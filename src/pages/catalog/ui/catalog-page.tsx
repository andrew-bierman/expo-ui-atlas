import {
  Collapsible,
  Column,
  Host,
  List,
  ListItem,
  Picker,
  Text,
} from '@expo/ui';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';
import {
  CatalogFilter,
  type Category,
  catalog,
  categories,
  Family,
  families,
  familyOptions,
  filterCatalog,
} from '../../../entities/catalog-entry';
import { NativeSearchBar, SearchField } from '../../../shared/ui';

export default function Browse() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<Family | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [category, setCategory] = useState<Category | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const results = filterCatalog(catalog, query, family, category);
  const filtered =
    query !== '' ||
    family !== CatalogFilter.All ||
    category !== CatalogFilter.All;
  return (
    <>
      <NativeSearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search components"
      />
      {Platform.OS === 'web' ? (
        <SearchField value={query} onChange={setQuery} />
      ) : null}
      <Host style={{ flex: 1 }}>
        <List testID="catalog-list">
          <Collapsible
            label="Filters"
            isOpen={filtersOpen}
            onOpenChange={setFiltersOpen}
          >
            <Column spacing={8}>
              <Picker
                testID="catalog-api-filter"
                selectedValue={family}
                onValueChange={setFamily}
              >
                <Picker.Item value={CatalogFilter.All} label="All APIs" />
                {familyOptions.map((f) => (
                  <Picker.Item key={f.id} value={f.id} label={f.label} />
                ))}
              </Picker>
              <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item value={CatalogFilter.All} label="All categories" />
                {categories.map((c) => (
                  <Picker.Item key={c} value={c} label={c} />
                ))}
              </Picker>
            </Column>
          </Collapsible>
          <Text>{`${results.length} collections`}</Text>
          {filtered ? (
            <ListItem
              onPress={() => {
                setQuery('');
                setFamily(CatalogFilter.All);
                setCategory(CatalogFilter.All);
              }}
            >
              Clear filters
            </ListItem>
          ) : null}
          {results.map((entry) => (
            <ListItem
              key={entry.id}
              testID={`catalog-${entry.id}`}
              onPress={() => router.push(`/component/${entry.id}`)}
              supportingText={`${families[entry.family].label} · ${entry.category}`}
            >
              {entry.name}
            </ListItem>
          ))}
          {results.length === 0 ? <Text>No matching components</Text> : null}
        </List>
      </Host>
    </>
  );
}
