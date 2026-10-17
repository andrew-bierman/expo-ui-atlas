import { Host, TextInput, useNativeState } from '@expo/ui';
import { useEffect } from 'react';
import { layout, radius, spacing, typography, useTheme } from '../theme';
export function SearchField({
  value,
  onChange,
  placeholder = 'Search components, modifiers, interactions…',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const t = useTheme();
  const text = useNativeState(value);
  useEffect(() => {
    if (text.get() !== value) text.set(value);
  }, [text, value]);
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      colorScheme={t.colorScheme}
      style={{ width: layout.fullWidth }}
      accessibilityLabel="Search components"
    >
      <TextInput
        value={text}
        onChangeText={onChange}
        placeholder={placeholder}
        textStyle={{ color: t.text, ...typography.input }}
        placeholderTextColor={t.muted}
        autoCapitalize="none"
        style={{
          backgroundColor: t.surface,
          padding: spacing.md,
          borderRadius: radius.lg,
          borderWidth: layout.hairline,
          borderColor: t.border,
        }}
        testID="catalog-search"
      />
    </Host>
  );
}
