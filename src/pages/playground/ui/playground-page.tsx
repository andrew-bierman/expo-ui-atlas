import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import { Family, findEntry } from '../../../entities/catalog-entry';
import {
  ExampleCard,
  nativeExamples,
  universalExamples,
} from '../../../features/explore-examples';
import { useTranslation } from '../../../shared/config';
import { Notice } from '../../../shared/ui';
export function PlaygroundPage() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  const supported = entry?.platforms.some((p) => p === Platform.OS);
  const examples =
    entry && supported
      ? ((entry.family === Family.Universal
          ? universalExamples
          : nativeExamples)[entry.id] ?? [])
      : [];
  return (
    <>
      <Stack.Screen
        options={{
          title: entry
            ? t('navigation.customizeTitle', { name: entry.name })
            : t('navigation.customize'),
        }}
      />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => router.back()}>
          {t('navigation.done')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, gap: 24 }}
      >
        {examples.length ? (
          examples.map((example, index) => (
            <ExampleCard key={example.id} example={example} index={index} />
          ))
        ) : (
          <Notice title={t('catalog.unavailable')}>
            {t('catalog.chooseAvailable')}
          </Notice>
        )}
      </ScrollView>
    </>
  );
}
