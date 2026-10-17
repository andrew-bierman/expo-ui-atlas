import { Host, type UniversalHostProps } from '@expo/ui';
import { useKnob } from '../model/tuning';
export function SpecimenHost(props: UniversalHostProps) {
  const appearance = useKnob<'system' | 'light' | 'dark'>(
    'appearance',
    'system',
  );
  const accent = useKnob('accent', '#246b4d');
  const direction = useKnob<'leftToRight' | 'rightToLeft'>(
    'direction',
    'leftToRight',
  );
  return (
    <Host
      {...props}
      colorScheme={appearance === 'system' ? props.colorScheme : appearance}
      seedColor={props.seedColor ?? accent}
      layoutDirection={direction}
    />
  );
}
