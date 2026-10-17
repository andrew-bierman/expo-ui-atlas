import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../shared/theme';
export default function Layout() {
  const t = useTheme();
  return (
    <>
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="component/[id]"
          options={{ title: 'Explore specimen' }}
        />
      </Stack>
    </>
  );
}
