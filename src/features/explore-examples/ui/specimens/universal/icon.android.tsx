import { Icon, Row } from '@expo/ui';
import { useKnob } from '../../../model/tuning';
import { Stage } from './controls';

const star = require('./star.xml');
export function Icons() {
  const size = useKnob('iconSize', 36);
  const color = useKnob('iconColor', '#246b4d');
  return (
    <Stage>
      <Row spacing={20}>
        <Icon name={star} size={size} color={color} />
        <Icon name={star} size={36} color="#246b4d" />
        <Icon name={star} size={48} color="#ad4b2c" />
      </Row>
    </Stage>
  );
}
