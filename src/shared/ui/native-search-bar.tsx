import { Stack } from 'expo-router/stack';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import type { SearchBarCommands } from 'react-native-screens';

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
  if (Platform.OS === 'web') return null;
  return (
    <Stack.SearchBar
      ref={ref}
      placeholder={placeholder}
      autoCapitalize="none"
      obscureBackground={false}
      onChangeText={(event) => onChange(event.nativeEvent.text)}
      onCancelButtonPress={() => onChange('')}
    />
  );
}
