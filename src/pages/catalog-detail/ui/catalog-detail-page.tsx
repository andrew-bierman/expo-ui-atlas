import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Linking, Platform, ScrollView, Text, View } from 'react-native';
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
export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  const t = useTheme();
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
  const docs =
    entry.docs ??
    `https://docs.expo.dev/versions/v58.0.0/sdk/ui/${entry.family === Family.SwiftUI ? 'swift-ui' : entry.family === Family.Compose ? 'jetpack-compose' : 'universal'}/`;
  const header = (
    <View style={{ gap: 22 }}>
      <Text
        style={{
          color: t.accent,
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 1.5,
        }}
      >
        {families[entry.family].label.toUpperCase()} /{' '}
        {entry.category.toUpperCase()}
      </Text>
      <Text
        accessibilityRole="header"
        style={{
          color: t.text,
          fontSize: 42,
          fontWeight: '600',
          letterSpacing: -1.4,
        }}
      >
        {entry.name}
      </Text>
      <Body muted>{entry.summary}</Body>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pill
          label={entry.platforms.map((p) => platformLabels[p]).join(' + ')}
        />
        <Pill
          label="Official documentation ↗"
          onPress={() => {
            void Linking.openURL(docs);
          }}
        />
      </View>
      {entry.notes ? <Notice title="Field notes">{entry.notes}</Notice> : null}
    </View>
  );
  const footer = (
    <View style={{ gap: 10 }}>
      <Text style={{ color: t.text, fontWeight: '700' }}>
        Building blocks in this collection
      </Text>
      <Body muted>{entry.exports.join(' · ')}</Body>
    </View>
  );
  const content = supported ? (
    <ExampleGallery
      key={entry.id}
      examples={examples}
      header={header}
      footer={footer}
    />
  ) : (
    <ScrollView
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
