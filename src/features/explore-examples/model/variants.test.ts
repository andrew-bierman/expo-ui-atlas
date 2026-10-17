import { expect, test } from 'bun:test';
import type { TuningControl } from './tuning';
import { buildVariants } from './variants';

const controls: TuningControl[] = [
  {
    id: 'style',
    label: 'Style',
    type: 'select',
    options: ['filled', 'outlined', 'text'],
    defaultValue: 'filled',
  },
  { id: 'enabled', label: 'Enabled', type: 'toggle', defaultValue: true },
  {
    id: 'size',
    label: 'Size',
    type: 'range',
    min: 10,
    max: 40,
    step: 5,
    defaultValue: 20,
  },
  { id: 'caption', label: 'Caption', type: 'text', defaultValue: 'Hello' },
];
test('gallery exposes every enum case and boolean state as ready-to-use examples', () => {
  const variants = buildVariants(controls);
  expect(
    variants.filter((v) => v.controlId === 'style').map((v) => v.values.style),
  ).toEqual(['filled', 'outlined', 'text']);
  expect(
    variants
      .filter((v) => v.controlId === 'enabled')
      .map((v) => v.values.enabled),
  ).toEqual([true, false]);
  expect(new Set(variants.map((v) => v.id)).size).toBe(variants.length);
  expect(variants.find((v) => v.id === 'style:1')?.values).toEqual({
    style: 'outlined',
  });
});
test('continuous values have labeled boundary/default samples; free text stays in the playground', () => {
  const variants = buildVariants(controls);
  expect(
    variants.filter((v) => v.controlId === 'size').map((v) => v.values.size),
  ).toEqual([10, 20, 40]);
  expect(variants.filter((v) => v.controlId === 'caption')).toEqual([]);
  expect(buildVariants([])).toEqual([]);
});

test('dependent variants enable their presentation context while retaining the varied value', () => {
  const variants = buildVariants([
    {
      id: 'lineWidth',
      label: 'Line width',
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 3,
      previewValues: { chartType: 'line' },
    },
  ]);
  expect(variants[0].values).toEqual({ chartType: 'line', lineWidth: 1 });
  expect(variants[2].values).toEqual({ chartType: 'line', lineWidth: 10 });
});
