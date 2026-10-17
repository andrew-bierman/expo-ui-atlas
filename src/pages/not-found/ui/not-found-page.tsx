import { Link } from 'expo-router';
import { View } from 'react-native';
import { Notice } from '../../../shared/ui';
export default function NotFound() {
  return (
    <View style={{ padding: 24, gap: 20 }}>
      <Notice title="Uncharted territory">This page does not exist.</Notice>
      <Link href="/">Return to the atlas →</Link>
    </View>
  );
}
