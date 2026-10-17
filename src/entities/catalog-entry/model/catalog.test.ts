import { describe, expect, test } from 'bun:test';
import { universalEntries } from '../data/universal';
import { catalog, filterCatalog, findEntry } from './catalog';

describe('catalog discovery', () => {
  test('finds slider by name and honors family and category together', () => {
    expect(
      filterCatalog(catalog, 'slider', 'universal', 'Selection').map(
        (e) => e.id,
      ),
    ).toEqual(['u-slider']);
    expect(filterCatalog(catalog, 'slider', 'universal', 'Actions')).toEqual(
      [],
    );
  });
  test('matches multiple words across searchable fields regardless of case', () => {
    expect(
      filterCatalog(universalEntries, '  NATIVE state ', 'all', 'all').map(
        (e) => e.id,
      ),
    ).toContain('u-input');
    expect(
      filterCatalog(universalEntries, 'snap overlay', 'all', 'all').map(
        (e) => e.id,
      ),
    ).toEqual(['u-sheet']);
  });
  test('blank searches restore all results and unmatched terms produce an empty state', () => {
    expect(filterCatalog(catalog, '   ', 'all', 'all')).toHaveLength(
      catalog.length,
    );
    expect(
      filterCatalog(catalog, 'unfindable-field-note', 'all', 'all'),
    ).toEqual([]);
  });
  test('detail IDs are unique, stable, and missing IDs resolve to not-found', () => {
    expect(new Set(catalog.map((e) => e.id)).size).toBe(catalog.length);
    expect(findEntry('u-slider')?.name).toBe('Slider');
    expect(findEntry('not-in-the-atlas')).toBeUndefined();
  });
  test('direct APIs stay in their supported native context', () => {
    for (const entry of catalog) {
      expect(entry.exports.length).toBeGreaterThan(0);
      if (entry.family === 'swiftui') expect(entry.platforms).toEqual(['ios']);
      if (entry.family === 'compose')
        expect(entry.platforms).toEqual(['android']);
    }
  });
});
