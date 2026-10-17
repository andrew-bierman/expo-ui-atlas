import { expect, test } from 'bun:test';
import { ControlId, ControlType } from './control-identifiers';
import type { TuningControl } from './tuning';
import { defaultTuning, updateTuning } from './tuning-values';

const controls: TuningControl[] = [
  {
    id: ControlId.Style,
    label: 'Style',
    type: ControlType.Select,
    options: ['filled', 'text'],
    defaultValue: 'filled',
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
    id: ControlId.Enabled,
    label: 'Enabled',
    type: ControlType.Toggle,
    defaultValue: true,
  },
];
test('tuning starts from declared values and rejects invalid options and types', () => {
  const values = defaultTuning(controls);
  expect(values).toEqual({ style: 'filled', size: 20, enabled: true });
  expect(updateTuning(controls, values, 'style', 'unknown')).toBe(values);
  expect(updateTuning(controls, values, 'enabled', 'false')).toBe(values);
  expect(updateTuning(controls, values, 'size', Number.NaN)).toBe(values);
  expect(updateTuning(controls, values, 'missing', 3)).toBe(values);
  expect(updateTuning(controls, values, 'style', 'text').style).toBe('text');
});
test('numeric tuning clamps and snaps to supported increments without mutating old state', () => {
  const values = defaultTuning(controls);
  expect(updateTuning(controls, values, 'size', 99).size).toBe(40);
  expect(updateTuning(controls, values, 'size', -20).size).toBe(10);
  expect(updateTuning(controls, values, 'size', 27).size).toBe(25);
  expect(values.size).toBe(20);
});
test('JSON configurations validate known controls and do not accept arbitrary native props', async () => {
  const { parseTuning } = await import('./tuning-values');
  expect(parseTuning(controls, '{')).toEqual({ error: 'Enter valid JSON.' });
  expect(parseTuning(controls, '[]')).toEqual({
    error: 'Use a JSON object of control values.',
  });
  expect(parseTuning(controls, '{"nativeSecret":true}')).toEqual({
    error: 'Unknown control: nativeSecret',
  });
  expect(parseTuning(controls, '{"style":"wrong"}')).toEqual({
    error: 'Invalid value for style',
  });
  expect(parseTuning(controls, '{"style":"text","size":27}')).toEqual({
    values: { style: 'text', size: 25, enabled: true },
  });
});
