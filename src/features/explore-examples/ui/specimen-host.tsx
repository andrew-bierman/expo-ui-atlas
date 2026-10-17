import { Host, type UniversalHostProps } from '@expo/ui';
import { ControlId } from '../model/control-identifiers';
import {
  nativeDefault,
  resolveHostEnvironment,
} from '../model/host-environment';
import { useKnob } from '../model/tuning';

export function SpecimenHost(props: UniversalHostProps) {
  const appearance = useKnob<string>(ControlId.Appearance, nativeDefault);
  const accent = useKnob<string>(ControlId.Accent, nativeDefault);
  const direction = useKnob<string>(ControlId.Direction, nativeDefault);
  const overrides = resolveHostEnvironment(appearance, accent, direction);
  return (
    <Host
      {...props}
      colorScheme={overrides.colorScheme ?? props.colorScheme}
      seedColor={overrides.seedColor ?? props.seedColor}
      layoutDirection={overrides.layoutDirection ?? props.layoutDirection}
    />
  );
}
