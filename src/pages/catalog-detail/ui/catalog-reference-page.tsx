import { router, Stack, useLocalSearchParams } from 'expo-router';
import { findEntry } from '../../../entities/catalog-entry';
import { Notice } from '../../../shared/ui';
import { ReferencePanel } from './reference-panel';
export function CatalogReferencePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  return (
    <>
      <Stack.Screen
        options={{ title: entry ? `${entry.name} docs` : 'Documentation' }}
      />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => router.back()}>
          Done
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {entry ? (
        <ReferencePanel entryId={entry.id} />
      ) : (
        <Notice title="Component not found">
          Close this sheet and return to the catalog.
        </Notice>
      )}
    </>
  );
}
