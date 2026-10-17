import { NativeTabs } from 'expo-router/native-tabs';
import { appConfig, useTranslation } from '../../shared/config';
export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <NativeTabs>
      {appConfig.navigation.tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.route} name={tab.route}>
          <NativeTabs.Trigger.Icon {...tab.icon} />
          <NativeTabs.Trigger.Label>{t(tab.labelKey)}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
