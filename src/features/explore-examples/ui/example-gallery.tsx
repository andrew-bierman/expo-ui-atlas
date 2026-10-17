import { Column, Host, Picker, Text } from '@expo/ui';
import { type ReactElement, useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Body, Pill } from '../../../shared/ui';
import type { Example } from '../model/types';
import { buildVariants, type Variant } from '../model/variants';
import { ExampleCard } from './example-card';

interface GalleryRow {
  key: string;
  example: Example;
  variant?: Variant;
}
export function ExampleGallery({
  examples,
  header,
  footer,
}: {
  examples: Example[];
  header: ReactElement;
  footer: ReactElement;
}) {
  const t = useTheme();
  const [mode, setMode] = useState<'variants' | 'playground'>('variants');
  const [group, setGroup] = useState('all');
  const rows = useMemo(
    () =>
      examples.flatMap((example): GalleryRow[] => [
        { key: `${example.id}:baseline`, example },
        ...buildVariants(example.controls ?? []).map((variant) => ({
          key: `${example.id}:${variant.id}`,
          example,
          variant,
        })),
      ]),
    [examples],
  );
  const groups = useMemo(
    () => [
      ...new Map(
        rows.flatMap((row) =>
          row.variant
            ? [[row.variant.controlId, row.variant.group] as const]
            : [],
        ),
      ),
    ],
    [rows],
  );
  const visible =
    mode === 'playground'
      ? rows.filter((row) => !row.variant)
      : rows.filter(
          (row) => group === 'all' || row.variant?.controlId === group,
        );
  const renderRow = useCallback(
    ({ item, index }: { item: GalleryRow; index: number }) => (
      <ExampleCard
        example={
          item.variant
            ? {
                ...item.example,
                title: item.variant.title,
                description: item.variant.description,
                code: undefined,
              }
            : item.example
        }
        index={index}
        initialValues={item.variant?.values}
        customization={mode === 'playground'}
      />
    ),
    [mode],
  );
  return (
    <FlatList
      key={mode}
      data={visible}
      keyExtractor={(row) => row.key}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={3}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
        maxWidth: 900,
        width: '100%',
        alignSelf: 'center',
        gap: 22,
      }}
      ListHeaderComponent={
        <View style={{ gap: 22 }}>
          {header}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Pill
              label="Variants"
              selected={mode === 'variants'}
              onPress={() => setMode('variants')}
            />
            <Pill
              label="Playground"
              selected={mode === 'playground'}
              onPress={() => setMode('playground')}
            />
          </View>
          <Host
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            colorScheme={t.dark ? 'dark' : 'light'}
            seedColor={t.accent}
            style={{ width: '100%' }}
          >
            <Column spacing={12}>
              <Text
                textStyle={{ color: t.text, fontSize: 24, fontWeight: '600' }}
              >
                {mode === 'variants'
                  ? 'See the variations.'
                  : 'Try your own combination.'}
              </Text>
              {mode === 'variants' && groups.length > 0 ? (
                <Picker selectedValue={group} onValueChange={setGroup}>
                  <Picker.Item
                    value="all"
                    label={`All variations · ${rows.length} examples`}
                  />
                  {groups.map(([id, label]) => (
                    <Picker.Item key={id} value={id} label={label} />
                  ))}
                </Picker>
              ) : null}
            </Column>
          </Host>
          <Body muted>
            {mode === 'variants'
              ? 'Ready-made, interactive examples—no setup needed. Every listed style and on/off state is included. Numeric settings show minimum, default, and maximum samples. Comparisons isolate one setting, with related settings enabled where needed. Use Playground to combine them.'
              : 'Customization is optional. Open Customize to mix props, adjust the preview, or apply JSON. Reset restores the starting example.'}
          </Body>
          <Body muted>
            Examples farther down load as you scroll. Local interactions may
            reset when an example leaves the rendered window.
          </Body>
        </View>
      }
      renderItem={renderRow}
      ListFooterComponent={footer}
    />
  );
}
