import type { TuningControl } from '../../../model/tuning';

const select = (
  id: string,
  label: string,
  options: string[],
  defaultValue = options[0],
): TuningControl => ({ id, label, options, defaultValue, type: 'select' });
const range = (
  id: string,
  label: string,
  min: number,
  max: number,
  step: number,
  defaultValue: number,
): TuningControl => ({
  id,
  label,
  min,
  max,
  step,
  defaultValue,
  type: 'range',
});
const toggle = (
  id: string,
  label: string,
  defaultValue = true,
): TuningControl => ({ id, label, defaultValue, type: 'toggle' });
const text = (
  id: string,
  label: string,
  defaultValue: string,
): TuningControl => ({ id, label, defaultValue, type: 'text' });
export const universalControls: Record<string, TuningControl[]> = {
  'u-button': [
    select('variant', 'Button variant', ['filled', 'outlined', 'text']),
    text('label', 'Action label', 'Add a point'),
    toggle('enabled', 'Enabled'),
    range('radius', 'Corner radius', 0, 32, 2, 12),
    range('padding', 'Padding', 0, 28, 2, 12),
    range('opacity', 'Opacity', 0.2, 1, 0.1, 1),
  ],
  'u-slider': [
    range('value', 'Current value', 0, 200, 1, 35),
    range('maximum', 'Maximum', 10, 200, 10, 100),
    range('step', 'Step increment', 1, 25, 1, 5),
    toggle('enabled', 'Enabled'),
  ],
  'u-toggles': [
    toggle('notifications', 'Notifications'),
    toggle('digest', 'Digest', false),
    toggle('enabled', 'Enabled'),
    text('label', 'Switch label', 'Enable notifications'),
  ],
  'u-picker': [
    select('appearanceMode', 'Picker appearance', ['menu', 'wheel']),
    select('palette', 'Selected item', ['forest', 'ocean', 'sunset']),
    toggle('enabled', 'Enabled'),
  ],
  'u-input': [
    toggle('editable', 'Editable'),
    toggle('multiline', 'Multiline', false),
    toggle('secure', 'Secure entry', false),
    range('lines', 'Visible lines', 1, 6, 1, 3),
    range('maxLength', 'Character limit', 10, 120, 5, 60),
    range('fontSize', 'Text size', 12, 28, 1, 16),
    select('keyboard', 'Keyboard', [
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      'url',
      'decimal-pad',
    ]),
    select(
      'capitalize',
      'Capitalization',
      ['none', 'sentences', 'words', 'characters'],
      'sentences',
    ),
  ],
  'u-text': [
    text('text', 'Text content', 'The great outdoors'),
    range('fontSize', 'Font size', 10, 48, 1, 28),
    select(
      'weight',
      'Font weight',
      ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      '700',
    ),
    select('fontFamily', 'Font family', ['system', 'serif', 'monospace']),
    range('tracking', 'Letter spacing', -2, 8, 0.5, 0),
    range('lineLimit', 'Line limit', 1, 6, 1, 1),
  ],
  'u-icon': [
    range('iconSize', 'Symbol size', 12, 80, 2, 36),
    select('iconColor', 'Symbol color', [
      '#246b4d',
      '#ad4b2c',
      '#6552a3',
      '#ba8434',
    ]),
    select('symbol', 'SF Symbol (iOS)', [
      'star.fill',
      'heart.fill',
      'leaf.fill',
      'wifi',
    ]),
  ],
  'u-layout': [
    range('spacing', 'Spacing', 0, 40, 2, 8),
    select(
      'alignment',
      'Cross-axis alignment',
      ['start', 'center', 'end'],
      'center',
    ),
    range('rowWidth', 'Row width', 160, 320, 10, 250),
    range('cellPadding', 'Cell padding', 4, 24, 2, 12),
  ],
  'u-collapsible': [
    toggle('expanded', 'Expanded', false),
    text('label', 'Header label', 'What’s inside the pack?'),
    range('fontSize', 'Header size', 12, 24, 1, 16),
  ],
  'u-fields': [
    range('height', 'Form height', 220, 500, 20, 320),
    toggle('uppercase', 'Uppercase section title (Android)', false),
    toggle('showFooter', 'Show section footer'),
  ],
  'u-list': [
    range('rows', 'Row count', 3, 12, 1, 3),
    range('height', 'List height', 160, 500, 20, 260),
    toggle('leading', 'Leading slot'),
    toggle('trailing', 'Trailing slot'),
    toggle('supporting', 'Supporting text'),
  ],
  'u-scroll': [
    select('scrollDirection', 'Scroll axis', ['horizontal', 'vertical']),
    toggle('indicators', 'Show scroll indicators'),
    range('cards', 'Card count', 3, 12, 1, 5),
    range('cardWidth', 'Card width', 100, 240, 10, 150),
    range('cardHeight', 'Card height', 80, 220, 10, 150),
  ],
  'u-interop': [
    range('bridgePadding', 'React Native card padding', 0, 40, 2, 18),
    range('bridgeRadius', 'React Native card radius', 0, 32, 2, 16),
  ],
  'u-sheet': [
    select('snapMode', 'Snap points', [
      'half + full',
      'full',
      'fraction 0.3',
      'height 320',
      'automatic',
    ]),
    toggle('dragIndicator', 'Drag indicator'),
    range('contentPadding', 'Sheet content padding', 0, 40, 2, 24),
    select('sheetBackground', 'Sheet background', [
      'system',
      '#e5efdf',
      '#eee8f8',
      '#17211c',
    ]),
  ],
};
