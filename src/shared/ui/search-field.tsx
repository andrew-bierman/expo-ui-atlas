import { Host, TextInput, useNativeState } from '@expo/ui';
import { useEffect } from 'react';
import { useTheme } from '../theme';
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
      colorScheme={t.dark ? 'dark' : 'light'}
      style={{ width: '100%' }}
      accessibilityLabel="Search components"
    >
      <TextInput
        value={text}
        onChangeText={onChange}
        placeholder={placeholder}
        textStyle={{ color: t.text, fontSize: 16 }}
        placeholderTextColor={t.muted}
        autoCapitalize="none"
        style={{
          backgroundColor: t.surface,
          padding: 18,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: t.border,
        }}
        testID="catalog-search"
      />
    </Host>
  );
}
