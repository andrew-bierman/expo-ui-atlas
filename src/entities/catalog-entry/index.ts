export { contextualSwiftExports, supportExports } from './data/coverage';
export { default as inventory } from './data/inventory.json';
export {
  catalog,
  catalogForPlatform,
  familyOptionsForPlatform,
  filterCatalog,
  findEntry,
} from './model/catalog';
export {
  findReference,
  type ReferenceDocument,
  referenceManifest,
  referencesForEntry,
} from './model/reference';
export type { CatalogEntry } from './model/types';
export {
  CatalogEntryId,
  CatalogFilter,
  CatalogPlatform,
  Category,
  categories,
  Family,
  families,
  familyOptions,
  platformLabels,
} from './model/types';
