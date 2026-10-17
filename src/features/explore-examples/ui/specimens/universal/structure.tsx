import {
  Button,
  Collapsible,
  Column,
  FieldGroup,
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
import { useTheme } from '../../../../../shared/theme';
import { ControlId } from '../../../model/control-identifiers';
import { useKnob, useTunedState } from '../../../model/tuning';
import { SpecimenHost } from '../../specimen-host';
import { Stage } from './controls';
export function Typography() {
  const t = useTheme();
  const [fontSize, setFontSize] = useTunedState<number>(ControlId.FontSize, 28);
  const content = useKnob(ControlId.Text, 'The great outdoors');
  const weight = useKnob<
    '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  >(ControlId.Weight, '700');
  const family = useKnob(ControlId.FontFamily, 'system');
  const tracking = useKnob(ControlId.Tracking, 0);
  const lineLimit = useKnob(ControlId.LineLimit, 1);
  return (
    <Stage>
      <Text
        textStyle={{
          fontSize,
          fontWeight: weight,
          fontFamily: family === 'system' ? undefined : family,
          letterSpacing: tracking,
          color: t.accent,
        }}
      >
        {content}
      </Text>
      <Text textStyle={{ fontSize: 16, color: t.muted, lineHeight: 24 }}>
        Native text with custom size, weight, color, and line height.
      </Text>
      <Text
        numberOfLines={lineLimit}
        style={{ width: 220 }}
        textStyle={{ fontSize: 14, color: t.text }}
      >
        This very long field note truncates to a single line when the text runs
        out of room.
      </Text>
      <Button
        label="Toggle title size"
        variant="outlined"
        onPress={() => setFontSize((v) => (v === 28 ? 36 : 28))}
      />
    </Stage>
  );
}
export function Layouts() {
  const [spacing, setSpacing] = useTunedState<number>(ControlId.Spacing, 8);
  const alignment = useKnob<'start' | 'center' | 'end'>(
    ControlId.Alignment,
    'center',
  );
  const rowWidth = useKnob(ControlId.RowWidth, 250);
  const cellPadding = useKnob(ControlId.CellPadding, 12);
  return (
    <Stage>
      <Row spacing={spacing} alignment={alignment}>
        <Text
          style={{ backgroundColor: '#dce8da', padding: cellPadding }}
          textStyle={{ color: '#163d29' }}
        >
          A
        </Text>
        <Text
          style={{ backgroundColor: '#eddbc8', padding: cellPadding + 8 }}
          textStyle={{ color: '#513321' }}
        >
          B
        </Text>
        <Text
          style={{ backgroundColor: '#dedcf0', padding: cellPadding }}
          textStyle={{ color: '#3b3157' }}
        >
          C
        </Text>
      </Row>
      <Row style={{ width: rowWidth }}>
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
  const [open, setOpen] = useTunedState<boolean>(ControlId.Expanded, false);
  const label = useKnob(ControlId.Label, 'What’s inside the pack?');
  const fontSize = useKnob(ControlId.FontSize, 16);
  return (
    <Stage>
      <Collapsible
        label={label}
        labelStyle={{ fontSize }}
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
  const height = useKnob(ControlId.Height, 320);
  const uppercase = useKnob(ControlId.Uppercase, false);
  const showFooter = useKnob(ControlId.ShowFooter, true);
  const [wifi, setWifi] = useState(true);
  const [offline, setOffline] = useState(false);
  return (
    <SpecimenHost
      style={{ height, width: '100%' }}
      ignoreSafeArea="all"
      colorScheme={t.dark ? 'dark' : 'light'}
    >
      <FieldGroup>
        <FieldGroup.Section title="Connection" titleUppercase={uppercase}>
          <Switch label="Use Wi-Fi" value={wifi} onValueChange={setWifi} />
          <Switch
            label="Offline maps"
            value={offline}
            onValueChange={setOffline}
          />
          {showFooter && (
            <FieldGroup.SectionFooter>
              <Text>Changes apply to this specimen only.</Text>
            </FieldGroup.SectionFooter>
          )}
        </FieldGroup.Section>
        <FieldGroup.Section title="Status">
          <Text>{wifi ? 'Wi-Fi available' : 'Wi-Fi disabled'}</Text>
        </FieldGroup.Section>
      </FieldGroup>
    </SpecimenHost>
  );
}
export function Lists() {
  const t = useTheme();
  const [selected, setSelected] = useState('None');
  const rows = useKnob(ControlId.Rows, 3);
  const height = useKnob(ControlId.Height, 260);
  const leading = useKnob(ControlId.Leading, true);
  const trailing = useKnob(ControlId.Trailing, true);
  const supporting = useKnob(ControlId.Supporting, true);
  return (
    <View style={{ gap: 12 }}>
      <RNText style={{ color: t.text }}>Last opened: {selected}</RNText>
      <SpecimenHost
        style={{ height, width: '100%' }}
        ignoreSafeArea="all"
        colorScheme={t.dark ? 'dark' : 'light'}
      >
        <List>
          {Array.from(
            { length: rows },
            (_, i) =>
              `${['Alpine trail', 'River crossing', 'Forest loop'][i % 3]} ${i + 1}`,
          ).map((name, i) => (
            <ListItem
              key={name}
              onPress={() => setSelected(name)}
              supportingText={
                supporting ? `${i + 2} km · Tap to select` : undefined
              }
            >
              <Text>{name}</Text>
              {leading && (
                <ListItem.Leading>
                  <Text>{String(i + 1).padStart(2, '0')}</Text>
                </ListItem.Leading>
              )}
              {trailing && (
                <ListItem.Trailing>
                  <Text>{selected === name ? '✓' : '→'}</Text>
                </ListItem.Trailing>
              )}
            </ListItem>
          ))}
        </List>
      </SpecimenHost>
    </View>
  );
}
export function Scrolling() {
  const direction = useKnob<'horizontal' | 'vertical'>(
    ControlId.ScrollDirection,
    'horizontal',
  );
  const indicators = useKnob(ControlId.Indicators, true);
  const cards = useKnob(ControlId.Cards, 5);
  const cardWidth = useKnob(ControlId.CardWidth, 150);
  const cardHeight = useKnob(ControlId.CardHeight, 150);
  const Container = direction === 'horizontal' ? Row : Column;
  return (
    <SpecimenHost style={{ height: 180, width: '100%' }} ignoreSafeArea="all">
      <ScrollView direction={direction} showsIndicators={indicators}>
        <Container spacing={12}>
          {Array.from({ length: cards }, (_, i) => `Landscape ${i + 1}`).map(
            (name) => (
              <Column
                key={name}
                spacing={12}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: 18,
                  padding: 18,
                  backgroundColor: '#e5efdf',
                }}
              >
                <Text textStyle={{ color: '#246b4d', fontSize: 20 }}>
                  {name}
                </Text>
                <Text textStyle={{ color: '#395e4a' }}>Swipe to explore →</Text>
              </Column>
            ),
          )}
        </Container>
      </ScrollView>
    </SpecimenHost>
  );
}
export function Interop() {
  const t = useTheme();
  const bridgePadding = useKnob(ControlId.BridgePadding, 18);
  const bridgeRadius = useKnob(ControlId.BridgeRadius, 16);
  return (
    <Stage>
      <Text>Native Expo UI above</Text>
      <RNHostView matchContents={{ vertical: true }}>
        <View
          style={{
            backgroundColor: t.soft,
            padding: bridgePadding,
            borderRadius: bridgeRadius,
          }}
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
