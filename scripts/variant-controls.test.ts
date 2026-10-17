import { expect, test } from 'bun:test';
import { environmentControls } from '../src/features/explore-examples/config/environment';
import { ControlType } from '../src/features/explore-examples/model/control-identifiers';
import {
  defaultTuning,
  parseTuning,
} from '../src/features/explore-examples/model/tuning-values';
import { composeControls } from '../src/features/explore-examples/ui/specimens/native/compose/controls-schema';
import { swiftuiControls } from '../src/features/explore-examples/ui/specimens/native/swiftui/controls-schema';
import { universalControls } from '../src/features/explore-examples/ui/specimens/universal/controls-schema';

test('every inspector schema has unique keys, valid defaults and round-trippable configuration', () => {
  for (const controls of [
    ...Object.values(universalControls),
    ...Object.values(swiftuiControls),
    ...Object.values(composeControls),
  ]) {
    const all = [...controls, ...environmentControls];
    expect(new Set(all.map((c) => c.id)).size).toBe(all.length);
    for (const control of all) {
      expect(control.label.length).toBeGreaterThan(0);
      if (control.previewValues)
        expect(
          'values' in parseTuning(all, JSON.stringify(control.previewValues)),
        ).toBe(true);
      if (control.type === ControlType.Select) {
        expect(new Set(control.options).size).toBe(control.options.length);
        expect(control.options).toContain(control.defaultValue);
      }
      if (control.type === ControlType.Range) {
        expect(control.step).toBeGreaterThan(0);
        expect(control.max).toBeGreaterThan(control.min);
        expect(control.defaultValue).toBeGreaterThanOrEqual(control.min);
        expect(control.defaultValue).toBeLessThanOrEqual(control.max);
      }
    }
    const defaults = defaultTuning(all);
    expect(parseTuning(all, JSON.stringify(defaults))).toEqual({
      values: defaults,
    });
  }
});

test('unchanged configuration preserves omitted native style defaults', () => {
  for (const [id, optional] of [
    ['u-button', ['radius', 'padding', 'opacity']],
    ['u-input', ['fontSize']],
  ] as const) {
    const controls = [...universalControls[id], ...environmentControls];
    const defaults = defaultTuning(controls);
    for (const key of optional) expect(defaults).not.toHaveProperty(key);
    const result = parseTuning(controls, JSON.stringify(defaults));
    expect(result).toEqual({ values: defaults });
    expect(parseTuning(controls, '{}')).toEqual({ values: defaults });
    for (const control of controls) {
      if (control.type !== ControlType.Range || !control.nativeDefault)
        continue;
      const result = parseTuning(
        controls,
        JSON.stringify({ [control.id]: control.max }),
      );
      expect(result).toHaveProperty(`values.${control.id}`, control.max);
    }
  }
});
