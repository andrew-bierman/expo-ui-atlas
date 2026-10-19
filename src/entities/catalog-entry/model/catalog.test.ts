import { describe, expect, test } from 'bun:test';
import { universalEntries } from '../data/universal';
import {
  catalog,
  catalogForPlatform,
  familyOptionsForPlatform,
  filterCatalog,
  findEntry,
} from './catalog';
import {
  CatalogEntryId,
  CatalogFilter,
  CatalogPlatform,
  Category,
  Family,
} from './types';

describe('catalog discovery', () => {
  test('finds slider by name and honors family and category together', () => {
    expect(
      filterCatalog(
        catalog,
        'slider',
        Family.Universal,
        Category.Selection,
        CatalogPlatform.IOS,
      ).map((e) => e.id),
    ).toEqual([CatalogEntryId.UniversalSlider]);
    expect(
      filterCatalog(
        catalog,
        'slider',
        Family.Universal,
        Category.Actions,
        CatalogPlatform.IOS,
      ),
    ).toEqual([]);
  });
  test('matches multiple words across searchable fields regardless of case', () => {
    expect(
      filterCatalog(
        universalEntries,
        '  NATIVE state ',
        CatalogFilter.All,
        CatalogFilter.All,
        CatalogPlatform.IOS,
      ).map((e) => e.id),
    ).toContain(CatalogEntryId.UniversalInput);
    expect(
      filterCatalog(
        universalEntries,
        'snap overlay',
        CatalogFilter.All,
        CatalogFilter.All,
        CatalogPlatform.IOS,
      ).map((e) => e.id),
    ).toEqual([CatalogEntryId.UniversalSheet]);
  });
  test('blank searches restore all results and unmatched terms produce an empty state', () => {
    expect(
      filterCatalog(
        catalog,
        '   ',
        CatalogFilter.All,
        CatalogFilter.All,
        CatalogPlatform.IOS,
      ),
    ).toHaveLength(catalogForPlatform(CatalogPlatform.IOS).length);
    expect(
      filterCatalog(
        catalog,
        'unfindable-field-note',
        CatalogFilter.All,
        CatalogFilter.All,
        CatalogPlatform.IOS,
      ),
    ).toEqual([]);
  });
  test('detail IDs are unique, stable, and missing IDs resolve to not-found', () => {
    expect(new Set(catalog.map((e) => e.id)).size).toBe(catalog.length);
    expect(catalog.map((entry) => entry.id).sort()).toEqual(
      Object.values(CatalogEntryId).sort(),
    );
    expect(
      findEntry(CatalogEntryId.UniversalSlider, CatalogPlatform.IOS)?.name,
    ).toBe('Slider');
    expect(findEntry('not-in-the-atlas', CatalogPlatform.IOS)).toBeUndefined();
  });
  test('direct APIs stay in their supported native context', () => {
    for (const entry of catalog) {
      expect(entry.exports.length).toBeGreaterThan(0);
      if (entry.family === Family.SwiftUI)
        expect(entry.platforms).toEqual([CatalogPlatform.IOS]);
      if (entry.family === Family.Compose)
        expect(entry.platforms).toEqual([CatalogPlatform.Android]);
    }
  });
});

describe('device-scoped discovery and route resolution', () => {
  const scopes = [
    {
      platform: CatalogPlatform.IOS,
      families: [Family.Universal, Family.SwiftUI],
    },
    {
      platform: CatalogPlatform.Android,
      families: [Family.Universal, Family.Compose],
    },
    { platform: CatalogPlatform.Web, families: [Family.Universal] },
  ];
  for (const { platform, families } of scopes) {
    test(`${platform} exposes only supported entries, families and route IDs`, () => {
      const visible = catalogForPlatform(platform);
      expect(familyOptionsForPlatform(platform).map(({ id }) => id)).toEqual(
        families,
      );
      expect(visible.length).toBeGreaterThan(0);
      expect(
        filterCatalog(
          catalog,
          '',
          CatalogFilter.All,
          CatalogFilter.All,
          platform,
        ),
      ).toEqual(visible);
      for (const entry of catalog) {
        const supported = entry.platforms.includes(platform);
        expect(visible.includes(entry)).toBe(supported);
        expect(findEntry(entry.id, platform)).toBe(
          supported ? entry : undefined,
        );
        // An exact title search must never recover an opposite-platform entry.
        expect(
          filterCatalog(
            catalog,
            entry.name,
            entry.family,
            CatalogFilter.All,
            platform,
          ).includes(entry),
        ).toBe(supported);
      }
      for (const family of Object.values(Family)) {
        expect(
          filterCatalog(catalog, '', family, CatalogFilter.All, platform),
        ).toEqual(visible.filter((entry) => entry.family === family));
      }
    });
  }
  test('unknown runtime platforms fail closed', () => {
    expect(catalogForPlatform('unsupported')).toEqual([]);
    expect(familyOptionsForPlatform('unsupported')).toEqual([]);
    expect(
      findEntry(CatalogEntryId.UniversalButton, 'unsupported'),
    ).toBeUndefined();
  });
});

test('the rejected Cards & surfaces route is inaccessible on iOS', () => {
  expect(
    findEntry(CatalogEntryId.ComposeContent, CatalogPlatform.IOS),
  ).toBeUndefined();
  expect(
    filterCatalog(
      catalog,
      'Cards surfaces',
      CatalogFilter.All,
      CatalogFilter.All,
      CatalogPlatform.IOS,
    ),
  ).toEqual([]);
  expect(
    findEntry(CatalogEntryId.ComposeContent, CatalogPlatform.Android)?.name,
  ).toBe('Cards & surfaces');
  expect(
    findEntry(CatalogEntryId.SwiftUIButtons, CatalogPlatform.Android),
  ).toBeUndefined();
});
