import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { Component, type PropsWithChildren, useState } from 'react';
import { View } from 'react-native';
import { i18n, useTranslation } from '../../../shared/config';
import { Body, Pill } from '../../../shared/ui';
import { environmentControls } from '../config/environment';
import { ControlId } from '../model/control-identifiers';
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
      <Body>{i18n.t('examples.renderError')}</Body>
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
  const { t } = useTranslation();
  const [revision, setRevision] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const controls = [...(example.controls ?? []), ...environmentControls];
  const [overrides, setOverrides] = useState<TuningValues>(initialValues);
  const values = { ...defaultTuning(controls), ...overrides };
  const change = (id: string, value: TuningValue) =>
    setOverrides((old) => updateTuning(controls, old, id, value));
  const Demo = example.component;
  return (
    <View style={{ gap: 12 }}>
      <View style={{ padding: 20, gap: 10 }}>
        <Body>
          {t('examples.title', { index: index + 1, title: example.title })}
        </Body>
        {example.description ? <Body>{example.description}</Body> : null}
      </View>
      <View
        style={{
          minHeight: 100,
          padding: Number(values.previewPadding),
          backgroundColor:
            values[ControlId.Appearance] === 'dark'
              ? DarkTheme.colors.background
              : values[ControlId.Appearance] === 'light'
                ? DefaultTheme.colors.background
                : undefined,
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
        <Pill
          label={t('examples.reset')}
          onPress={() => {
            setOverrides(initialValues);
            setRevision((v) => v + 1);
          }}
        />
        {customization && example.code ? (
          <Pill
            label={t(showCode ? 'examples.hideRecipe' : 'examples.viewRecipe')}
            selected={showCode}
            onPress={() => setShowCode((v) => !v)}
          />
        ) : null}
      </View>
      {customization ? (
        <View
          style={{
            padding: 20,
            gap: 18,
          }}
        >
          <Body>{t('examples.liveControls')}</Body>
          <Body>{t('examples.localExperiment')}</Body>
          <TuningControls
            controls={controls}
            values={values}
            onChange={change}
            onClear={(id) =>
              setOverrides((old) => {
                const next = { ...old };
                delete next[id];
                return next;
              })
            }
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
