import { router, Stack, useLocalSearchParams } from 'expo-router';
import { findEntry } from '../../../entities/catalog-entry';
import { useTranslation } from '../../../shared/config';
import { Notice } from '../../../shared/ui';
import { ReferencePanel } from './reference-panel';
export function CatalogReferencePage() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  return (
    <>
      <Stack.Screen
        options={{
          title: entry
            ? t('navigation.docsTitle', { name: entry.name })
            : t('navigation.documentation'),
        }}
      />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => router.back()}>
          {t('navigation.done')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {entry ? (
        <ReferencePanel entryId={entry.id} />
      ) : (
        <Notice title={t('catalog.notFound')}>
          {t('reference.closeNotFound')}
        </Notice>
      )}
    </>
  );
}
