import { type ComponentRef, type ReactElement, useRef, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import {
  type CatalogEntryId,
  findReference,
  referenceManifest,
  referencesForEntry,
} from '../../../entities/catalog-entry';
import { MarkdownDocument } from '../../../shared/markdown';
import { layout, spacing } from '../../../shared/theme';
import { Body, Pill } from '../../../shared/ui';

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
    maxWidth: layout.readingWidth,
    width: '100%',
    alignSelf: 'center',
  },
});
export function ReferencePanel({
  entryId,
  header,
}: {
  entryId: CatalogEntryId;
  header: ReactElement;
}) {
  const pages = referencesForEntry(entryId);
  const [selectedId, setSelectedId] = useState(pages[0]?.id);
  const page = findReference(selectedId ?? '');
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      ref={scroll}
      contentContainerStyle={styles.content}
    >
      {header}
      <Body>
        Official Expo documentation · SDK {referenceManifest.sdkVersion} ·
        Bundled {referenceManifest.fetchedAt.slice(0, 10)} · Available offline
      </Body>
      {pages.length === 1 ? (
        <Body>
          No dedicated component page is indexed for this collection in this
          SDK. The official family overview is available below.
        </Body>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
        {pages.map((item) => (
          <Pill
            key={item.id}
            label={item.title}
            selected={page?.id === item.id}
            onPress={() => setSelectedId(item.id)}
          />
        ))}
      </View>
      {page ? (
        <>
          <Pill
            label="Open official page ↗"
            onPress={() => {
              void Linking.openURL(page.sourceUrl);
            }}
          />
          <MarkdownDocument
            key={page.id}
            source={page.markdown.replace(
              /^This documentation is available as Markdown for AI agents and LLMs\.[^\n]*\n/m,
              '',
            )}
            sourceUrl={page.sourceUrl}
            onNavigate={(url) => {
              const linked = findReference(url);
              const destination = new URL(url);
              if (!linked || destination.hash) {
                if (destination.origin !== new URL(page.sourceUrl).origin)
                  return false;
                destination.pathname = destination.pathname.replace(
                  /(?:\/index)?\.md$/,
                  '/',
                );
                void Linking.openURL(destination.href);
                return true;
              }
              setSelectedId(linked.id);
              scroll.current?.scrollTo({ y: 0, animated: false });
              return true;
            }}
          />
        </>
      ) : (
        <Body>No bundled reference is available for this collection.</Body>
      )}
    </ScrollView>
  );
}
