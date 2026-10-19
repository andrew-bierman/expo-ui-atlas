import bundle from '../data/reference/bundle.json';
import { type CatalogEntryId, CatalogPlatform } from './types';

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

// Keep upstream pages intact. Pages discussing another native platform open in
// the browser rather than presenting that platform's API inside the catalog.
export function canReadReferenceInline(
  page: ReferenceDocument,
  platform: string,
): boolean {
  switch (platform) {
    case CatalogPlatform.IOS:
      return (
        !page.id.includes('/jetpack-compose') &&
        !/\bandroid\b|jetpack[\s/-]+compose/i.test(page.markdown)
      );
    case CatalogPlatform.Android:
      return (
        !page.id.includes('/swift-ui') &&
        !/\bios\b|swift[\s/-]*ui/i.test(page.markdown)
      );
    case CatalogPlatform.Web:
      return page.id.includes('/universal');
    default:
      return false;
  }
}
