import { createHash } from 'node:crypto';
import { rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import uiPackage from '../node_modules/@expo/ui/package.json';
import expoPackage from '../node_modules/expo/package.json';
import { CatalogEntryId, catalog, Family } from '../src/entities/catalog-entry';
import { discoverPages, readDocument } from './docs/source';

const sdkMajor = expoPackage.version.match(/^\d+/)?.[0];
if (!sdkMajor) throw new Error('Cannot determine installed Expo SDK');
const sdkVersion = `${sdkMajor}.0.0`;
const base = `https://docs.expo.dev/versions/v${sdkVersion}/sdk/ui`;
const sources = [
  { family: Family.Universal, root: `${base}/universal` },
  { family: Family.SwiftUI, root: `${base}/swift-ui` },
  { family: Family.Compose, root: `${base}/jetpack-compose` },
];
interface Document {
  id: string;
  family: Family;
  title: string;
  sourceUrl: string;
  markdownUrl: string;
  sha256: string;
  markdown: string;
  symbols: string[];
}
const pages: Document[] = [];
const concurrency = 8;
for (const { family, root } of sources) {
  const queue = [root];
  const seen = new Set(queue);
  while (queue.length) {
    const batch = queue.splice(0, concurrency);
    const results = await Promise.all(
      batch.map(async (url): Promise<Document> => {
        const markdownUrl = `${url}/index.md`;
        const response = await fetch(markdownUrl, {
          signal: AbortSignal.timeout(30_000),
        });
        if (!response.ok) throw new Error(`${response.status}: ${markdownUrl}`);
        const markdown = await response.text();
        const { title, symbols } = readDocument(markdown);
        return {
          id: url,
          family,
          title,
          sourceUrl: `${url}/`,
          markdownUrl,
          markdown,
          symbols,
          sha256: createHash('sha256').update(markdown).digest('hex'),
        };
      }),
    );
    for (const page of results) {
      pages.push(page);
      for (const link of discoverPages(page.markdown, root)) {
        if (!seen.has(link)) {
          seen.add(link);
          queue.push(link);
        }
      }
    }
  }
  console.log(
    `${family}: ${pages.filter((page) => page.family === family).length} pages`,
  );
}
pages.sort((a, b) => a.id.localeCompare(b.id));
const supplementaryTopics: Partial<Record<CatalogEntryId, readonly string[]>> =
  {
    [CatalogEntryId.ComposeModifiers]: ['Modifiers'],
  };
const collections = Object.fromEntries(
  catalog.map((entry) => {
    const topics = [...entry.exports, ...(supplementaryTopics[entry.id] ?? [])];
    const matches = pages.filter(
      (page) =>
        page.family === entry.family &&
        topics.some(
          (symbol) =>
            page.title.toLowerCase() === symbol.toLowerCase() ||
            (symbol !== 'modifiers' && page.symbols.includes(symbol)),
        ),
    );
    const overview = sources.find(
      (source) => source.family === entry.family,
    )?.root;
    return [
      entry.id,
      [
        ...new Set([
          ...matches.map((page) => page.id),
          ...(overview ? [overview] : []),
        ]),
      ],
    ];
  }),
);
const bundle = {
  sdkVersion,
  packageVersion: uiPackage.version,
  fetchedAt: new Date().toISOString(),
  pages,
  collections,
};
const destination = resolve(
  import.meta.dir,
  '../src/entities/catalog-entry/data/reference/bundle.json',
);
await Bun.write(`${destination}.tmp`, `${JSON.stringify(bundle, null, 2)}\n`);
await rename(`${destination}.tmp`, destination);
console.log(
  `Bundled ${pages.length} source pages for ${catalog.length} collections.`,
);
