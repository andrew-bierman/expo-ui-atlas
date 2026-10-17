import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import { Family, findEntry } from '../../../entities/catalog-entry';
import {
  ExampleCard,
  nativeExamples,
  universalExamples,
} from '../../../features/explore-examples';
import { Notice } from '../../../shared/ui';
export function PlaygroundPage() {
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
        options={{ title: entry ? `Customize ${entry.name}` : 'Customize' }}
      />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => router.back()}>
          Done
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
          <Notice title="Unavailable on this platform">
            Choose a component available on this device.
          </Notice>
        )}
      </ScrollView>
    </>
  );
}
