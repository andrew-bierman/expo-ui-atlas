import { ControlId, ControlType } from './control-identifiers';
import type { TuningControl, TuningValue, TuningValues } from './tuning';

export interface Variant {
  id: string;
  controlId: ControlId;
  group: string;
  title: string;
  description: string;
  values: TuningValues;
}

/** Enumerate finite cases; continuous values get representative samples, not a Cartesian product. */
export function buildVariants(controls: TuningControl[]): Variant[] {
  return controls.flatMap((control): Variant[] => {
    if (control.type === ControlType.Text) return [];
    const values: TuningValue[] =
      control.type === ControlType.Select
        ? control.options
        : control.type === ControlType.Toggle
          ? [true, false]
          : [...new Set([control.min, control.defaultValue, control.max])];
    return values.map((value, index) => ({
      id: `${control.id}:${index}`,
      controlId: control.id,
      group: control.label,
      title: `${control.label} · ${typeof value === 'boolean' ? (value ? 'On' : 'Off') : value}`,
      description:
        control.type === ControlType.Range
          ? `${value === control.defaultValue ? 'Default' : value === control.min ? 'Minimum' : 'Maximum'} sample. Related settings are enabled where needed; other settings start at their defaults.`
          : `Starts with ${control.id} = ${String(value)}. Related settings are enabled where needed; interact with the example to compare behavior.`,
      values: { ...control.previewValues, [control.id]: value },
    }));
  });
}
