import { Button, Host, Text } from '@expo/ui';

import { View } from 'react-native';
import { layout, radius, spacing, typography, useTheme } from '../theme';
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
      style={{ width: layout.fullWidth }}
      colorScheme={t.colorScheme}
    >
      <Text
        textStyle={{
          color: muted ? t.muted : t.text,
          ...typography.body,
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
      colorScheme={t.colorScheme}
      style={{ minHeight: layout.minTouchTarget, justifyContent: 'center' }}
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
          textStyle={{ color: t.text, ...typography.caption }}
          style={{
            padding: spacing.sm,
            borderRadius: radius.lg,
            backgroundColor: t.soft,
          }}
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
      style={{
        padding: spacing.lg,
        gap: spacing.xs,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        backgroundColor: t.soft,
      }}
    >
      <Host
        matchContents={{ vertical: true }}
        ignoreSafeArea="all"
        style={{ width: layout.fullWidth }}
      >
        <Text textStyle={{ color: t.text, ...typography.headline }}>
          {title}
        </Text>
      </Host>
      <Body muted>{children}</Body>
    </View>
  );
}
