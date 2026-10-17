import { Icon, Row } from '@expo/ui';
import { ControlId } from '../../../model/control-identifiers';
import { useKnob } from '../../../model/tuning';
import { Stage } from './controls';
export function Icons() {
  const size = useKnob(ControlId.IconSize, 36);
  const color = useKnob(ControlId.IconColor, '#246b4d');
  const symbol = useKnob<'star.fill' | 'heart.fill' | 'leaf.fill' | 'wifi'>(
    ControlId.Symbol,
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
