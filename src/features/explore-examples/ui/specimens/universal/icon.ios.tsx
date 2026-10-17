import { Icon, Row } from '@expo/ui';
import { Stage } from './controls';
export function Icons() {
  return (
    <Stage>
      <Row spacing={20}>
        <Icon name="star.fill" size={24} color="#ba8434" />
        <Icon name="leaf.fill" size={36} color="#246b4d" />
        <Icon name="heart.fill" size={48} color="#ad4b2c" />
      </Row>
    </Stage>
  );
}
