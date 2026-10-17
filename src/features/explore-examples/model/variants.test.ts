import { expect, test } from 'bun:test';
import { ControlId, ControlType } from './control-identifiers';
import type { TuningControl } from './tuning';
import { buildVariants } from './variants';

const controls: TuningControl[] = [
  {
    id: ControlId.Style,
    label: 'Style',
    type: ControlType.Select,
    options: ['filled', 'outlined', 'text'],
    defaultValue: 'filled',
  },
  {
    id: ControlId.Enabled,
    label: 'Enabled',
    type: ControlType.Toggle,
    defaultValue: true,
  },
  {
    id: ControlId.Size,
    label: 'Size',
    type: ControlType.Range,
    min: 10,
    max: 40,
    step: 5,
    defaultValue: 20,
  },
  {
    id: ControlId.Caption,
    label: 'Caption',
    type: ControlType.Text,
    defaultValue: 'Hello',
  },
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

test('a boundary default appears once and dependency context cannot replace the varied setting', () => {
  const previewValues = { [ControlId.Size]: 99, [ControlId.Enabled]: true };
  const variants = buildVariants([
    {
      id: ControlId.Size,
      label: 'Size',
      type: ControlType.Range,
      min: 10,
      max: 40,
      step: 5,
      defaultValue: 10,
      previewValues,
    },
  ]);
  expect(variants.map((variant) => variant.values)).toEqual([
    { size: 10, enabled: true },
    { size: 40, enabled: true },
  ]);
  expect(previewValues).toEqual({ size: 99, enabled: true });
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
      id: ControlId.LineWidth,
      label: 'Line width',
      type: ControlType.Range,
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 3,
      previewValues: { [ControlId.ChartType]: 'line' },
    },
  ]);
  expect(variants[0]?.values).toEqual({ chartType: 'line', lineWidth: 1 });
  expect(variants[2]?.values).toEqual({ chartType: 'line', lineWidth: 10 });
});
