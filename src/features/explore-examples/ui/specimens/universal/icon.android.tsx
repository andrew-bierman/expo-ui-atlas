import { Icon, Row } from '@expo/ui';
import { ControlId } from '../../../model/control-identifiers';
import { useKnob } from '../../../model/tuning';
import { Stage } from './controls';

const star = require('./star.xml');
export function Icons() {
  const size = useKnob(ControlId.IconSize, 36);
  const color = useKnob(ControlId.IconColor, '#246b4d');
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
