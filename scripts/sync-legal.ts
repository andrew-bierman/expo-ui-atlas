import { readFile, writeFile } from 'node:fs/promises';
import { appConfig } from '../src/shared/config';

const root = new URL('../', import.meta.url);
const documents = {
  privacy: {
    title: 'Privacy policy',
    sourceUrl: appConfig.publicResources.privacy,
    markdown: await readFile(new URL('docs/privacy.md', root), 'utf8'),
  },
  support: {
    title: 'Support',
    sourceUrl: appConfig.publicResources.support,
    markdown: await readFile(new URL('docs/support.md', root), 'utf8'),
  },
  notices: {
    title: 'Open-source notices',
    sourceUrl: appConfig.publicResources.notices,
    markdown: await readFile(new URL('docs/notices.md', root), 'utf8'),
  },
};
const dependencyNotices = await readFile(
  new URL('docs/dependency-notices.md', root),
  'utf8',
);
const output = `${JSON.stringify({ documents, dependencyNotices }, null, 2)}\n`;
const target = new URL('src/shared/legal/content.json', root);
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== output)
    throw new Error('Bundled legal content is stale. Run bun run legal:sync.');
} else await writeFile(target, output);
