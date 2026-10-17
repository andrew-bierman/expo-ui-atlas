import { NativeTabs } from 'expo-router/native-tabs';
import { Platform, View } from 'react-native';
import { useTheme } from '../../shared/theme';
export default function TabsLayout() {
  const t = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'web' ? 80 : 0,
        backgroundColor: t.background,
      }}
    >
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="square.grid.2x2" md="apps" />
          <NativeTabs.Trigger.Label>Catalog</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="playground">
          <NativeTabs.Trigger.Icon sf="slider.horizontal.3" md="tune" />
          <NativeTabs.Trigger.Label>Playground</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="guide">
          <NativeTabs.Trigger.Icon sf="book" md="info" />
          <NativeTabs.Trigger.Label>Guide</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </View>
  );
}
