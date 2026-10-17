import { Button, Host, Text } from '@expo/ui';

import { View } from 'react-native';
import { useTheme } from '../theme';
export function Body({
  children,
  muted = false,
}: {
  children: string | number | (string | number)[];
  muted?: boolean;
}) {
  const t = useTheme();
  const content = Array.isArray(children)
    ? children.join('')
    : String(children);
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: '100%' }}
      colorScheme={t.dark ? 'dark' : 'light'}
    >
      <Text
        textStyle={{
          color: muted ? t.muted : t.text,
          fontSize: 15,
          lineHeight: 23,
        }}
      >
        {content}
      </Text>
    </Host>
  );
}
export function Pill({
  label,
  selected = false,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const t = useTheme();
  return (
    <Host
      matchContents
      ignoreSafeArea="all"
      seedColor={t.accent}
      colorScheme={t.dark ? 'dark' : 'light'}
      style={{ minHeight: 44, justifyContent: 'center' }}
      accessibilityState={{ selected }}
    >
      {onPress ? (
        <Button
          label={label}
          variant={selected ? 'filled' : 'outlined'}
          onPress={onPress}
        />
      ) : (
        <Text
          textStyle={{ color: t.accent, fontSize: 13, fontWeight: '600' }}
          style={{ padding: 12, borderRadius: 16, backgroundColor: t.soft }}
        >
          {label}
        </Text>
      )}
    </Host>
  );
}
export function Notice({
  title,
  children,
}: {
  title: string;
  children: string | number | (string | number)[];
}) {
  const t = useTheme();
  return (
    <View
      style={{ padding: 20, gap: 8, borderRadius: 18, backgroundColor: t.soft }}
    >
      <Host
        matchContents={{ vertical: true }}
        ignoreSafeArea="all"
        style={{ width: '100%' }}
      >
        <Text textStyle={{ color: t.text, fontWeight: '700', fontSize: 16 }}>
          {title}
        </Text>
      </Host>
      <Body muted>{children}</Body>
    </View>
  );
}
