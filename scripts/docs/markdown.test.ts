import { expect, test } from 'bun:test';
import {
  prepareMarkdown,
  resolveMarkdownLink,
} from '../../src/shared/markdown/content';
import { discoverPages, readDocument } from './source';

test('reader removes transport metadata and agent blocks without changing examples', () => {
  const raw =
    '---\ntitle: Button\n---\n\n# Button\n\n<AgentInstructions>\nprivate transport guidance\n</AgentInstructions>\n\n```tsx\nconst label = "<AgentInstructions>";\n```\n\nOfficial words.';
  expect(prepareMarkdown(raw)).toBe(
    '# Button\n\n\n```tsx\nconst label = "<AgentInstructions>";\n```\n\nOfficial words.',
  );
});
test('relative documentation links resolve against their original page', () => {
  const base =
    'https://docs.expo.dev/versions/v58.0.0/sdk/ui/universal/button/';
  expect(resolveMarkdownLink('../slider.md#api', base)).toBe(
    'https://docs.expo.dev/versions/v58.0.0/sdk/ui/universal/slider.md#api',
  );
  expect(resolveMarkdownLink('javascript:alert(1)', base)).toBeUndefined();
  expect(resolveMarkdownLink('#api', base)).toBe(`${base}#api`);
});
test('source discovery stays inside the pinned SDK and family', () => {
  const root = 'https://docs.expo.dev/versions/v58.0.0/sdk/ui/universal';
  expect(
    discoverPages(
      `[Button](${root}/button.md) [Other](https://example.com/a.md) [Latest](https://docs.expo.dev/versions/latest/sdk/ui/universal/button.md)`,
      root,
    ),
  ).toEqual([`${root}/button`]);
});
test('source validation rejects HTML and extracts real API headings', () => {
  expect(() => readDocument('<html>Oops</html>')).toThrow();
  expect(
    readDocument(
      '---\ntitle: Buttons\n---\n# Buttons\n### `FilledTonalButton`\n### `colors`',
    ),
  ).toEqual({ title: 'Buttons', symbols: ['FilledTonalButton', 'colors'] });
});
