import {
  Button,
  Collapsible,
  Column,
  FieldGroup,
  Host,
  List,
  ListItem,
  RNHostView,
  Row,
  ScrollView,
  Spacer,
  Switch,
  Text,
} from '@expo/ui';
import { useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { useTheme } from '../../theme/theme';
import { Stage } from './controls';
export function Typography() {
  const t = useTheme();
  const [large, setLarge] = useState(false);
  return (
    <Stage>
      <Text
        textStyle={{
          fontSize: large ? 36 : 28,
          fontWeight: '700',
          color: t.accent,
        }}
      >
        The great outdoors
      </Text>
      <Text textStyle={{ fontSize: 16, color: t.muted, lineHeight: 24 }}>
        Native text with custom size, weight, color, and line height.
      </Text>
      <Text
        numberOfLines={1}
        style={{ width: 220 }}
        textStyle={{ fontSize: 14, color: t.text }}
      >
        This very long field note truncates to a single line when the text runs
        out of room.
      </Text>
      <Button
        label="Toggle title size"
        variant="outlined"
        onPress={() => setLarge((v) => !v)}
      />
    </Stage>
  );
}
export function Layouts() {
  const [spacing, setSpacing] = useState(8);
  return (
    <Stage>
      <Row spacing={spacing} alignment="center">
        <Text
          style={{ backgroundColor: '#dce8da', padding: 12 }}
          textStyle={{ color: '#163d29' }}
        >
          A
        </Text>
        <Text
          style={{ backgroundColor: '#eddbc8', padding: 20 }}
          textStyle={{ color: '#513321' }}
        >
          B
        </Text>
        <Text
          style={{ backgroundColor: '#dedcf0', padding: 12 }}
          textStyle={{ color: '#3b3157' }}
        >
          C
        </Text>
      </Row>
      <Row style={{ width: 250 }}>
        <Text>Start</Text>
        <Spacer flexible />
        <Text>End</Text>
      </Row>
      <Spacer size={8} />
      <Button
        label={`Spacing: ${spacing} · tap to change`}
        variant="outlined"
        onPress={() => setSpacing((v) => (v === 8 ? 24 : 8))}
      />
    </Stage>
  );
}
export function Disclosure() {
  const [open, setOpen] = useState(false);
  return (
    <Stage>
      <Collapsible
        label="What’s inside the pack?"
        isOpen={open}
        onOpenChange={setOpen}
      >
        <Column spacing={12} style={{ padding: 16 }}>
          <Text>Map, notebook, and a little curiosity.</Text>
          <Button
            label="Close from inside"
            variant="text"
            onPress={() => setOpen(false)}
          />
        </Column>
      </Collapsible>
      <Text>{open ? 'Expanded' : 'Collapsed'}</Text>
    </Stage>
  );
}
export function SettingsForm() {
  const t = useTheme();
  const [wifi, setWifi] = useState(true);
  const [offline, setOffline] = useState(false);
  return (
    <Host
      style={{ height: 320, width: '100%' }}
      ignoreSafeArea="all"
      colorScheme={t.dark ? 'dark' : 'light'}
    >
      <FieldGroup>
        <FieldGroup.Section title="Connection">
          <FieldGroup.SectionHeader>
            <Text>Connection preferences</Text>
          </FieldGroup.SectionHeader>
          <Switch label="Use Wi-Fi" value={wifi} onValueChange={setWifi} />
          <Switch
            label="Offline maps"
            value={offline}
            onValueChange={setOffline}
          />
          <FieldGroup.SectionFooter>
            <Text>Changes apply to this specimen only.</Text>
          </FieldGroup.SectionFooter>
        </FieldGroup.Section>
        <FieldGroup.Section title="Status">
          <Text>{wifi ? 'Wi-Fi available' : 'Wi-Fi disabled'}</Text>
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}
export function Lists() {
  const t = useTheme();
  const [selected, setSelected] = useState('None');
  return (
    <View style={{ gap: 12 }}>
      <RNText style={{ color: t.text }}>Last opened: {selected}</RNText>
      <Host
        style={{ height: 260, width: '100%' }}
        ignoreSafeArea="all"
        colorScheme={t.dark ? 'dark' : 'light'}
      >
        <List>
          {['Alpine trail', 'River crossing', 'Forest loop'].map((name, i) => (
            <ListItem
              key={name}
              onPress={() => setSelected(name)}
              supportingText={`${i + 2} km · Tap to select`}
            >
              <Text>{name}</Text>
              <ListItem.Leading>
                <Text>{String(i + 1).padStart(2, '0')}</Text>
              </ListItem.Leading>
              <ListItem.Trailing>
                <Text>{selected === name ? '✓' : '→'}</Text>
              </ListItem.Trailing>
            </ListItem>
          ))}
        </List>
      </Host>
    </View>
  );
}
export function Scrolling() {
  return (
    <Host style={{ height: 180, width: '100%' }} ignoreSafeArea="all">
      <ScrollView direction="horizontal">
        <Row spacing={12}>
          {['Forest', 'Ocean', 'Desert', 'Mountain', 'Tundra'].map((name) => (
            <Column
              key={name}
              spacing={12}
              style={{
                width: 150,
                height: 150,
                borderRadius: 18,
                padding: 18,
                backgroundColor: '#e5efdf',
              }}
            >
              <Text textStyle={{ color: '#246b4d', fontSize: 20 }}>{name}</Text>
              <Text textStyle={{ color: '#395e4a' }}>Swipe to explore →</Text>
            </Column>
          ))}
        </Row>
      </ScrollView>
    </Host>
  );
}
export function Interop() {
  const t = useTheme();
  return (
    <Stage>
      <Text>Native Expo UI above</Text>
      <RNHostView matchContents={{ vertical: true }}>
        <View
          style={{ backgroundColor: t.soft, padding: 18, borderRadius: 16 }}
        >
          <RNText style={{ color: t.text, fontSize: 15 }}>
            This card is a React Native View inside RNHostView.
          </RNText>
        </View>
      </RNHostView>
      <Text>Back in the native UI tree below</Text>
    </Stage>
  );
}
