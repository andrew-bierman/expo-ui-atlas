import type { ComponentType } from 'react';
import type { TuningControl } from './tuning';

export interface Example {
  id: string;
  title: string;
  description: string;
  component: ComponentType;
  code?: string;
  controls?: TuningControl[];
}
export type ExampleRegistry = Record<string, Example[]>;
