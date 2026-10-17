import { Icon, Row } from '@expo/ui';
import { Stage } from './controls';

const star = require('./star.xml');
export function Icons() {
  return (
    <Stage>
      <Row spacing={20}>
        <Icon name={star} size={24} color="#ba8434" />
        <Icon name={star} size={36} color="#246b4d" />
        <Icon name={star} size={48} color="#ad4b2c" />
      </Row>
    </Stage>
  );
}
