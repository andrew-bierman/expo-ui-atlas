import { Host, TextInput, useNativeState } from '@expo/ui';
import { useEffect } from 'react';
import { layout } from '../theme';
export function SearchField({
  value,
  onChange,
  placeholder = 'Search components, modifiers, interactions…',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const text = useNativeState(value);
  useEffect(() => {
    if (text.get() !== value) text.set(value);
  }, [text, value]);
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: layout.fullWidth }}
      accessibilityLabel="Search components"
    >
      <TextInput
        value={text}
        onChangeText={onChange}
        placeholder={placeholder}
        autoCapitalize="none"
        testID="catalog-search"
      />
    </Host>
  );
}
