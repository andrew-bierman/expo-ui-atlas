import { Link } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from '../../../shared/config';
import { Notice } from '../../../shared/ui';
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <View style={{ padding: 24, gap: 20 }}>
      <Notice title={t('notFound.title')}>{t('notFound.body')}</Notice>
      <Link href="/">{t('notFound.back')}</Link>
    </View>
  );
}
