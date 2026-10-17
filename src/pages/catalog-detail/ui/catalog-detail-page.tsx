import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import {
  Family,
  families,
  findEntry,
  platformLabels,
} from '../../../entities/catalog-entry';
import {
  ExampleGallery,
  nativeExamples,
  universalExamples,
} from '../../../features/explore-examples';
import { Body, Notice } from '../../../shared/ui';

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  if (!entry)
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Notice title="Component not found">
          Return to the catalog to keep exploring.
        </Notice>
        <Link href="/">Back to catalog</Link>
      </ScrollView>
    );
  const supported = entry.platforms.some((p) => p === Platform.OS);
  const examples =
    (entry.family === Family.Universal ? universalExamples : nativeExamples)[
      entry.id
    ] ?? [];
  return (
    <>
      <Stack.Screen options={{ title: entry.name }} />
      <Stack.Toolbar placement="right">
        {supported ? (
          <Stack.Toolbar.Button
            onPress={() => router.push(`/playground/${entry.id}`)}
          >
            Customize
          </Stack.Toolbar.Button>
        ) : null}
        <Stack.Toolbar.Button
          onPress={() => router.push(`/reference/${entry.id}`)}
        >
          Docs
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {Platform.OS === 'web' ? (
        <>
          {supported ? (
            <Link href={`/playground/${entry.id}`}>Customize</Link>
          ) : null}
          <Link href={`/reference/${entry.id}`}>Docs</Link>
        </>
      ) : null}
      {supported ? (
        <ExampleGallery
          examples={examples}
          header={
            <Body>{`${families[entry.family].label} · ${entry.summary}`}</Body>
          }
        />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Notice
            title={`Available on ${entry.platforms.map((p) => platformLabels[p]).join(' or ')}`}
          >
            {entry.summary}
          </Notice>
        </ScrollView>
      )}
    </>
  );
}
