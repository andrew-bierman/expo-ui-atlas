import { expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import uiPackage from '../../../../node_modules/@expo/ui/package.json';
import expoPackage from '../../../../node_modules/expo/package.json';
import bundle from '../data/reference/bundle.json';
import { catalog } from './catalog';
import {
  findReference,
  referenceManifest,
  referencesForEntry,
} from './reference';
import { CatalogEntryId } from './types';

test('offline reference matches installed SDK and retains complete source pages', () => {
  expect(referenceManifest.sdkVersion.split('.')[0]).toBe(
    expoPackage.version.split('.')[0],
  );
  expect(referenceManifest.packageVersion).toBe(uiPackage.version);
  for (const page of bundle.pages) {
    expect(page.sourceUrl).toContain(
      `/versions/v${referenceManifest.sdkVersion}/sdk/ui/`,
    );
    expect(createHash('sha256').update(page.markdown).digest('hex')).toBe(
      page.sha256,
    );
    expect(findReference(page.markdownUrl)?.id).toBe(page.id);
  }
  for (const entry of catalog)
    expect(referencesForEntry(entry.id).length).toBeGreaterThan(0);
});
test('collections resolve specific references rather than generic API prop headings', () => {
  expect(
    referencesForEntry(CatalogEntryId.UniversalToggles).map(
      (page) => page.title,
    ),
  ).toContain('Checkbox');
  expect(
    referencesForEntry(CatalogEntryId.ComposeButtons).map((page) => page.title),
  ).toContain('Button');
  expect(
    referencesForEntry(CatalogEntryId.ComposePalette).map((page) => page.title),
  ).toContain('Material Colors');
  expect(
    referencesForEntry(CatalogEntryId.SwiftUIModifiers).map(
      (page) => page.title,
    ),
  ).toEqual(['Modifiers', 'SwiftUI']);
  expect(
    referencesForEntry(CatalogEntryId.ComposeModifiers).map(
      (page) => page.title,
    ),
  ).toContain('Modifiers');
  expect(findReference('https://example.com/button.md')).toBeUndefined();
});
