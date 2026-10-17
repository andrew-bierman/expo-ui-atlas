import { Icon, Row } from '@expo/ui';
import { useKnob } from '../../../model/tuning';
import { Stage } from './controls';
export function Icons() {
  const size = useKnob('iconSize', 36);
  const color = useKnob('iconColor', '#246b4d');
  const symbol = useKnob<'star.fill' | 'heart.fill' | 'leaf.fill' | 'wifi'>(
    'symbol',
    'star.fill',
  );
  return (
    <Stage>
      <Row spacing={20}>
        <Icon name={symbol} size={size} color={color} />
        <Icon name="leaf.fill" size={36} color="#246b4d" />
        <Icon name="heart.fill" size={48} color="#ad4b2c" />
      </Row>
    </Stage>
  );
}
