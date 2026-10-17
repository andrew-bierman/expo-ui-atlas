export function discoverPages(markdown: string, root: string): string[] {
  return [
    ...new Set(
      [...markdown.matchAll(/\]\((https:\/\/[^\s)]+)\)/g)].flatMap((match) => {
        const link = match[1]?.split('#')[0];
        if (!link?.startsWith(`${root}/`) || !link.endsWith('.md')) return [];
        return [link.replace(/(?:\/index)?\.md$/, '')];
      }),
    ),
  ].sort();
}

export function readDocument(markdown: string): {
  title: string;
  symbols: string[];
} {
  const title = markdown.match(/^title: ['"]?(.+?)['"]?\r?$/m)?.[1];
  if (!markdown.startsWith('---\n') || !title || !/^# /m.test(markdown)) {
    throw new Error(
      'Expected a Markdown documentation page with title metadata',
    );
  }
  const symbols = [
    ...new Set(
      [
        ...markdown.matchAll(
          /^#{2,4} `([A-Za-z][A-Za-z0-9]*)(?:\([^`\n]*\))?`/gm,
        ),
      ].flatMap((match) => (match[1] ? [match[1]] : [])),
    ),
  ];
  return { title, symbols };
}
