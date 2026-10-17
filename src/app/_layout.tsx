import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../shared/theme';
export default function Layout() {
  const t = useTheme();
  return (
    <ThemeProvider
      value={{
        ...(t.dark ? DarkTheme : DefaultTheme),
        colors: {
          ...(t.dark ? DarkTheme : DefaultTheme).colors,
          background: t.background,
          card: t.surface,
          text: t.text,
          primary: t.accent,
        },
      }}
    >
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: t.background },
          headerTintColor: t.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: t.background },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="component/[id]"
          options={{ title: 'Explore specimen' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
