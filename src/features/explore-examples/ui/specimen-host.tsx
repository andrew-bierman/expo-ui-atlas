import { Host, type UniversalHostProps } from '@expo/ui';
import { ControlId } from '../model/control-identifiers';
import { useKnob } from '../model/tuning';
export function SpecimenHost(
  props: UniversalHostProps & { preserveSeed?: boolean },
) {
  const { preserveSeed, ...hostProps } = props;
  const appearance = useKnob<'system' | 'light' | 'dark'>(
    ControlId.Appearance,
    'system',
  );
  const accent = useKnob(ControlId.Accent, '#246b4d');
  const direction = useKnob<'leftToRight' | 'rightToLeft'>(
    ControlId.Direction,
    'leftToRight',
  );
  return (
    <Host
      {...hostProps}
      colorScheme={appearance === 'system' ? props.colorScheme : appearance}
      seedColor={preserveSeed ? props.seedColor : accent}
      layoutDirection={direction}
    />
  );
}
