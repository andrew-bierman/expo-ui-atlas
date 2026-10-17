import { expect, test } from 'bun:test';
import { nativeDefault, resolveHostEnvironment } from './host-environment';

test('native defaults leave theme, appearance and locale direction to the host', () => {
  expect(
    resolveHostEnvironment(nativeDefault, nativeDefault, nativeDefault),
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
