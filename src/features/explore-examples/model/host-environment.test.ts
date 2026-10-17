import { expect, test } from 'bun:test';
import { environmentControls } from '../config/environment';
import { ControlId } from './control-identifiers';
import { nativeDefault, resolveHostEnvironment } from './host-environment';
import { defaultTuning, parseTuning } from './tuning-values';

test('native defaults leave theme, appearance and locale direction to the host', () => {
  expect(
    resolveHostEnvironment(nativeDefault, nativeDefault, nativeDefault),
  ).toEqual({
    colorScheme: undefined,
    seedColor: undefined,
    layoutDirection: undefined,
  });
});

test('fresh and reset configurations inherit the native environment after explicit customization', () => {
  expect(
    parseTuning(
      environmentControls,
      '{"appearance":"dark","accent":"#246b4d","direction":"rightToLeft"}',
    ),
  ).toHaveProperty('values');
  const reset = parseTuning(environmentControls, '{}');
  expect(reset).toEqual({ values: defaultTuning(environmentControls) });
  if ('error' in reset) throw new Error(reset.error);
  expect(
    resolveHostEnvironment(
      String(reset.values[ControlId.Appearance]),
      String(reset.values[ControlId.Accent]),
      String(reset.values[ControlId.Direction]),
    ),
  ).toEqual({
    colorScheme: undefined,
    seedColor: undefined,
    layoutDirection: undefined,
  });
});
test('explicit playground overrides reach the native host', () => {
  expect(resolveHostEnvironment('dark', '#246b4d', 'rightToLeft')).toEqual({
    colorScheme: 'dark',
    seedColor: '#246b4d',
    layoutDirection: 'rightToLeft',
  });
});
