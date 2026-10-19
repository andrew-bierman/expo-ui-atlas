import { type ComponentRef, useRef, useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  type CatalogEntryId,
  canReadReferenceInline,
  findReference,
  referenceManifest,
  referencesForEntry,
} from '../../../entities/catalog-entry';
import { useTranslation } from '../../../shared/config';
import { expoDocsLicense } from '../../../shared/legal';
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
export function ReferencePanel({ entryId }: { entryId: CatalogEntryId }) {
  const { t } = useTranslation();
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
      <Body>
        {t('reference.attribution', {
          sdkVersion: referenceManifest.sdkVersion,
          date: referenceManifest.fetchedAt.slice(0, 10),
        })}
      </Body>
      {pages.length === 1 ? <Body>{t('reference.overview')}</Body> : null}
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
            label={t('reference.openOfficial')}
            onPress={() => {
              void Linking.openURL(page.sourceUrl);
            }}
          />
          {canReadReferenceInline(page, Platform.OS) ? (
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
                if (
                  !linked ||
                  !canReadReferenceInline(linked, Platform.OS) ||
                  destination.hash
                ) {
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
          ) : (
            <Body>{t('reference.externalOnly')}</Body>
          )}
        </>
      ) : (
        <Body>{t('reference.missing')}</Body>
      )}
      <MarkdownDocument
        source={expoDocsLicense.text}
        sourceUrl={expoDocsLicense.sourceUrl}
      />
    </ScrollView>
  );
}
