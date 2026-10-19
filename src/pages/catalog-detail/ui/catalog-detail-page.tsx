import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import { Family, findEntry } from '../../../entities/catalog-entry';
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
  const entry = findEntry(id, Platform.OS);
  if (!entry)
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Notice title={t('catalog.notFound')}>
          {t('catalog.notFoundBody')}
        </Notice>
        <Link href="/">{t('catalog.back')}</Link>
      </ScrollView>
    );
  const examples =
    (entry.family === Family.Universal ? universalExamples : nativeExamples)[
      entry.id
    ] ?? [];
  return (
    <>
      <Stack.Screen options={{ title: entry.name }} />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={() => router.push(`/playground/${entry.id}`)}
        >
          {t('navigation.customize')}
        </Stack.Toolbar.Button>
        <Stack.Toolbar.Button
          onPress={() => router.push(`/reference/${entry.id}`)}
        >
          {t('navigation.docs')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {Platform.OS === 'web' ? (
        <>
          <Link href={`/playground/${entry.id}`}>
            {t('navigation.customize')}
          </Link>
          <Link href={`/reference/${entry.id}`}>{t('navigation.docs')}</Link>
        </>
      ) : null}
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
    </>
  );
}
