import { Component, type PropsWithChildren, useState } from 'react';
import { Text, View } from 'react-native';
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
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <Text style={{ color: '#ad4b2c', padding: 20 }}>
        This specimen could not render. Check your Expo Go version, then reset
        to try again.
      </Text>
    ) : (
      this.props.children
    );
  }
}
export function ExampleCard({
  example,
  index,
}: {
  example: Example;
  index: number;
}) {
  const t = useTheme();
  const [revision, setRevision] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [customize, setCustomize] = useState(false);
  const controls = [...(example.controls ?? []), ...environmentControls];
  const [overrides, setOverrides] = useState<TuningValues>({});
  const values = { ...defaultTuning(controls), ...overrides };
  const change = (id: string, value: TuningValue) =>
    setOverrides((old) => updateTuning(controls, old, id, value));
  const previewDark =
    values.appearance === 'dark' || (values.appearance === 'system' && t.dark);
  const Demo = example.component;
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: t.surface,
      }}
    >
      <View style={{ padding: 20, gap: 10 }}>
        <Text
          style={{
            color: t.accent,
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 1.4,
          }}
        >
          SPECIMEN {String(index + 1).padStart(2, '0')}
        </Text>
        <Text
          accessibilityRole="header"
          style={{ color: t.text, fontSize: 22, fontWeight: '600' }}
        >
          {example.title}
        </Text>
        <Body muted>{example.description}</Body>
      </View>
      <View
        style={{
          minHeight: 100,
          padding: Number(values.previewPadding),
          backgroundColor: previewDark ? '#17211c' : '#ffffff',
          borderTopWidth: 1,
          borderColor: t.border,
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
          borderTopWidth: 1,
          borderColor: t.border,
        }}
      >
        <Pill
          label="Customize"
          selected={customize}
          onPress={() => setCustomize((v) => !v)}
        />
        <Pill
          label="Reset example"
          onPress={() => {
            setOverrides({});
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
            borderTopWidth: 1,
            borderColor: t.border,
          }}
        >
          <Text style={{ color: t.text, fontWeight: '700', fontSize: 18 }}>
            Live controls
          </Text>
          <Body muted>
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
      {showCode && example.code ? (
        <Text
          selectable
          style={{
            padding: 20,
            fontFamily: 'monospace',
            fontSize: 12,
            lineHeight: 20,
            color: t.text,
            backgroundColor: t.soft,
          }}
        >
          {example.code}
        </Text>
      ) : null}
    </View>
  );
}
