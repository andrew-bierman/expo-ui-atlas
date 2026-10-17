import { Column, Host, Picker, Text } from '@expo/ui';
import { type ReactElement, useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Body, Pill } from '../../../shared/ui';
import { ControlId } from '../model/control-identifiers';
import type { Example } from '../model/types';
import { buildVariants, type Variant } from '../model/variants';
import { ExampleCard } from './example-card';

enum GalleryMode {
  Variants = 'variants',
  Playground = 'playground',
}
enum VariantGroup {
  All = 'all',
}
const galleryWindow = {
  initialRows: 2,
  batchSize: 2,
  visibleWindows: 3,
} as const;
const galleryLayout = { maxWidth: 900, bottomInset: 60 } as const;

const styles = {
  content: {
    padding: 20,
    paddingBottom: galleryLayout.bottomInset,
    maxWidth: galleryLayout.maxWidth,
    width: '100%' as const,
    alignSelf: 'center' as const,
    gap: 22,
  },
};

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
  const [mode, setMode] = useState<GalleryMode>(GalleryMode.Variants);
  const [group, setGroup] = useState<ControlId | VariantGroup>(
    VariantGroup.All,
  );
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
    mode === GalleryMode.Playground
      ? rows.filter((row) => !row.variant)
      : rows.filter(
          (row) =>
            group === VariantGroup.All || row.variant?.controlId === group,
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
        customization={mode === GalleryMode.Playground}
      />
    ),
    [mode],
  );
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      key={mode}
      data={visible}
      keyExtractor={(row) => row.key}
      initialNumToRender={galleryWindow.initialRows}
      maxToRenderPerBatch={galleryWindow.batchSize}
      windowSize={galleryWindow.visibleWindows}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={{ gap: 22 }}>
          {header}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Pill
              label="Variants"
              selected={mode === GalleryMode.Variants}
              onPress={() => setMode(GalleryMode.Variants)}
            />
            <Pill
              label="Playground"
              selected={mode === GalleryMode.Playground}
              onPress={() => setMode(GalleryMode.Playground)}
            />
          </View>
          <Host
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            colorScheme={t.dark ? 'dark' : 'light'}
            style={{ width: '100%' }}
          >
            <Column spacing={12}>
              <Text>
                {mode === GalleryMode.Variants
                  ? 'See the variations.'
                  : 'Try your own combination.'}
              </Text>
              {mode === GalleryMode.Variants && groups.length > 0 ? (
                <Picker
                  selectedValue={group}
                  onValueChange={(value) =>
                    setGroup(
                      groups.find(([id]) => id === value)?.[0] ??
                        VariantGroup.All,
                    )
                  }
                >
                  <Picker.Item
                    value={VariantGroup.All}
                    label={`All variations · ${rows.length} examples`}
                  />
                  {groups.map(([id, label]) => (
                    <Picker.Item key={id} value={id} label={label} />
                  ))}
                </Picker>
              ) : null}
            </Column>
          </Host>
          <Body>
            {mode === GalleryMode.Variants
              ? 'Ready-made, interactive examples—no setup needed. Every listed style and on/off state is included. Numeric settings show minimum, default, and maximum samples. Comparisons isolate one setting, with related settings enabled where needed. Use Playground to combine them.'
              : 'Customization is optional. Open Customize to mix props, adjust the preview, or apply JSON. Reset restores the starting example.'}
          </Body>
          <Body>
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
