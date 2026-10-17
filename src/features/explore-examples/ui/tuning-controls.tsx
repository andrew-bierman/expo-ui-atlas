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
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useTranslation } from '../../../shared/config';
import { type ControlId, ControlType } from '../model/control-identifiers';
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
  return <TextInput value={text} onChangeText={onChange} />;
}
export function TuningControls({
  controls,
  values,
  onChange,
  onClear,
}: {
  controls: TuningControl[];
  values: TuningValues;
  onChange: (id: string, value: TuningValue) => void;
  onClear: (id: ControlId) => void;
}) {
  const { t } = useTranslation();
  const labelFor = (control: TuningControl) =>
    control.labelKey ? t(control.labelKey) : control.label;
  return (
    <View style={{ gap: 16 }}>
      {controls.map((control) => (
        <Host
          key={control.id}
          matchContents={{ vertical: true }}
          ignoreSafeArea="all"
          style={{ width: '100%' }}
        >
          <Column spacing={8}>
            <Text>
              {control.type === ControlType.Range
                ? t('tuning.rangeLabel', {
                    label: labelFor(control),
                    value: String(
                      values[control.id] ?? t('tuning.nativeDefault'),
                    ),
                  })
                : labelFor(control)}
            </Text>
            {control.description ? <Text>{control.description}</Text> : null}
            {control.type === ControlType.Select ? (
              <Picker
                selectedValue={String(values[control.id])}
                onValueChange={(value) => onChange(control.id, value)}
              >
                {control.options.map((option) => (
                  <Picker.Item key={option} value={option} label={option} />
                ))}
              </Picker>
            ) : control.type === ControlType.Toggle ? (
              <Switch
                label={labelFor(control)}
                value={Boolean(values[control.id])}
                onValueChange={(value) => onChange(control.id, value)}
              />
            ) : control.type === ControlType.Range ? (
              <Column spacing={8}>
                {control.nativeDefault ? (
                  <Switch
                    label={t('tuning.override', {
                      label: labelFor(control).toLowerCase(),
                    })}
                    testID={`override-${control.id}`}
                    value={values[control.id] !== undefined}
                    onValueChange={(enabled) =>
                      enabled
                        ? onChange(control.id, control.defaultValue)
                        : onClear(control.id)
                    }
                  />
                ) : null}
                <Slider
                  value={Number(values[control.id] ?? control.defaultValue)}
                  disabled={
                    control.nativeDefault && values[control.id] === undefined
                  }
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  onValueChange={(value) => onChange(control.id, value)}
                  testID={`knob-${control.id}`}
                />
              </Column>
            ) : (
              <TextControl
                value={String(values[control.id])}
                onChange={(value) => onChange(control.id, value)}
              />
            )}
          </Column>
        </Host>
      ))}
    </View>
  );
}
export function ConfigEditor({
  value,
  onApply,
}: {
  value: string;
  onApply: (value: string) => string | undefined;
}) {
  const { t } = useTranslation();
  const input = useNativeState(value);
  const error = useNativeState('');
  const dirty = useRef(false);
  useEffect(() => {
    if (!dirty.current) {
      if (input.get() !== value) input.set(value);
    }
  }, [input, value]);
  return (
    <View style={{ gap: 8 }}>
      <Host
        matchContents={{ vertical: true }}
        ignoreSafeArea="all"
        style={{ width: '100%' }}
      >
        <Column spacing={12}>
          <Text>{t('configuration.instructions')}</Text>
          <TextInput
            value={input}
            testID="configuration-input"
            multiline
            numberOfLines={8}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              dirty.current = text !== value;
              if (dirty.current) error.set('');
            }}
          />
          <Button
            label={t('configuration.apply')}
            variant="outlined"
            onPress={() => {
              const message = onApply(input.get());
              if (!message) dirty.current = false;
              error.set(message ?? t('configuration.applied'));
            }}
          />
          <TextInput value={error} readOnly />
        </Column>
      </Host>
    </View>
  );
}
