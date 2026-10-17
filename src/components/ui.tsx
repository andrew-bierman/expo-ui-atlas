import type { PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme/theme';
export function Body({
  children,
  muted = false,
}: PropsWithChildren<{ muted?: boolean }>) {
  const t = useTheme();
  return (
    <Text
      style={{ color: muted ? t.muted : t.text, fontSize: 15, lineHeight: 23 }}
    >
      {children}
    </Text>
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
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 16,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: selected ? t.accent : t.border,
        backgroundColor: selected ? t.soft : t.surface,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: selected ? t.accent : t.muted,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
export function Notice({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  const t = useTheme();
  return (
    <View
      style={{ padding: 20, gap: 8, borderRadius: 18, backgroundColor: t.soft }}
    >
      <Text style={{ color: t.text, fontWeight: '700', fontSize: 16 }}>
        {title}
      </Text>
      <Body muted>{children}</Body>
    </View>
  );
}
