import { createContext, type PropsWithChildren, useContext } from 'react';
export type TuningValue = string | number | boolean;
export type TuningValues = Record<string, TuningValue>;
interface BaseControl {
  id: string;
  label: string;
  description?: string;
}
export type TuningControl =
  | (BaseControl & { type: 'select'; options: string[]; defaultValue: string })
  | (BaseControl & { type: 'toggle'; defaultValue: boolean })
  | (BaseControl & {
      type: 'range';
      min: number;
      max: number;
      step: number;
      defaultValue: number;
    })
  | (BaseControl & { type: 'text'; defaultValue: string });
const TuningContext = createContext<TuningValues>({});
export function TuningProvider({
  values,
  children,
}: PropsWithChildren<{ values: TuningValues }>) {
  return <TuningContext value={values}>{children}</TuningContext>;
}
export function useKnob<T extends TuningValue>(id: string, fallback: T): T {
  const values = useContext(TuningContext);
  const value = values[id];
  return typeof value === typeof fallback ? (value as T) : fallback;
}
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
