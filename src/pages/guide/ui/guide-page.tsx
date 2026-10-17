import { Button, Column, Host, Text } from '@expo/ui';
import { Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { catalog, families } from '../../../entities/catalog-entry';
import { useTheme } from '../../../shared/theme';
export function GuidePage() {
  const t = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          maxWidth: 820,
          width: '100%',
          alignSelf: 'center',
          paddingBottom: 50,
        }}
      >
        <Host
          matchContents={{ vertical: true }}
          ignoreSafeArea="all"
          colorScheme={t.dark ? 'dark' : 'light'}
          seedColor={t.accent}
          style={{ width: '100%' }}
        >
          <Column spacing={24}>
            <Text
              textStyle={{ fontSize: 38, fontWeight: '600', color: t.text }}
            >
              A guide to the atlas.
            </Text>
            <Text textStyle={{ color: t.muted, fontSize: 16, lineHeight: 25 }}>
              This app uses Expo UI for catalog controls, search, specimen
              controls, and live native examples. Expo Router NativeTabs
              provides the system tab bar. React Native supplies layout, safe
              areas, and the virtualized catalog.
            </Text>
            {Object.entries(families).map(([id, family]) => (
              <Column key={id} spacing={8}>
                <Text
                  textStyle={{
                    color: t.accent,
                    fontWeight: '700',
                    fontSize: 20,
                  }}
                >{`${family.label} · ${catalog.filter((e) => e.family === id).length} collections`}</Text>
                <Text textStyle={{ color: t.text, fontSize: 15 }}>
                  {family.description}
                </Text>
              </Column>
            ))}
            <Text
              textStyle={{ color: t.text, fontSize: 22, fontWeight: '600' }}
            >
              Try, customize, compare.
            </Text>
            <Text textStyle={{ color: t.muted, fontSize: 16, lineHeight: 25 }}>
              Open a collection to browse ready-made variants without
              configuration. Switch to Playground when you want to combine
              settings. Component controls change actual native props;
              environment controls change appearance, tint, direction, width,
              and inset. Edit the JSON to apply a repeatable configuration.
              Reset restores both props and interaction state.
            </Text>
            <Text
              textStyle={{ color: t.text, fontSize: 22, fontWeight: '600' }}
            >
              Know the boundaries.
            </Text>
            <Text textStyle={{ color: t.muted, fontSize: 16, lineHeight: 25 }}>
              Platform and OS notes matter: SwiftUI renders on iOS, Compose on
              Android, and universal components have web fallbacks. Glass styles
              need newer iOS. Widget extensions cannot run inside Expo Go. The
              atlas covers documented app-use variations; not every combination
              of all native framework modifiers is represented.
            </Text>
            <Button
              label="Open SDK 58 Expo UI documentation"
              onPress={() => {
                void Linking.openURL(
                  'https://docs.expo.dev/versions/v58.0.0/sdk/ui/',
                );
              }}
            />
          </Column>
        </Host>
      </ScrollView>
    </SafeAreaView>
  );
}
