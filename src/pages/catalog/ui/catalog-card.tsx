import { Host, ListItem } from '@expo/ui';
import {
  type CatalogEntry,
  families,
  platformLabels,
} from '../../../entities/catalog-entry';
export function CatalogCard({
  entry,
  onPress,
}: {
  entry: CatalogEntry;
  onPress: () => void;
}) {
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      style={{ width: '100%' }}
    >
      <ListItem
        onPress={onPress}
        supportingText={`${families[entry.family].label} · ${entry.category} · ${entry.platforms.map((p) => platformLabels[p]).join(', ')}
${entry.summary}`}
      >
        {entry.name}
      </ListItem>
    </Host>
  );
}
