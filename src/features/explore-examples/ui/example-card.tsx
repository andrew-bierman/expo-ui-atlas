import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { Component, type PropsWithChildren, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Body, Pill } from '../../../shared/ui';
import { environmentControls } from '../config/environment';
import {
  TuningProvider,
  type TuningValue,
  type TuningValues,
} from '../model/tuning';
import {
  defaultTuning,
  parseTuning,
  updateTuning,
} from '../model/tuning-values';
import type { Example } from '../model/types';
import { ConfigEditor, TuningControls } from './tuning-controls';

class SpecimenBoundary extends Component<
  PropsWithChildren,
  { error: boolean }
> {
  override state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  override render() {
    return this.state.error ? (
      <Body>
        This specimen could not render. Check your Expo Go version, then reset
        to try again.
      </Body>
    ) : (
      this.props.children
    );
  }
}
export function ExampleCard({
  example,
  index,
  initialValues = {},
  customization = true,
}: {
  example: Example;
  index: number;
  initialValues?: TuningValues;
  customization?: boolean;
}) {
  const t = useTheme();
  const [revision, setRevision] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [customize, setCustomize] = useState(false);
  const controls = [...(example.controls ?? []), ...environmentControls];
  const [overrides, setOverrides] = useState<TuningValues>(initialValues);
  const values = { ...defaultTuning(controls), ...overrides };
  const change = (id: string, value: TuningValue) =>
    setOverrides((old) => updateTuning(controls, old, id, value));
  const previewDark =
    values.appearance === 'dark' || (values.appearance === 'system' && t.dark);
  const Demo = example.component;
  return (
    <View style={{ gap: 12 }}>
      <View style={{ padding: 20, gap: 10 }}>
        <Body>{`${index + 1}. ${example.title}`}</Body>
        <Body>{example.description}</Body>
      </View>
      <View
        style={{
          minHeight: 100,
          padding: Number(values.previewPadding),
          backgroundColor:
            values.appearance === 'system'
              ? t.background
              : previewDark
                ? DarkTheme.colors.card
                : DefaultTheme.colors.card,
        }}
      >
        <View
          style={{
            width: `${Number(values.previewWidth)}%`,
            alignSelf: 'center',
          }}
        >
          <TuningProvider values={overrides} onChange={change}>
            <SpecimenBoundary key={revision}>
              <Demo />
            </SpecimenBoundary>
          </TuningProvider>
        </View>
      </View>
      <View
        style={{
          padding: 12,
          gap: 8,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {customization ? (
          <Pill
            label="Customize"
            selected={customize}
            onPress={() => setCustomize((v) => !v)}
          />
        ) : null}
        <Pill
          label="Reset example"
          onPress={() => {
            setOverrides(initialValues);
            setRevision((v) => v + 1);
          }}
        />
        {example.code ? (
          <Pill
            label={showCode ? 'Hide recipe' : 'View recipe'}
            selected={showCode}
            onPress={() => setShowCode((v) => !v)}
          />
        ) : null}
      </View>
      {customize ? (
        <View
          style={{
            padding: 20,
            gap: 18,
          }}
        >
          <Body>Live controls</Body>
          <Body>
            Change component props and the native environment. Your experiment
            stays local to this specimen.
          </Body>
          <TuningControls
            controls={controls}
            values={values}
            onChange={change}
          />
          <ConfigEditor
            key={revision}
            value={JSON.stringify(values, null, 2)}
            onApply={(text) => {
              const result = parseTuning(controls, text);
              if ('error' in result) return result.error;
              setOverrides(result.values);
              return undefined;
            }}
          />
        </View>
      ) : null}
      {showCode && example.code ? <Body>{example.code}</Body> : null}
    </View>
  );
}
