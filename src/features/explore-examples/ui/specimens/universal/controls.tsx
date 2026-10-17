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
import { useTheme } from '../../../../../shared/theme';
import { ControlId } from '../../../model/control-identifiers';
import { useKnob, useTunedState, useTuningValue } from '../../../model/tuning';
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
  const variant = useKnob<'filled' | 'outlined' | 'text'>(
    ControlId.Variant,
    'filled',
  );
  const label = useKnob(ControlId.Label, 'Add a point');
  const enabled = useKnob(ControlId.Enabled, true);
  const radius = useTuningValue(ControlId.Radius);
  const padding = useTuningValue(ControlId.Padding);
  const opacity = useTuningValue(ControlId.Opacity);
  return (
    <Stage>
      <Button
        label={label}
        variant={variant}
        disabled={!enabled}
        style={{
          borderRadius: typeof radius === 'number' ? radius : undefined,
          padding: typeof padding === 'number' ? padding : undefined,
          opacity: typeof opacity === 'number' ? opacity : undefined,
        }}
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
  const [value, setValue] = useTunedState<number>(ControlId.Value, 35);
  const [stepped, setStepped] = useState(50);
  const max = useKnob(ControlId.Maximum, 100);
  const step = useKnob(ControlId.Step, 5);
  const enabled = useKnob(ControlId.Enabled, true);
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
  const [enabled, setEnabled] = useTunedState<boolean>(
    ControlId.Notifications,
    true,
  );
  const [checked, setChecked] = useTunedState<boolean>(ControlId.Digest, false);
  const interactive = useKnob(ControlId.Enabled, true);
  const label = useKnob(ControlId.Label, 'Enable notifications');
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
  const [value, setValue] = useTunedState<string>(ControlId.Palette, 'forest');
  const appearance = useKnob<'menu' | 'wheel'>(
    ControlId.AppearanceMode,
    'menu',
  );
  const enabled = useKnob(ControlId.Enabled, true);
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
  const editable = useKnob(ControlId.Editable, true);
  const multiline = useKnob(ControlId.Multiline, false);
  const secure = useKnob(ControlId.Secure, false);
  const lines = useKnob(ControlId.Lines, 3);
  const maxLength = useKnob(ControlId.MaxLength, 60);
  const fontSize = useTuningValue(ControlId.FontSize);
  const keyboard = useKnob<
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'url'
    | 'decimal-pad'
  >(ControlId.Keyboard, 'default');
  const capitalize = useKnob<'none' | 'sentences' | 'words' | 'characters'>(
    ControlId.Capitalize,
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
        textStyle={typeof fontSize === 'number' ? { fontSize } : undefined}
      />
      <Text>{`${echo.length}/${maxLength} characters · ${submitted}`}</Text>
      <TextInput placeholder="A few field notes…" multiline numberOfLines={3} />
      <TextInput
        placeholder="Password (demo only)"
        secureTextEntry
        autoCapitalize="none"
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
