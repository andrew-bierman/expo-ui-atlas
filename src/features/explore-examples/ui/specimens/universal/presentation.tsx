import type { SnapPoint } from '@expo/ui';
import { BottomSheet, Button, Column, Text } from '@expo/ui';
import { useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { useTheme } from '../../../../../shared/theme';
import { useKnob, useTunedState } from '../../../model/tuning';
import { SpecimenHost } from '../../specimen-host';
import { Stage } from './controls';
export function Sheet() {
  const [open, setOpen] = useState(false);
  const [snapMode, setSnapMode] = useTunedState<string>(
    'snapMode',
    'half + full',
  );
  const dragIndicator = useKnob('dragIndicator', true);
  const contentPadding = useKnob('contentPadding', 24);
  const background = useKnob<string>('sheetBackground', 'system');
  const snapPoints: SnapPoint[] | undefined =
    snapMode === 'automatic'
      ? undefined
      : snapMode === 'full'
        ? ['full']
        : snapMode === 'fraction 0.3'
          ? [{ fraction: 0.3 }]
          : snapMode === 'height 320'
            ? [{ height: 320 }]
            : ['half', 'full'];
  const t = useTheme();
  return (
    <View>
      <Stage>
        <Button
          label={`Open ${snapMode} sheet`}
          onPress={() => {
            setOpen(true);
          }}
        />
        <Button
          label="Open full-height sheet"
          variant="outlined"
          onPress={() => {
            setSnapMode('full');
            setOpen(true);
          }}
        />
      </Stage>
      <BottomSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        snapPoints={snapPoints}
        showDragIndicator={dragIndicator}
        contentPadding={contentPadding}
        containerColor={background === 'system' ? t.surface : background}
      >
        <View style={{ gap: 20 }}>
          <RNText
            style={{
              color: background === '#17211c' ? '#ffffff' : t.text,
              fontSize: 26,
              fontWeight: '600',
            }}
          >
            A little more space.
          </RNText>
          <RNText
            style={{
              color: background === '#17211c' ? '#cbdacf' : t.muted,
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            Drag the handle, tap outside, or use the close button. Sheet
            children are React Native views, so this Expo UI button gets a fresh
            Host.
          </RNText>
          <SpecimenHost
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            colorScheme={t.dark ? 'dark' : 'light'}
          >
            <Column>
              <Button label="Close sheet" onPress={() => setOpen(false)} />
              <Text>Native content inside a new Host</Text>
            </Column>
          </SpecimenHost>
        </View>
      </BottomSheet>
    </View>
  );
}
