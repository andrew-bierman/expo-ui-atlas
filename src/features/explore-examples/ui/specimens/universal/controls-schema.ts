import { CatalogEntryId } from '../../../../../entities/catalog-entry';
import { range, select, text, toggle } from '../../../model/control-builders';
import { ControlId } from '../../../model/control-identifiers';
import type { TuningControl } from '../../../model/tuning';
export const universalControls = {
  'u-button': [
    select(ControlId.Variant, 'Button variant', ['filled', 'outlined', 'text']),
    text(ControlId.Label, 'Action label', 'Add a point'),
    toggle(ControlId.Enabled, 'Enabled', true),
    range(ControlId.Radius, 'Corner radius', {
      min: 0,
      max: 32,
      step: 2,
      defaultValue: 12,
    }),
    range(ControlId.Padding, 'Padding', {
      min: 0,
      max: 28,
      step: 2,
      defaultValue: 12,
    }),
    range(ControlId.Opacity, 'Opacity', {
      min: 0.2,
      max: 1,
      step: 0.1,
      defaultValue: 1,
    }),
  ],
  'u-slider': [
    {
      ...range(ControlId.Value, 'Current value', {
        min: 0,
        max: 200,
        step: 1,
        defaultValue: 35,
      }),
      previewValues: { [ControlId.Maximum]: 200 },
    },
    range(ControlId.Maximum, 'Maximum', {
      min: 10,
      max: 200,
      step: 10,
      defaultValue: 100,
    }),
    range(ControlId.Step, 'Step increment', {
      min: 1,
      max: 25,
      step: 1,
      defaultValue: 5,
    }),
    toggle(ControlId.Enabled, 'Enabled', true),
  ],
  'u-toggles': [
    toggle(ControlId.Notifications, 'Notifications', true),
    toggle(ControlId.Digest, 'Digest', false),
    toggle(ControlId.Enabled, 'Enabled', true),
    text(ControlId.Label, 'Switch label', 'Enable notifications'),
  ],
  'u-picker': [
    select(ControlId.AppearanceMode, 'Picker appearance', ['menu', 'wheel']),
    select(ControlId.Palette, 'Selected item', ['forest', 'ocean', 'sunset']),
    toggle(ControlId.Enabled, 'Enabled', true),
  ],
  'u-input': [
    toggle(ControlId.Editable, 'Editable', true),
    toggle(ControlId.Multiline, 'Multiline', false),
    toggle(ControlId.Secure, 'Secure entry', false),
    {
      ...range(ControlId.Lines, 'Visible lines', {
        min: 1,
        max: 6,
        step: 1,
        defaultValue: 3,
      }),
      previewValues: { [ControlId.Multiline]: true },
    },
    range(ControlId.MaxLength, 'Character limit', {
      min: 10,
      max: 120,
      step: 5,
      defaultValue: 60,
    }),
    range(ControlId.FontSize, 'Text size', {
      min: 12,
      max: 28,
      step: 1,
      defaultValue: 16,
    }),
    select(ControlId.Keyboard, 'Keyboard', [
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      'url',
      'decimal-pad',
    ]),
    select(
      ControlId.Capitalize,
      'Capitalization',
      ['none', 'sentences', 'words', 'characters'],
      'sentences',
    ),
  ],
  'u-text': [
    text(ControlId.Text, 'Text content', 'The great outdoors'),
    range(ControlId.FontSize, 'Font size', {
      min: 10,
      max: 48,
      step: 1,
      defaultValue: 28,
    }),
    select(
      ControlId.Weight,
      'Font weight',
      ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      '700',
    ),
    select(ControlId.FontFamily, 'Font family', [
      'system',
      'serif',
      'monospace',
    ]),
    range(ControlId.Tracking, 'Letter spacing', {
      min: -2,
      max: 8,
      step: 0.5,
      defaultValue: 0,
    }),
    range(ControlId.LineLimit, 'Line limit', {
      min: 1,
      max: 6,
      step: 1,
      defaultValue: 1,
    }),
  ],
  'u-icon': [
    range(ControlId.IconSize, 'Symbol size', {
      min: 12,
      max: 80,
      step: 2,
      defaultValue: 36,
    }),
    select(ControlId.IconColor, 'Symbol color', [
      '#246b4d',
      '#ad4b2c',
      '#6552a3',
      '#ba8434',
    ]),
    select(ControlId.Symbol, 'SF Symbol (iOS)', [
      'star.fill',
      'heart.fill',
      'leaf.fill',
      'wifi',
    ]),
  ],
  'u-layout': [
    range(ControlId.Spacing, 'Spacing', {
      min: 0,
      max: 40,
      step: 2,
      defaultValue: 8,
    }),
    select(
      ControlId.Alignment,
      'Cross-axis alignment',
      ['start', 'center', 'end'],
      'center',
    ),
    range(ControlId.RowWidth, 'Row width', {
      min: 160,
      max: 320,
      step: 10,
      defaultValue: 250,
    }),
    range(ControlId.CellPadding, 'Cell padding', {
      min: 4,
      max: 24,
      step: 2,
      defaultValue: 12,
    }),
  ],
  'u-collapsible': [
    toggle(ControlId.Expanded, 'Expanded', false),
    text(ControlId.Label, 'Header label', 'What’s inside the pack?'),
    range(ControlId.FontSize, 'Header size', {
      min: 12,
      max: 24,
      step: 1,
      defaultValue: 16,
    }),
  ],
  'u-fields': [
    range(ControlId.Height, 'Form height', {
      min: 220,
      max: 500,
      step: 20,
      defaultValue: 320,
    }),
    toggle(ControlId.Uppercase, 'Uppercase section title (Android)', false),
    toggle(ControlId.ShowFooter, 'Show section footer', true),
  ],
  'u-list': [
    range(ControlId.Rows, 'Row count', {
      min: 3,
      max: 12,
      step: 1,
      defaultValue: 3,
    }),
    range(ControlId.Height, 'List height', {
      min: 160,
      max: 500,
      step: 20,
      defaultValue: 260,
    }),
    toggle(ControlId.Leading, 'Leading slot', true),
    toggle(ControlId.Trailing, 'Trailing slot', true),
    toggle(ControlId.Supporting, 'Supporting text', true),
  ],
  'u-scroll': [
    select(ControlId.ScrollDirection, 'Scroll axis', [
      'horizontal',
      'vertical',
    ]),
    toggle(ControlId.Indicators, 'Show scroll indicators', true),
    range(ControlId.Cards, 'Card count', {
      min: 3,
      max: 12,
      step: 1,
      defaultValue: 5,
    }),
    range(ControlId.CardWidth, 'Card width', {
      min: 100,
      max: 240,
      step: 10,
      defaultValue: 150,
    }),
    range(ControlId.CardHeight, 'Card height', {
      min: 80,
      max: 220,
      step: 10,
      defaultValue: 150,
    }),
  ],
  'u-interop': [
    range(ControlId.BridgePadding, 'React Native card padding', {
      min: 0,
      max: 40,
      step: 2,
      defaultValue: 18,
    }),
    range(ControlId.BridgeRadius, 'React Native card radius', {
      min: 0,
      max: 32,
      step: 2,
      defaultValue: 16,
    }),
  ],
  'u-sheet': [
    select(ControlId.SnapMode, 'Snap points', [
      'half + full',
      'full',
      'fraction 0.3',
      'height 320',
      'automatic',
    ]),
    toggle(ControlId.DragIndicator, 'Drag indicator', true),
    range(ControlId.ContentPadding, 'Sheet content padding', {
      min: 0,
      max: 40,
      step: 2,
      defaultValue: 24,
    }),
    select(ControlId.SheetBackground, 'Sheet background', [
      'system',
      '#e5efdf',
      '#eee8f8',
      '#17211c',
    ]),
  ],
} satisfies Partial<Record<CatalogEntryId, TuningControl[]>>;
