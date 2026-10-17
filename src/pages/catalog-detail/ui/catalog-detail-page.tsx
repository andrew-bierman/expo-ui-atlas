import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import {
  Family,
  findEntry,
  platformLabels,
} from '../../../entities/catalog-entry';
import {
  ExampleGallery,
  nativeExamples,
  universalExamples,
} from '../../../features/explore-examples';
import { useTranslation } from '../../../shared/config';
import { Body, Notice } from '../../../shared/ui';

export default function Detail() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = findEntry(id);
  if (!entry)
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Notice title={t('catalog.notFound')}>
          {t('catalog.notFoundBody')}
        </Notice>
        <Link href="/">{t('catalog.back')}</Link>
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
            {t('navigation.customize')}
          </Stack.Toolbar.Button>
        ) : null}
        <Stack.Toolbar.Button
          onPress={() => router.push(`/reference/${entry.id}`)}
        >
          {t('navigation.docs')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {Platform.OS === 'web' ? (
        <>
          {supported ? (
            <Link href={`/playground/${entry.id}`}>
              {t('navigation.customize')}
            </Link>
          ) : null}
          <Link href={`/reference/${entry.id}`}>{t('navigation.docs')}</Link>
        </>
      ) : null}
      {supported ? (
        <ExampleGallery
          examples={examples}
          header={
            <Body>
              {t('catalog.detailSummary', {
                family: t(`families.${entry.family}.label`),
                summary: entry.summary,
              })}
            </Body>
          }
        />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Notice
            title={t('catalog.availableOn', {
              platforms: entry.platforms
                .map((p) => platformLabels[p])
                .join(t('catalog.platformSeparator')),
            })}
          >
            {entry.summary}
          </Notice>
        </ScrollView>
      )}
    </>
  );
}
