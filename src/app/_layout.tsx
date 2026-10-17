import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
export default function Layout() {
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
          options={{ title: 'Explore specimen' }}
        />
        <Stack.Screen
          name="reference/[id]"
          options={{
            presentation: 'formSheet',
            title: 'Documentation',
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.5, 1],
          }}
        />
        <Stack.Screen
          name="playground/[id]"
          options={{
            presentation: 'formSheet',
            title: 'Customize',
            sheetGrabberVisible: true,
            sheetAllowedDetents: [1],
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
