import { Button, FieldGroup, Host, Text } from '@expo/ui';
import { Linking } from 'react-native';
import { catalog, families } from '../../../entities/catalog-entry';
export function GuidePage() {
  return (
    <Host style={{ flex: 1 }}>
      <FieldGroup>
        <FieldGroup.Section title="Expo UI Atlas">
          <Text>
            Explore native components, ready-made variants, and optional
            customization.
          </Text>
        </FieldGroup.Section>
        {Object.entries(families).map(([id, family]) => (
          <FieldGroup.Section
            key={id}
            title={`${family.label} · ${catalog.filter((e) => e.family === id).length} collections`}
          >
            <Text>{family.description}</Text>
          </FieldGroup.Section>
        ))}
        <FieldGroup.Section title="Try, customize, compare.">
          <Text>
            Open a collection to browse ready-made variants without
            configuration. Open Customize when you want to combine settings.
            Component controls change actual native props; environment controls
            change appearance, tint, direction, width, and inset. Edit the JSON
            to apply a repeatable configuration. Reset restores both props and
            interaction state.
          </Text>
        </FieldGroup.Section>
        <FieldGroup.Section title="Know the boundaries.">
          <Text>
            Platform and OS notes matter: SwiftUI renders on iOS, Compose on
            Android, and universal components have web fallbacks. Glass styles
            need newer iOS. Widget extensions cannot run inside Expo Go. The
            atlas covers documented app-use variations; not every combination of
            all native framework modifiers is represented.
          </Text>
        </FieldGroup.Section>
        <FieldGroup.Section title="Read a specimen.">
          <Text>
            A variant title names the setting being demonstrated. Related
            settings are enabled when needed—for example, line width uses a line
            chart. Presentation examples have an Open action so you can try the
            actual sheet or dialog. Reset restores that example’s starting
            settings.
          </Text>
        </FieldGroup.Section>
        <FieldGroup.Section title="Built to extend.">
          <Text>
            Collections and controls use typed identifiers. Schemas declare
            allowed choices, defaults and numeric bounds; the same definitions
            produce ready-made variants and optional playground controls. Adding
            a choice therefore adds a comparison without duplicating the
            surrounding screen.
          </Text>
        </FieldGroup.Section>
        <FieldGroup.Section title="Official documentation">
          <Button
            label="Open SDK 58 Expo UI documentation"
            onPress={() => {
              void Linking.openURL(
                'https://docs.expo.dev/versions/v58.0.0/sdk/ui/',
              );
            }}
          />
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}
