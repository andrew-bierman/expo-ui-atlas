import type { TuningControl, TuningValue, TuningValues } from './tuning';

export function defaultTuning(controls: TuningControl[]): TuningValues {
  return Object.fromEntries(controls.map((c) => [c.id, c.defaultValue]));
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
    control.type === 'select' &&
    (typeof value !== 'string' || !control.options.includes(value))
  )
    return values;
  if (control.type === 'text' && typeof value !== 'string') return values;
  if (control.type === 'toggle' && typeof value !== 'boolean') return values;
  if (control.type === 'range') {
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
  return { ...values, [id]: value };
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
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
    return { error: 'Use a JSON object of control values.' };
  let values = defaultTuning(controls);
  const byId = new Map(controls.map((control) => [control.id, control]));
  for (const [id, value] of Object.entries(parsed)) {
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
