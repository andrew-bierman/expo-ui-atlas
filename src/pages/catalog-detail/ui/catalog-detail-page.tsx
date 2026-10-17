import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
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
import { useTheme } from '../../../shared/theme';
import { Body, Notice, Pill } from '../../../shared/ui';
import { ReferencePanel } from './reference-panel';

enum DetailMode {
  Examples = 'examples',
  Reference = 'reference',
}
export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  const t = useTheme();
  const [mode, setMode] = useState(DetailMode.Examples);
  if (!entry)
    return (
      <View style={{ padding: 24, gap: 20 }}>
        <Notice title="That specimen isn’t in the atlas">
          The link may be out of date. Return to the catalog to keep exploring.
        </Notice>
        <Link href="/" style={{ color: t.accent }}>
          Back to catalog →
        </Link>
      </View>
    );
  const supported = entry.platforms.some((p) => p === Platform.OS);
  const examples =
    (entry.family === Family.Universal ? universalExamples : nativeExamples)[
      entry.id
    ] ?? [];
  const header = (
    <View style={{ gap: 22 }}>
      <Body>{`${families[entry.family].label} · ${entry.category}`}</Body>
      <Body>{entry.summary}</Body>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pill
          label={entry.platforms.map((p) => platformLabels[p]).join(' + ')}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pill
          label="Examples"
          selected={mode === DetailMode.Examples}
          onPress={() => setMode(DetailMode.Examples)}
        />
        <Pill
          label="Reference"
          selected={mode === DetailMode.Reference}
          onPress={() => setMode(DetailMode.Reference)}
        />
      </View>
      {mode === DetailMode.Examples && entry.notes ? (
        <Notice title="Field notes">{entry.notes}</Notice>
      ) : null}
    </View>
  );
  const footer = (
    <View style={{ gap: 10 }}>
      <Body>Building blocks in this collection</Body>
      <Body>{entry.exports.join(' · ')}</Body>
    </View>
  );
  const content =
    mode === DetailMode.Reference ? (
      <ReferencePanel key={entry.id} entryId={entry.id} header={header} />
    ) : supported ? (
      <ExampleGallery
        key={entry.id}
        examples={examples}
        header={header}
        footer={footer}
      />
    ) : (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 22 }}
      >
        {header}
        <Notice
          title={`Explore this collection on ${entry.platforms.map((p) => platformLabels[p]).join(' or ')}`}
        >
          These examples require their supported platform. Open this app in
          matching Expo Go on that device to explore the live variants.
        </Notice>
        {footer}
      </ScrollView>
    );
  return (
    <>
      <Stack.Screen options={{ title: entry.name }} />
      {content}
    </>
  );
}
