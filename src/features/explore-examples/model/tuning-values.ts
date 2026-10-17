import { ControlType } from './control-identifiers';
import type { TuningControl, TuningValue, TuningValues } from './tuning';

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
export function defaultTuning(controls: TuningControl[]): TuningValues {
  return Object.fromEntries<TuningValue>(
    controls.map((c) => [c.id, c.defaultValue]),
  );
}
export function updateTuning(
  controls: TuningControl[],
  values: TuningValues,
  id: string,
  value: TuningValue,
): TuningValues {
  const control = controls.find((c) => c.id === id);
  if (!control) return values;
  if (
    control.type === ControlType.Select &&
    (typeof value !== 'string' || !control.options.includes(value))
  )
    return values;
  if (control.type === ControlType.Text && typeof value !== 'string')
    return values;
  if (control.type === ControlType.Toggle && typeof value !== 'boolean')
    return values;
  if (control.type === ControlType.Range) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return values;
    value = Math.min(
      control.max,
      Math.max(
        control.min,
        control.min +
          Math.round((value - control.min) / control.step) * control.step,
      ),
    );
  }
  return { ...values, [control.id]: value };
}
export function parseTuning(
  controls: TuningControl[],
  text: string,
): { values: TuningValues } | { error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { error: 'Enter valid JSON.' };
  }
  if (!isObjectRecord(parsed))
    return { error: 'Use a JSON object of control values.' };
  let values = defaultTuning(controls);
  const byId = new Map<string, TuningControl>(
    controls.map((control) => [control.id, control]),
  );
  for (const [id, value] of Object.entries<unknown>(parsed)) {
    const control = byId.get(id);
    if (!control) return { error: `Unknown control: ${id}` };
    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    )
      return { error: `Unsupported value for ${id}` };
    const next = updateTuning(controls, values, id, value);
    if (next === values) return { error: `Invalid value for ${id}` };
    values = next;
  }
  return { values };
}
