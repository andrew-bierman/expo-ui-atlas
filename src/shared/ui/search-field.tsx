import { Host, TextInput, useNativeState } from '@expo/ui';
import { useEffect } from 'react';
import { useTranslation } from '../config';
import { layout } from '../theme';
export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const text = useNativeState(value);
  useEffect(() => {
    if (text.get() !== value) text.set(value);
  }, [text, value]);
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: layout.fullWidth }}
      accessibilityLabel={t('catalog.search')}
    >
      <TextInput
        value={text}
        onChangeText={onChange}
        placeholder={placeholder ?? t('catalog.webSearch')}
        autoCapitalize="none"
        testID="catalog-search"
      />
    </Host>
  );
}
