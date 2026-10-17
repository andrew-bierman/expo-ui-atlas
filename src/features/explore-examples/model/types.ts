import type { ComponentType } from 'react';

export interface Example {
  id: string;
  title: string;
  description: string;
  component: ComponentType;
  code?: string;
}
export type ExampleRegistry = Record<string, Example[]>;
