import type { TuningControl } from '../model/tuning';
export const environmentControls: TuningControl[] = [
  {
    id: 'appearance',
    label: 'Appearance',
    type: 'select',
    options: ['system', 'light', 'dark'],
    defaultValue: 'system',
  },
  {
    id: 'accent',
    label: 'Native tint / Material seed',
    type: 'select',
    options: ['#246b4d', '#6552a3', '#ad4b2c', '#006fbb', '#a12670'],
    defaultValue: '#246b4d',
  },
  {
    id: 'direction',
    label: 'Layout direction',
    type: 'select',
    options: ['leftToRight', 'rightToLeft'],
    defaultValue: 'leftToRight',
  },
  {
    id: 'previewWidth',
    label: 'Preview width (%)',
    type: 'range',
    min: 55,
    max: 100,
    step: 5,
    defaultValue: 100,
  },
  {
    id: 'previewPadding',
    label: 'Preview inset',
    type: 'range',
    min: 0,
    max: 32,
    step: 2,
    defaultValue: 16,
  },
];
