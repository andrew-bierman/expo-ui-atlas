import { Column, Host, Picker, Text } from '@expo/ui';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CatalogEntryId,
  CatalogFilter,
  catalog,
  Family,
  families,
  filterCatalog,
} from '../../../entities/catalog-entry';
import {
  ExampleCard,
  nativeExamples,
  universalExamples,
} from '../../../features/explore-examples';
import { useTheme } from '../../../shared/theme';
import { Body, Notice, SearchField } from '../../../shared/ui';
export function PlaygroundPage() {
  const t = useTheme();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(CatalogEntryId.UniversalButton);
  const matches = filterCatalog(
    catalog,
    query,
    CatalogFilter.All,
    CatalogFilter.All,
  ).filter((entry) => entry.platforms.some((p) => p === Platform.OS));
  const entry = matches.find((e) => e.id === selected) ?? matches[0];
  const examples = entry
    ? ((entry.family === Family.Universal ? universalExamples : nativeExamples)[
        entry.id
      ] ?? [])
    : [];
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 20,
          maxWidth: 900,
          width: '100%',
          alignSelf: 'center',
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Host
          matchContents={{ vertical: true }}
          ignoreSafeArea="all"
          style={{ width: '100%' }}
        >
          <Column spacing={12}>
            <Text
              textStyle={{
                color: t.accent,
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1.5,
              }}
            >
              LIVE WORKBENCH
            </Text>
            <Text
              textStyle={{ color: t.text, fontSize: 38, fontWeight: '600' }}
            >
              Make it your own.
            </Text>
            <Text textStyle={{ color: t.muted, fontSize: 16 }}>
              Choose any collection available on this platform. Open Customize
              to edit its real component props and native environment.
            </Text>
          </Column>
        </Host>
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Find a component to customize…"
        />
        {entry ? (
          <Host
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            seedColor={t.accent}
            colorScheme={t.dark ? 'dark' : 'light'}
            style={{ width: '100%' }}
          >
            <Picker selectedValue={entry.id} onValueChange={setSelected}>
              {matches.map((e) => (
                <Picker.Item
                  key={e.id}
                  value={e.id}
                  label={`${families[e.family].label} · ${e.name}`}
                />
              ))}
            </Picker>
          </Host>
        ) : (
          <Notice title="No matching components">
            Try a broader search. Native-only examples appear on their matching
            device.
          </Notice>
        )}
        {entry ? (
          <View style={{ gap: 8 }}>
            <Body>{entry.summary}</Body>
            {entry.notes ? <Body muted>{entry.notes}</Body> : null}
          </View>
        ) : null}
        {examples.map((example, index) => (
          <ExampleCard
            key={`${entry?.id}-${example.id}`}
            example={example}
            index={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
