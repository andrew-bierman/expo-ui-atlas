import { ControlId, ControlType } from '../model/control-identifiers';
import { nativeDefault } from '../model/host-environment';
import type { TuningControl } from '../model/tuning';
export const environmentControls: TuningControl[] = [
  {
    id: ControlId.Appearance,
    label: 'Appearance',
    type: ControlType.Select,
    options: [nativeDefault, 'light', 'dark'],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.Accent,
    label: 'Native tint / Material seed',
    type: ControlType.Select,
    options: [
      nativeDefault,
      '#246b4d',
      '#6552a3',
      '#ad4b2c',
      '#006fbb',
      '#a12670',
    ],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.Direction,
    label: 'Layout direction',
    type: ControlType.Select,
    options: [nativeDefault, 'leftToRight', 'rightToLeft'],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.PreviewWidth,
    label: 'Preview width (%)',
    type: ControlType.Range,
    min: 55,
    max: 100,
    step: 5,
    defaultValue: 100,
  },
  {
    id: ControlId.PreviewPadding,
    label: 'Preview inset',
    type: ControlType.Range,
    min: 0,
    max: 32,
    step: 2,
    defaultValue: 16,
  },
];
