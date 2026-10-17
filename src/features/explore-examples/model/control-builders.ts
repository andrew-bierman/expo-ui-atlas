import { ControlId, ControlType } from './control-identifiers';
import type { TuningControl } from './tuning';

export function select<const Options extends readonly [string, ...string[]]>(
  id: ControlId,
  label: string,
  options: Options,
  defaultValue: NoInfer<Options[number]> = options[0],
): TuningControl {
  return {
    id,
    label,
    type: ControlType.Select,
    options: [...options],
    defaultValue,
  };
}
interface RangeOptions {
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
}
export function range(
  id: ControlId,
  label: string,
  { min, max, step = 1, defaultValue }: RangeOptions,
): TuningControl {
  return { id, label, type: ControlType.Range, min, max, step, defaultValue };
}
export function toggle(
  id: ControlId,
  label: string,
  defaultValue: boolean,
): TuningControl {
  return { id, label, type: ControlType.Toggle, defaultValue };
}
export function text(
  id: ControlId,
  label: string,
  defaultValue: string,
): TuningControl {
  return { id, label, type: ControlType.Text, defaultValue };
}
