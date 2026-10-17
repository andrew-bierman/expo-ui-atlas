import { Component, type PropsWithChildren, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Body, Pill } from '../../../shared/ui';
import type { Example } from '../model/types';

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
          padding: 20,
          borderTopWidth: 1,
          borderColor: t.border,
        }}
      >
        <SpecimenBoundary key={revision}>
          <Demo />
        </SpecimenBoundary>
      </View>
      <View
        style={{
          padding: 12,
          gap: 8,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: t.border,
        }}
      >
        <Pill label="Reset example" onPress={() => setRevision((v) => v + 1)} />
        {example.code ? (
          <Pill
            label={showCode ? 'Hide recipe' : 'View recipe'}
            selected={showCode}
            onPress={() => setShowCode((v) => !v)}
          />
        ) : null}
      </View>
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
