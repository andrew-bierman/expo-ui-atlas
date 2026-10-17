import { expect, test } from 'bun:test';
import { select } from './control-builders';
import { ControlId, ControlType } from './control-identifiers';
import type { ExampleRegistry } from './types';

test('select builders retain declared choices and a valid default', () => {
  expect(
    select(ControlId.Variant, 'Button', ['filled', 'outlined'], 'outlined'),
  ).toEqual({
    id: ControlId.Variant,
    label: 'Button',
    type: ControlType.Select,
    options: ['filled', 'outlined'],
    defaultValue: 'outlined',
  });
});

// These cases are checked by tsc and must never execute.
if (false) {
  // @ts-expect-error A selection cannot be empty.
  select(ControlId.Variant, 'Invalid', []);
  // @ts-expect-error The default must belong to the declared options.
  select(ControlId.Variant, 'Invalid', ['filled', 'outlined'], 'missing');
  // @ts-expect-error Schema keys must use registered control identifiers.
  select('misspelled-control', 'Invalid', ['filled']);
  // @ts-expect-error Registries cannot introduce unknown catalog collections.
  const invalidRegistry: ExampleRegistry = { 'unknown-collection': [] };
  void invalidRegistry;
}
