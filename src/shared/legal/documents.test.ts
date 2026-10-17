import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { appConfig } from '../config';
import {
  dependencyNotices,
  isLegalDocumentId,
  LegalDocumentId,
  legalDocuments,
} from './documents';

test('bundled public documents match their single authoring source', async () => {
  for (const id of Object.values(LegalDocumentId)) {
    expect(legalDocuments[id].markdown).toBe(
      await readFile(
        new URL(
          `../../../docs/${id === LegalDocumentId.Notices ? 'notices' : id}.md`,
          import.meta.url,
        ),
        'utf8',
      ),
    );
    expect(legalDocuments[id].sourceUrl).toBe(appConfig.publicResources[id]);
    expect(legalDocuments[id].markdown).not.toContain(
      'PUBLIC_PRIVACY_POLICY_URL',
    );
    expect(isLegalDocumentId(id)).toBe(true);
  }
  expect(dependencyNotices).toBe(
    await readFile(
      new URL('../../../docs/dependency-notices.md', import.meta.url),
      'utf8',
    ),
  );
});

test('legal route validation rejects unknown and inherited keys', () => {
  for (const value of [
    undefined,
    null,
    [],
    {},
    'constructor',
    '__proto__',
    'missing',
  ])
    expect(isLegalDocumentId(value)).toBe(false);
});
