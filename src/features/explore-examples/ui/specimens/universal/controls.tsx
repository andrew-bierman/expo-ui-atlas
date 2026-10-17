import {
  Button,
  Checkbox,
  Column,
  Host,
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
export function Stage({ children }: PropsWithChildren) {
  const t = useTheme();
  return (
    <Host
      matchContents={{ vertical: true }}
      ignoreSafeArea="all"
      colorScheme={t.dark ? 'dark' : 'light'}
      style={{ width: '100%' }}
    >
      <Column spacing={16}>{children}</Column>
    </Host>
  );
}
export function Buttons() {
  const [presses, setPresses] = useState(0);
  return (
    <Stage>
      <Button
        label="Filled · add a point"
        onPress={() => setPresses((v) => v + 1)}
      />
      <Button
        label="Outlined · remove a point"
        variant="outlined"
        onPress={() => setPresses((v) => v - 1)}
      />
      <Button
        label="Text · start over"
        variant="text"
        onPress={() => setPresses(0)}
      />
      <Button label="Disabled" disabled />
      <Text>{`Score: ${presses}`}</Text>
    </Stage>
  );
}
export function Sliders() {
  const [value, setValue] = useState(35);
  const [step, setStep] = useState(50);
  return (
    <Stage>
      <Text>{`Continuous: ${Math.round(value)}%`}</Text>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        testID="continuous-slider"
      />
      <Text>{`Stepped: ${step}% · increments of 25`}</Text>
      <Slider
        value={step}
        onValueChange={setStep}
        min={0}
        max={100}
        step={25}
      />
      <Text>Disabled at 60%</Text>
      <Slider value={60} onValueChange={() => {}} min={0} max={100} disabled />
    </Stage>
  );
}
export function Toggles() {
  const [enabled, setEnabled] = useState(true);
  const [checked, setChecked] = useState(false);
  return (
    <Stage>
      <Switch
        label="Enable notifications"
        value={enabled}
        onValueChange={setEnabled}
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
  const [value, setValue] = useState('forest');
  return (
    <Stage>
      <Text>{`Selected palette: ${value}`}</Text>
      <Picker selectedValue={value} onValueChange={setValue}>
        <Picker.Item label="Forest" value="forest" />
        <Picker.Item label="Ocean" value="ocean" />
        <Picker.Item label="Sunset" value="sunset" />
      </Picker>
      <Text>Wheel on iOS; native dropdown elsewhere</Text>
      <Picker selectedValue={value} onValueChange={setValue} appearance="wheel">
        <Picker.Item label="Forest" value="forest" />
        <Picker.Item label="Ocean" value="ocean" />
        <Picker.Item label="Sunset" value="sunset" />
      </Picker>
      <Picker selectedValue={value} onValueChange={setValue} enabled={false}>
        <Picker.Item label="Disabled palette" value={value} />
      </Picker>
    </Stage>
  );
}
export function TextFields() {
  const text = useNativeState('');
  const [echo, setEcho] = useState('');
  const [submitted, setSubmitted] = useState('Nothing submitted yet');
  return (
    <Stage>
      <TextInput
        value={text}
        placeholder="Name your next adventure"
        onChangeText={setEcho}
        onSubmitEditing={(v) => setSubmitted(v || 'Empty submission')}
        returnKeyType="done"
        maxLength={60}
        style={styles.textInput}
      />
      <Text>{`${echo.length}/60 characters · ${submitted}`}</Text>
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
