import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
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
const TuningContext = createContext<{
  values: TuningValues;
  onChange?: (id: string, value: TuningValue) => void;
}>({ values: {} });
export function TuningProvider({
  values,
  onChange,
  children,
}: PropsWithChildren<{
  values: TuningValues;
  onChange?: (id: string, value: TuningValue) => void;
}>) {
  const context = useMemo(() => ({ values, onChange }), [values, onChange]);
  return <TuningContext value={context}>{children}</TuningContext>;
}
export function useKnob<T extends TuningValue>(id: string, fallback: T): T {
  const { values } = useContext(TuningContext);
  const value = values[id];
  return typeof value === typeof fallback ? (value as T) : fallback;
}
export function useTunedState<T extends TuningValue>(
  id: string,
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
