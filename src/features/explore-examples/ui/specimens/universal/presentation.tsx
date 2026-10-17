import { BottomSheet, Button, Column, Host, Text } from '@expo/ui';
import { useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { useTheme } from '../../../../../shared/theme';
import { Stage } from './controls';
export function Sheet() {
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const t = useTheme();
  return (
    <View>
      <Stage>
        <Button
          label="Open half / full sheet"
          onPress={() => {
            setFull(false);
            setOpen(true);
          }}
        />
        <Button
          label="Open full-height sheet"
          variant="outlined"
          onPress={() => {
            setFull(true);
            setOpen(true);
          }}
        />
      </Stage>
      <BottomSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        snapPoints={full ? ['full'] : ['half', 'full']}
        showDragIndicator
        containerColor={t.surface}
      >
        <View style={{ padding: 24, gap: 20 }}>
          <RNText style={{ color: t.text, fontSize: 26, fontWeight: '600' }}>
            A little more space.
          </RNText>
          <RNText style={{ color: t.muted, fontSize: 16, lineHeight: 24 }}>
            Drag the handle, tap outside, or use the close button. Sheet
            children are React Native views, so this Expo UI button gets a fresh
            Host.
          </RNText>
          <Host
            matchContents={{ vertical: true }}
            ignoreSafeArea="all"
            colorScheme={t.dark ? 'dark' : 'light'}
          >
            <Column>
              <Button label="Close sheet" onPress={() => setOpen(false)} />
              <Text>Native content inside a new Host</Text>
            </Column>
          </Host>
        </View>
      </BottomSheet>
    </View>
  );
}
