import { Button, Column, Host, Text } from '@expo/ui';
import { Platform } from 'react-native';
import { type CatalogEntry, families } from '../../../entities/catalog-entry';
import { useTheme } from '../../../shared/theme';
export function CatalogCard({
  entry,
  onPress,
}: {
  entry: CatalogEntry;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      seedColor={t.accent}
      colorScheme={t.dark ? 'dark' : 'light'}
      style={{ flex: 1, marginBottom: 16 }}
    >
      <Button
        variant="outlined"
        onPress={onPress}
        style={{
          height: Platform.OS === 'web' ? 'auto' : undefined,
          padding: 18,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        }}
      >
        <Column spacing={12}>
          <Text
            textStyle={{
              color: t.accent,
              fontSize: 11,
              fontWeight: '800',
              letterSpacing: 1,
            }}
          >{`${families[entry.family].label.toUpperCase()} / ${entry.category.toUpperCase()}`}</Text>
          <Text textStyle={{ color: t.text, fontSize: 24, fontWeight: '600' }}>
            {entry.name}
          </Text>
          <Text textStyle={{ color: t.muted, fontSize: 15, lineHeight: 23 }}>
            {entry.summary}
          </Text>
          <Text textStyle={{ color: t.muted, fontSize: 11 }}>
            {entry.platforms
              .map((p) => ({ ios: 'iOS', android: 'Android', web: 'Web' })[p])
              .join(' + ')}
          </Text>
        </Column>
      </Button>
    </Host>
  );
}
