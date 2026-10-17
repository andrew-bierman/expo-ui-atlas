import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView, Share } from 'react-native';
import { appConfig, useTranslation } from '../../../shared/config';
import {
  dependencyNotices,
  isLegalDocumentId,
  LegalDocumentId,
  legalDocuments,
} from '../../../shared/legal';
import { MarkdownDocument } from '../../../shared/markdown';
import { layout, spacing } from '../../../shared/theme';
import { Notice } from '../../../shared/ui';

export function LegalPage() {
  const { t } = useTranslation();
  const { document } = useLocalSearchParams<{ document: string }>();
  const content = isLegalDocumentId(document)
    ? legalDocuments[document]
    : undefined;
  return (
    <>
      <Stack.Screen
        options={{ title: content?.title ?? t('navigation.legal') }}
      />
      <Stack.Toolbar placement="right">
        {Platform.OS !== 'web' && document === LegalDocumentId.Notices ? (
          <Stack.Toolbar.Button
            onPress={() => {
              void Share.share({ message: dependencyNotices });
            }}
          >
            {t('legal.shareNotices')}
          </Stack.Toolbar.Button>
        ) : null}
        <Stack.Toolbar.Button
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.replace('/');
          }}
        >
          {t('navigation.done')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: spacing.xxxl,
          gap: spacing.md,
          maxWidth: layout.readingWidth,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {Platform.OS === 'web' ? (
          <Link href="/">{t('navigation.done')}</Link>
        ) : null}
        {Platform.OS === 'web' && document === LegalDocumentId.Notices ? (
          <Link href={appConfig.publicResources.dependencyNotices}>
            {t('legal.shareNotices')}
          </Link>
        ) : null}
        {content ? (
          <MarkdownDocument
            source={content.markdown}
            sourceUrl={content.sourceUrl}
          />
        ) : (
          <Notice title={t('legal.notFoundTitle')}>
            {t('legal.notFoundBody')}
          </Notice>
        )}
      </ScrollView>
    </>
  );
}
