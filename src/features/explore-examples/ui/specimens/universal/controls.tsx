import {
  Button,
  Checkbox,
  Column,
  Picker,
  Slider,
  Switch,
  Text,
  TextInput,
  useNativeState,
} from '@expo/ui';
import { type PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../shared/theme';
import { useKnob, useTunedState } from '../../../model/tuning';
import { SpecimenHost } from '../../specimen-host';
export function Stage({ children }: PropsWithChildren) {
  const t = useTheme();
  return (
    <SpecimenHost
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      colorScheme={t.dark ? 'dark' : 'light'}
      style={{ width: '100%' }}
    >
      <Column spacing={16}>{children}</Column>
    </SpecimenHost>
  );
}
export function Buttons() {
  const [presses, setPresses] = useState(0);
  const variant = useKnob<'filled' | 'outlined' | 'text'>('variant', 'filled');
  const label = useKnob('label', 'Add a point');
  const enabled = useKnob('enabled', true);
  const radius = useKnob('radius', 12);
  const padding = useKnob('padding', 12);
  const opacity = useKnob('opacity', 1);
  return (
    <Stage>
      <Button
        label={label}
        variant={variant}
        disabled={!enabled}
        style={{ borderRadius: radius, padding, opacity }}
        onPress={() => setPresses((v) => v + 1)}
      />
      {(['filled', 'outlined', 'text'] as const).map((v) => (
        <Button
          key={v}
          label={`${v} comparison`}
          variant={v}
          onPress={() => setPresses((n) => n + 1)}
        />
      ))}
      <Button label="Disabled" disabled />
      <Text>{`Score: ${presses}`}</Text>
    </Stage>
  );
}
export function Sliders() {
  const [value, setValue] = useTunedState<number>('value', 35);
  const [stepped, setStepped] = useState(50);
  const max = useKnob('maximum', 100);
  const step = useKnob('step', 5);
  const enabled = useKnob('enabled', true);
  return (
    <Stage>
      <Text>{`Continuous: ${Math.round(Math.min(value, max))}`}</Text>
      <Slider
        value={Math.min(value, max)}
        onValueChange={setValue}
        min={0}
        max={max}
        disabled={!enabled}
        testID="continuous-slider"
      />
      <Text>{`Stepped: ${Math.min(stepped, max)} · increments of ${step}`}</Text>
      <Slider
        value={Math.min(stepped, max)}
        onValueChange={setStepped}
        min={0}
        max={max}
        step={step}
        disabled={!enabled}
      />
      <Text>Disabled comparison</Text>
      <Slider
        value={Math.min(60, max)}
        onValueChange={() => {}}
        min={0}
        max={max}
        disabled
      />
    </Stage>
  );
}
export function Toggles() {
  const [enabled, setEnabled] = useTunedState<boolean>('notifications', true);
  const [checked, setChecked] = useTunedState<boolean>('digest', false);
  const interactive = useKnob('enabled', true);
  const label = useKnob('label', 'Enable notifications');
  return (
    <Stage>
      <Switch
        label={label}
        value={enabled}
        onValueChange={setEnabled}
        disabled={!interactive}
      />
      <Switch
        label="Disabled switch"
        value={false}
        onValueChange={() => {}}
        disabled
      />
      <Checkbox
        label="Include a daily digest"
        value={checked}
        onValueChange={setChecked}
        disabled={!interactive}
      />
      <Checkbox
        label="Disabled, checked"
        value
        onValueChange={() => {}}
        disabled
      />
      <Text>{`Notifications ${enabled ? 'on' : 'off'} · digest ${checked ? 'included' : 'off'}`}</Text>
    </Stage>
  );
}
export function Pickers() {
  const [value, setValue] = useTunedState('palette', 'forest');
  const appearance = useKnob<'menu' | 'wheel'>('appearanceMode', 'menu');
  const enabled = useKnob('enabled', true);
  const items = [
    <Picker.Item key="forest" label="Forest" value="forest" />,
    <Picker.Item key="ocean" label="Ocean" value="ocean" />,
    <Picker.Item key="sunset" label="Sunset" value="sunset" />,
  ];
  return (
    <Stage>
      <Text>{`Selected palette: ${value}`}</Text>
      <Picker
        selectedValue={value}
        onValueChange={setValue}
        appearance={appearance}
        enabled={enabled}
      >
        {items}
      </Picker>
      <Text>Wheel on iOS; native dropdown elsewhere</Text>
      <Picker selectedValue={value} onValueChange={setValue} appearance="wheel">
        {items}
      </Picker>
      <Picker selectedValue={value} onValueChange={setValue} enabled={false}>
        {items}
      </Picker>
    </Stage>
  );
}
export function TextFields() {
  const text = useNativeState('');
  const [echo, setEcho] = useState('');
  const [submitted, setSubmitted] = useState('Nothing submitted yet');
  const editable = useKnob('editable', true);
  const multiline = useKnob('multiline', false);
  const secure = useKnob('secure', false);
  const lines = useKnob('lines', 3);
  const maxLength = useKnob('maxLength', 60);
  const fontSize = useKnob('fontSize', 16);
  const keyboard = useKnob<
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'url'
    | 'decimal-pad'
  >('keyboard', 'default');
  const capitalize = useKnob<'none' | 'sentences' | 'words' | 'characters'>(
    'capitalize',
    'sentences',
  );
  return (
    <Stage>
      <TextInput
        value={text}
        placeholder="Name your next adventure"
        onChangeText={setEcho}
        onSubmitEditing={(v) => setSubmitted(v || 'Empty submission')}
        returnKeyType="done"
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={lines}
        secureTextEntry={secure}
        keyboardType={keyboard}
        autoCapitalize={capitalize}
        textStyle={{ fontSize }}
        style={styles.textInput}
      />
      <Text>{`${echo.length}/${maxLength} characters · ${submitted}`}</Text>
      <TextInput
        placeholder="A few field notes…"
        multiline
        numberOfLines={3}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password (demo only)"
        secureTextEntry
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput defaultValue="Read-only specimen" readOnly />
      <Button
        label="Set from JavaScript"
        variant="outlined"
        onPress={() => {
          text.set('Hello from Atlas');
          setEcho('Hello from Atlas');
        }}
      />
    </Stage>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#7a9482',
    borderRadius: 12,
  },
});
