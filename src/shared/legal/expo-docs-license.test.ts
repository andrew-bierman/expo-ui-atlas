import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { expoDocsLicense } from './expo-docs-license';

test('distributed documentation notice preserves the release license verbatim', async () => {
  const releaseNotice = await readFile(
    new URL('../../../docs/release/expo-docs-license.txt', import.meta.url),
    'utf8',
  );
  expect<string>(expoDocsLicense.text).toBe(releaseNotice);
});
