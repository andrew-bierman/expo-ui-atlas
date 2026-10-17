import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { MessageKey } from '../../../shared/config';
import { ControlId, ControlType } from './control-identifiers';
export type TuningValue = string | number | boolean;
export type TuningValues = Partial<Record<ControlId, TuningValue>>;
interface BaseControl {
  id: ControlId;
  label: string;
  labelKey?: MessageKey;
  description?: string;
  /** Related props needed to make this variation visible in the gallery. */
  previewValues?: TuningValues;
}
export type TuningControl =
  | (BaseControl & {
      type: ControlType.Select;
      options: string[];
      defaultValue: string;
    })
  | (BaseControl & { type: ControlType.Toggle; defaultValue: boolean })
  | (BaseControl & {
      type: ControlType.Range;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      nativeDefault?: true;
    })
  | (BaseControl & { type: ControlType.Text; defaultValue: string });
const TuningContext = createContext<{
  values: TuningValues;
  onChange?: (id: ControlId, value: TuningValue) => void;
}>({ values: {} });
export function TuningProvider({
  values,
  onChange,
  children,
}: PropsWithChildren<{
  values: TuningValues;
  onChange?: (id: ControlId, value: TuningValue) => void;
}>) {
  const context = useMemo(() => ({ values, onChange }), [values, onChange]);
  return <TuningContext value={context}>{children}</TuningContext>;
}
/** Returns an explicit override without supplying a custom native default. */
export function useTuningValue(id: ControlId): TuningValue | undefined {
  return useContext(TuningContext).values[id];
}
export function useKnob<T extends TuningValue>(id: ControlId, fallback: T): T {
  const { values } = useContext(TuningContext);
  const value = values[id];
  return typeof value === typeof fallback ? (value as T) : fallback;
}
export function useTunedState<T extends TuningValue>(
  id: ControlId,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [local, setLocal] = useState(initial);
  const value = useKnob(id, local);
  const { onChange } = useContext(TuningContext);
  const setValue: Dispatch<SetStateAction<T>> = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next;
    setLocal(resolved);
    onChange?.(id, resolved);
  };
  return [value, setValue];
}
