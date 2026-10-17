import bundle from '../data/reference/bundle.json';
import type { CatalogEntryId } from './types';

export interface ReferenceDocument {
  id: string;
  title: string;
  sourceUrl: string;
  markdownUrl: string;
  markdown: string;
  sha256: string;
}
export const referenceManifest = {
  sdkVersion: bundle.sdkVersion,
  packageVersion: bundle.packageVersion,
  fetchedAt: bundle.fetchedAt,
};
const documents: readonly ReferenceDocument[] = bundle.pages;
export function referencesForEntry(id: CatalogEntryId): ReferenceDocument[] {
  const ids: readonly string[] = bundle.collections[id];
  return ids.flatMap((id) => {
    const page = documents.find((page) => page.id === id);
    return page ? [page] : [];
  });
}
export function findReference(url: string): ReferenceDocument | undefined {
  const key = url
    .split('#')[0]
    ?.replace(/(?:\/index)?\.md\/?$/, '')
    .replace(/\/$/, '');
  return documents.find((page) => page.id === key);
}
