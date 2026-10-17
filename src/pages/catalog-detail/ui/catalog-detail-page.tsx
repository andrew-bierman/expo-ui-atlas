import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Linking, Platform, ScrollView, Text, View } from 'react-native';
import { families, findEntry } from '../../../entities/catalog-entry';
import {
  ExampleCard,
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
    (entry.family === 'universal' ? universalExamples : nativeExamples)[
      entry.id
    ] ?? [];
  const docs =
    entry.docs ??
    `https://docs.expo.dev/versions/v58.0.0/sdk/ui/${entry.family === 'swiftui' ? 'swift-ui' : entry.family === 'compose' ? 'jetpack-compose' : 'universal'}/`;
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
        maxWidth: 900,
        width: '100%',
        alignSelf: 'center',
        gap: 22,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: entry.name }} />
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
          label={entry.platforms
            .map((p) => ({ ios: 'iOS', android: 'Android', web: 'Web' })[p])
            .join(' + ')}
        />
        <Pill
          label="Official documentation ↗"
          onPress={() => {
            void Linking.openURL(docs);
          }}
        />
      </View>
      {entry.notes ? <Notice title="Field notes">{entry.notes}</Notice> : null}
      {!supported ? (
        <Notice
          title={`Explore this collection on ${entry.family === 'swiftui' ? 'iOS' : 'Android'}`}
        >
          These examples use {families[entry.family].label} directly. Open this
          app in matching Expo Go on the supported platform to interact with
          them. Universal examples are available here.
        </Notice>
      ) : (
        examples.map((example, i) => (
          <ExampleCard
            key={`${entry.id}-${example.id}`}
            example={example}
            index={i}
          />
        ))
      )}
      <View style={{ gap: 10 }}>
        <Text style={{ color: t.text, fontWeight: '700' }}>
          Building blocks in this collection
        </Text>
        <Body muted>{entry.exports.join(' · ')}</Body>
      </View>
    </ScrollView>
  );
}
