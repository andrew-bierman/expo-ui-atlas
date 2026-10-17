export function prepareMarkdown(source: string): string {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  let fence: string | undefined;
  let excluded = false;
  return body
    .split('\n')
    .filter((line) => {
      const marker = line.match(/^\s*(`{3,}|~{3,})/)?.[1];
      if (marker && !excluded) {
        if (!fence) fence = marker;
        else if (marker[0] === fence[0] && marker.length >= fence.length)
          fence = undefined;
        return true;
      }
      if (fence) return true;
      if (line.includes('<AgentInstructions>')) {
        excluded = true;
        return false;
      }
      if (line.includes('</AgentInstructions>')) {
        excluded = false;
        return false;
      }
      return !excluded;
    })
    .join('\n')
    .trim();
}

export function resolveMarkdownLink(
  href: string,
  sourceUrl: string,
): string | undefined {
  try {
    const url = new URL(href, sourceUrl);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
