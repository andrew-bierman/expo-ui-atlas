import Markdown from '@ronradtke/react-native-markdown-display';
import { Linking, Platform } from 'react-native';
import { spacing, typography, useTheme } from '../theme';
import { prepareMarkdown, resolveMarkdownLink } from './content';

export function MarkdownDocument({
  source,
  sourceUrl,
  onNavigate,
}: {
  source: string;
  sourceUrl: string;
  onNavigate?: (url: string) => boolean;
}) {
  const t = useTheme();
  const codeFont = Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  });
  return (
    <Markdown
      style={{
        body: { color: t.text, ...typography.body },
        link: { color: t.accent },
        code_inline: {
          padding: 0,
          borderWidth: 0,
          fontFamily: codeFont,
          backgroundColor: t.soft,
          color: t.text,
        },
        fence: {
          fontFamily: codeFont,
          backgroundColor: t.soft,
          color: t.text,
          borderColor: t.border,
        },
        code_block: {
          fontFamily: codeFont,
          backgroundColor: t.soft,
          color: t.text,
        },
        table: { borderColor: t.border },
        tr: { borderColor: t.border },
        th: { padding: spacing.xs },
        td: { padding: spacing.xs },
        blockquote: { backgroundColor: t.soft, borderColor: t.border },
      }}
      onLinkPress={(href) => {
        const url = resolveMarkdownLink(href, sourceUrl);
        if (url && !onNavigate?.(url)) void Linking.openURL(url);
        return false;
      }}
    >
      {prepareMarkdown(source)}
    </Markdown>
  );
}
