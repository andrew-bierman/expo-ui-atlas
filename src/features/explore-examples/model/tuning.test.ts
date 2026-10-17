import { expect, test } from 'bun:test';
import { defaultTuning, type TuningControl, updateTuning } from './tuning';

const controls: TuningControl[] = [
  {
    id: 'style',
    label: 'Style',
    type: 'select',
    options: ['filled', 'text'],
    defaultValue: 'filled',
  },
  {
    id: 'size',
    label: 'Size',
    type: 'range',
    min: 10,
    max: 40,
    step: 5,
    defaultValue: 20,
  },
  { id: 'enabled', label: 'Enabled', type: 'toggle', defaultValue: true },
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
