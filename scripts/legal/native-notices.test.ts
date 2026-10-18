import { expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import reactNative from '../../node_modules/react-native/package.json';
import manifest from './native-notices.json';

test('offline export preserves every pinned native dependency notice', () => {
  const directory = import.meta.dir;
  const exported = readFileSync(
    resolve(directory, '../../docs/dependency-notices.md'),
    'utf8',
  );
  expect(manifest.reactNativeVersion).toBe(reactNative.version);
  expect(manifest.notices).toHaveLength(7);
  for (const notice of manifest.notices) {
    const bytes = readFileSync(resolve(directory, notice.file));
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(
      notice.sha256,
    );
    expect(exported).toContain(notice.component);
    expect(exported).toContain(bytes.toString('utf8').trimEnd());
  }
});
