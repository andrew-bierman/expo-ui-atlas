import { composeEntries } from '../data/compose';
import { swiftuiEntries } from '../data/swiftui';
import { universalEntries } from '../data/universal';
import type { CatalogEntry, Category, Family } from './types';
export const catalog: CatalogEntry[] = [
  ...universalEntries,
  ...swiftuiEntries,
  ...composeEntries,
];
export function findEntry(id: string) {
  return catalog.find((entry) => entry.id === id);
}
export function filterCatalog(
  entries: CatalogEntry[],
  query: string,
  family: Family | 'all',
  category: Category | 'all',
) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return entries.filter(
    (entry) =>
      (family === 'all' || entry.family === family) &&
      (category === 'all' || entry.category === category) &&
      terms.every((term) =>
        [entry.name, entry.summary, ...entry.tags, ...entry.exports]
          .join(' ')
          .toLocaleLowerCase()
          .includes(term),
      ),
  );
}
