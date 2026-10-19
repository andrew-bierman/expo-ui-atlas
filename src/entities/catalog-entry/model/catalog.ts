import { composeEntries } from '../data/compose';
import { swiftuiEntries } from '../data/swiftui';
import { universalEntries } from '../data/universal';
import {
  type CatalogEntry,
  CatalogFilter,
  type Category,
  type Family,
  familyOptions,
} from './types';
export const catalog: CatalogEntry[] = [
  ...universalEntries,
  ...swiftuiEntries,
  ...composeEntries,
];
export function catalogForPlatform(platform: string) {
  return catalog.filter((entry) => entry.platforms.some((p) => p === platform));
}
export function familyOptionsForPlatform(platform: string) {
  const entries = catalogForPlatform(platform);
  return familyOptions.filter((family) =>
    entries.some((entry) => entry.family === family.id),
  );
}
export function findEntry(id: string, platform: string) {
  return catalogForPlatform(platform).find((entry) => entry.id === id);
}
export function filterCatalog(
  entries: CatalogEntry[],
  query: string,
  family: Family | CatalogFilter.All,
  category: Category | CatalogFilter.All,
  platform: string,
) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return entries.filter(
    (entry) =>
      entry.platforms.some((p) => p === platform) &&
      (family === CatalogFilter.All || entry.family === family) &&
      (category === CatalogFilter.All || entry.category === category) &&
      terms.every((term) =>
        [entry.name, entry.summary, ...entry.tags, ...entry.exports]
          .join(' ')
          .toLocaleLowerCase()
          .includes(term),
      ),
  );
}
