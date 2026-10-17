import { Stack } from 'expo-router/stack';
import { useTranslation } from '../../../shared/config';
export default function Layout() {
  const { t } = useTranslation();
  return <Stack screenOptions={{ title: t('navigation.catalog') }} />;
}
