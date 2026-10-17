import {
  Button,
  Column,
  Host,
  Picker,
  Slider,
  Switch,
  Text,
  TextInput,
  useNativeState,
} from '@expo/ui';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../../shared/theme';
import type { TuningControl, TuningValue, TuningValues } from '../model/tuning';

function TextControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const text = useNativeState(value);
  useEffect(() => {
    if (text.get() !== value) text.set(value);
  }, [text, value]);
  return (
    <TextInput
      value={text}
      onChangeText={onChange}
      style={{
        borderWidth: 1,
        borderColor: '#789581',
        borderRadius: 10,
        padding: 12,
      }}
    />
  );
}
export function TuningControls({
  controls,
  values,
  onChange,
}: {
  controls: TuningControl[];
  values: TuningValues;
  onChange: (id: string, value: TuningValue) => void;
}) {
  const t = useTheme();
  return (
    <ScrollView
      nestedScrollEnabled
      style={{ maxHeight: 360 }}
      contentContainerStyle={{ gap: 18, paddingVertical: 8 }}
      keyboardShouldPersistTaps="handled"
    >
      {controls.map((control) => (
        <Host
          key={control.id}
          matchContents={{ vertical: true }}
          ignoreSafeArea="all"
          seedColor={t.accent}
          colorScheme={t.dark ? 'dark' : 'light'}
          style={{ width: '100%' }}
        >
          <Column spacing={8}>
            <Text
              textStyle={{ color: t.text, fontSize: 13, fontWeight: '600' }}
            >
              {control.type === 'range'
                ? `${control.label}: ${values[control.id]}`
                : control.label}
            </Text>
            {control.description ? (
              <Text textStyle={{ color: t.muted, fontSize: 12 }}>
                {control.description}
              </Text>
            ) : null}
            {control.type === 'select' ? (
              <Picker
                selectedValue={String(values[control.id])}
                onValueChange={(value) => onChange(control.id, value)}
              >
                {control.options.map((option) => (
                  <Picker.Item key={option} value={option} label={option} />
                ))}
              </Picker>
            ) : control.type === 'toggle' ? (
              <Switch
                label={control.label}
                value={Boolean(values[control.id])}
                onValueChange={(value) => onChange(control.id, value)}
              />
            ) : control.type === 'range' ? (
              <Slider
                value={Number(values[control.id])}
                min={control.min}
                max={control.max}
                step={control.step}
                onValueChange={(value) => onChange(control.id, value)}
                testID={`knob-${control.id}`}
              />
            ) : (
              <TextControl
                value={String(values[control.id])}
                onChange={(value) => onChange(control.id, value)}
              />
            )}
          </Column>
        </Host>
      ))}
    </ScrollView>
  );
}
export function ConfigEditor({
  value,
  onApply,
}: {
  value: string;
  onApply: (value: string) => string | undefined;
}) {
  const t = useTheme();
  const input = useNativeState(value);
  const error = useNativeState('');
  useEffect(() => {
    input.set(value);
  }, [input, value]);
  return (
    <View style={{ gap: 8 }}>
      <Host
        matchContents={{ vertical: true }}
        ignoreSafeArea="all"
        colorScheme={t.dark ? 'dark' : 'light'}
        style={{ width: '100%' }}
      >
        <Column spacing={12}>
          <Text textStyle={{ color: t.text, fontSize: 13 }}>
            Edit the values below, then apply. Unsupported keys and values are
            rejected.
          </Text>
          <TextInput
            value={input}
            multiline
            numberOfLines={8}
            autoCapitalize="none"
            autoCorrect={false}
            textStyle={{ fontFamily: 'monospace', fontSize: 12, color: t.text }}
            style={{
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 12,
              padding: 12,
            }}
          />
          <Button
            label="Apply configuration"
            variant="outlined"
            onPress={() =>
              error.set(onApply(input.get()) ?? 'Configuration applied')
            }
          />
          <TextInput
            value={error}
            readOnly
            textStyle={{ color: t.muted, fontSize: 12 }}
          />
        </Column>
      </Host>
    </View>
  );
}
