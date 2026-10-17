import { describe, expect, test } from 'bun:test';
import { universalEntries } from '../data/universal';
import { catalog, filterCatalog, findEntry } from './catalog';
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
      ).map((e) => e.id),
    ).toEqual([CatalogEntryId.UniversalSlider]);
    expect(
      filterCatalog(catalog, 'slider', Family.Universal, Category.Actions),
    ).toEqual([]);
  });
  test('matches multiple words across searchable fields regardless of case', () => {
    expect(
      filterCatalog(
        universalEntries,
        '  NATIVE state ',
        CatalogFilter.All,
        CatalogFilter.All,
      ).map((e) => e.id),
    ).toContain(CatalogEntryId.UniversalInput);
    expect(
      filterCatalog(
        universalEntries,
        'snap overlay',
        CatalogFilter.All,
        CatalogFilter.All,
      ).map((e) => e.id),
    ).toEqual([CatalogEntryId.UniversalSheet]);
  });
  test('blank searches restore all results and unmatched terms produce an empty state', () => {
    expect(
      filterCatalog(catalog, '   ', CatalogFilter.All, CatalogFilter.All),
    ).toHaveLength(catalog.length);
    expect(
      filterCatalog(
        catalog,
        'unfindable-field-note',
        CatalogFilter.All,
        CatalogFilter.All,
      ),
    ).toEqual([]);
  });
  test('detail IDs are unique, stable, and missing IDs resolve to not-found', () => {
    expect(new Set(catalog.map((e) => e.id)).size).toBe(catalog.length);
    expect(catalog.map((entry) => entry.id).sort()).toEqual(
      Object.values(CatalogEntryId).sort(),
    );
    expect(findEntry(CatalogEntryId.UniversalSlider)?.name).toBe('Slider');
    expect(findEntry('not-in-the-atlas')).toBeUndefined();
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
