import { Stack } from 'expo-router/stack';
import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import type { SearchBarCommands, SearchBarProps } from 'react-native-screens';

export function NativeSearchBar({
  onChange,
  placeholder,
  resetVersion,
}: {
  onChange: (value: string) => void;
  placeholder: string;
  resetVersion: number;
}) {
  const ref = useRef<SearchBarCommands>(null);
  useEffect(() => {
    if (resetVersion > 0) {
      ref.current?.clearText();
      ref.current?.cancelSearch();
    }
  }, [resetVersion]);
  const handleChange = useCallback<NonNullable<SearchBarProps['onChangeText']>>(
    (event) => onChange(event.nativeEvent.text),
    [onChange],
  );
  const handleCancel = useCallback(() => onChange(''), [onChange]);
  if (Platform.OS === 'web') return null;
  return (
    <Stack.SearchBar
      ref={ref}
      placeholder={placeholder}
      autoCapitalize="none"
      obscureBackground={false}
      onChangeText={handleChange}
      onCancelButtonPress={handleCancel}
    />
  );
}
