import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { appConfig, useTranslation } from '../shared/config';
export default function Layout() {
  const { t } = useTranslation();
  const dark = useColorScheme() === 'dark';
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="component/[id]"
          options={{ title: t('navigation.detail') }}
        />
        <Stack.Screen
          name="reference/[id]"
          options={{
            presentation: 'formSheet',
            title: t('navigation.documentation'),
            sheetGrabberVisible: true,
            sheetAllowedDetents: [...appConfig.navigation.sheets.reference],
          }}
        />
        <Stack.Screen
          name="playground/[id]"
          options={{
            presentation: 'formSheet',
            title: t('navigation.customize'),
            sheetGrabberVisible: true,
            sheetAllowedDetents: [...appConfig.navigation.sheets.customize],
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
