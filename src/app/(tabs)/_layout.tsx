import { NativeTabs } from 'expo-router/native-tabs';
export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(catalog)">
        <NativeTabs.Trigger.Icon sf="square.grid.2x2" md="apps" />
        <NativeTabs.Trigger.Label>Catalog</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="guide">
        <NativeTabs.Trigger.Icon sf="book" md="info" />
        <NativeTabs.Trigger.Label>Guide</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
