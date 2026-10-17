import { type ReactElement, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import type { TuningValues } from '../model/tuning';
import type { Example } from '../model/types';
import { buildVariants } from '../model/variants';
import { ExampleCard } from './example-card';

interface GalleryRow {
  key: string;
  example: Example;
  values: TuningValues;
}
const galleryWindow = {
  initialRows: 2,
  rowsPerBatch: 2,
  viewportCount: 3,
} as const;
function renderExample({ item, index }: ListRenderItemInfo<GalleryRow>) {
  return (
    <ExampleCard
      example={item.example}
      index={index}
      initialValues={item.values}
      customization={false}
    />
  );
}
export function ExampleGallery({
  examples,
  header,
}: {
  examples: Example[];
  header: ReactElement;
}) {
  const rows = useMemo(
    () =>
      examples.flatMap((example) => [
        { key: `${example.id}:baseline`, example, values: {} },
        ...buildVariants(example.controls ?? []).map((variant) => ({
          key: `${example.id}:${variant.id}`,
          example: {
            ...example,
            title: variant.title,
            description: '',
            code: undefined,
          },
          values: variant.values,
        })),
      ]),
    [examples],
  );
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustKeyboardInsets
      data={rows}
      keyExtractor={(row) => row.key}
      initialNumToRender={galleryWindow.initialRows}
      maxToRenderPerBatch={galleryWindow.rowsPerBatch}
      windowSize={galleryWindow.viewportCount}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, gap: 24 }}
      ListHeaderComponent={header}
      renderItem={renderExample}
    />
  );
}
