import { Button, Column, Host, ListItem, Text } from '@expo/ui';

type Content = string | number | (string | number)[];
export function Body({ children }: { children: Content; muted?: boolean }) {
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: '100%' }}
    >
      <Text>
        {Array.isArray(children) ? children.join('') : String(children)}
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
  return (
    <Host matchContents ignoreSafeArea="all" accessibilityState={{ selected }}>
      {onPress ? (
        <Button
          label={label}
          variant={selected ? 'filled' : 'text'}
          onPress={onPress}
        />
      ) : (
        <Text>{label}</Text>
      )}
    </Host>
  );
}
export function Notice({
  title,
  children,
}: {
  title: string;
  children: Content;
}) {
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: '100%' }}
    >
      <Column>
        <ListItem
          supportingText={
            Array.isArray(children) ? children.join('') : String(children)
          }
        >
          {title}
        </ListItem>
      </Column>
    </Host>
  );
}
