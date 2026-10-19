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
  familyOptionsForPlatform,
  filterCatalog,
} from '../../../entities/catalog-entry';
import { appConfig, useTranslation } from '../../../shared/config';
import { NativeSearchBar, SearchField } from '../../../shared/ui';

export default function Browse() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [searchResetVersion, setSearchResetVersion] = useState(0);
  const [family, setFamily] = useState<Family | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [category, setCategory] = useState<Category | CatalogFilter.All>(
    CatalogFilter.All,
  );
  const [filtersOpen, setFiltersOpen] = useState<boolean>(
    appConfig.catalog.filtersInitiallyOpen,
  );
  const results = filterCatalog(catalog, query, family, category, Platform.OS);
  const filtered =
    query !== '' ||
    family !== CatalogFilter.All ||
    category !== CatalogFilter.All;
  return (
    <>
      <NativeSearchBar
        resetVersion={searchResetVersion}
        onChange={setQuery}
        placeholder={t('catalog.search')}
      />
      {Platform.OS === 'web' ? (
        <SearchField value={query} onChange={setQuery} />
      ) : null}
      <Host style={{ flex: 1 }}>
        <List testID="catalog-list">
          <Collapsible
            label={t('catalog.filters')}
            isOpen={filtersOpen}
            onOpenChange={setFiltersOpen}
          >
            <Column spacing={8}>
              <Picker
                testID="catalog-api-filter"
                selectedValue={family}
                onValueChange={setFamily}
              >
                <Picker.Item
                  value={CatalogFilter.All}
                  label={t('catalog.allApis')}
                />
                {familyOptionsForPlatform(Platform.OS).map((f) => (
                  <Picker.Item
                    key={f.id}
                    value={f.id}
                    label={t(`families.${f.id}.label`)}
                  />
                ))}
              </Picker>
              <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item
                  value={CatalogFilter.All}
                  label={t('catalog.allCategories')}
                />
                {categories.map((c) => (
                  <Picker.Item key={c} value={c} label={t(`categories.${c}`)} />
                ))}
              </Picker>
            </Column>
          </Collapsible>
          <Text>{t('catalog.collections', { count: results.length })}</Text>
          {filtered ? (
            <ListItem
              onPress={() => {
                setQuery('');
                setSearchResetVersion((version) => version + 1);
                setFamily(CatalogFilter.All);
                setCategory(CatalogFilter.All);
              }}
            >
              {t('catalog.clearFilters')}
            </ListItem>
          ) : null}
          {results.map((entry) => (
            <ListItem
              key={entry.id}
              testID={`catalog-${entry.id}`}
              onPress={() => router.push(`/component/${entry.id}`)}
              supportingText={t('catalog.row', {
                family: t(`families.${entry.family}.label`),
                category: t(`categories.${entry.category}`),
              })}
            >
              {entry.name}
            </ListItem>
          ))}
          {results.length === 0 ? <Text>{t('catalog.empty')}</Text> : null}
        </List>
      </Host>
    </>
  );
}
