import { CatalogEntryId } from '../../../../../../entities/catalog-entry';
import {
  range,
  select,
  text,
  toggle,
} from '../../../../model/control-builders';
import { ControlId } from '../../../../model/control-identifiers';
import type { TuningControl } from '../../../../model/tuning';

const enabled = toggle(ControlId.Enabled, 'Enabled', true);
const custom = toggle(ControlId.CustomColor, 'Override native colors', false);
const spacing = range(ControlId.Spacing, 'Spacing (dp)', {
  min: 0,
  max: 32,
  step: 1,
  defaultValue: 8,
});
const padding = range(ControlId.Padding, 'Content padding (dp)', {
  min: 0,
  max: 32,
  step: 1,
  defaultValue: 0,
});
export const composeControls = {
  'compose-buttons': [
    enabled,
    text(ControlId.Label, 'Button label', 'Explore'),
    range(ControlId.Padding, 'Internal padding (dp)', {
      min: 4,
      max: 32,
      step: 1,
      defaultValue: 16,
    }),
    range(ControlId.Radius, 'Corner radius (dp)', {
      min: 0,
      max: 32,
      step: 1,
      defaultValue: 24,
    }),
    custom,
  ],
  'compose-icon-buttons': [
    enabled,
    range(ControlId.Size, 'Native button size (dp)', {
      min: 32,
      max: 72,
      step: 4,
      defaultValue: 48,
    }),
    custom,
  ],
  'compose-floating-actions': [
    toggle(ControlId.Expanded, 'Expanded extended FAB', true),
    custom,
  ],
  'compose-selection': [
    enabled,
    custom,
    toggle(ControlId.Thumb, 'Switch thumb icon', true),
  ],
  'compose-segments': [enabled, custom],
  'compose-chips': [
    enabled,
    range(ControlId.Elevation, 'Chip elevation (dp)', {
      min: 0,
      max: 12,
      step: 1,
      defaultValue: 0,
    }),
    range(ControlId.Border, 'Chip border width (dp)', {
      min: 0,
      max: 4,
      step: 1,
      defaultValue: 1,
    }),
  ],
  'compose-sliders': [
    enabled,
    range(ControlId.Steps, 'Discrete interior steps', {
      min: 0,
      max: 12,
      step: 1,
      defaultValue: 4,
    }),
    range(ControlId.Maximum, 'Maximum value', {
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 1,
    }),
    toggle(ControlId.Reverse, 'Reverse vertical direction', true),
    toggle(ControlId.Limited, 'Constrain drag to middle 60%', false),
  ],
  'compose-fields': [
    enabled,
    toggle(ControlId.ReadOnly, 'Read only', false),
    toggle(ControlId.SingleLine, 'Single line', true),
    {
      ...range(ControlId.Lines, 'Multiline line count', {
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
      }),
      previewValues: { [ControlId.SingleLine]: false },
    },
    toggle(ControlId.Error, 'Error state', false),
    toggle(ControlId.Password, 'Password transformation', false),
    select(ControlId.Keyboard, 'Keyboard type', [
      'text',
      'number',
      'email',
      'phone',
      'uri',
    ]),
  ],
  'compose-progress': [
    toggle(ControlId.Determinate, 'Determinate progress', true),
    range(ControlId.StrokeWidth, 'Circular stroke width (dp)', {
      min: 1,
      max: 12,
      step: 1,
      defaultValue: 4,
    }),
    range(ControlId.Gap, 'Track gap (dp)', {
      min: 0,
      max: 12,
      step: 1,
      defaultValue: 4,
    }),
    select(ControlId.Cap, 'Stroke cap', ['round', 'butt', 'square']),
    range(ControlId.Amplitude, 'Wave amplitude', {
      min: 0,
      max: 1,
      step: 0.1,
      defaultValue: 1,
    }),
    range(ControlId.Wavelength, 'Wavelength (dp)', {
      min: 8,
      max: 64,
      step: 4,
      defaultValue: 24,
    }),
    range(ControlId.Speed, 'Wave speed (dp/s)', {
      min: 0,
      max: 96,
      step: 4,
      defaultValue: 24,
    }),
  ],
  'compose-content': [
    text(ControlId.Text, 'Headline text', 'Material typography'),
    range(ControlId.FontSize, 'Headline font size', {
      min: 12,
      max: 42,
      step: 1,
      defaultValue: 24,
    }),
    select(ControlId.Family, 'Font family', [
      'serif',
      'sans-serif',
      'monospace',
    ]),
    toggle(ControlId.Italic, 'Italic', true),
    range(ControlId.Elevation, 'Card elevation (dp)', {
      min: 0,
      max: 24,
      step: 1,
      defaultValue: 6,
    }),
  ],
  'compose-artwork': [
    range(ControlId.Size, 'Image / icon size (dp)', {
      min: 32,
      max: 120,
      step: 4,
      defaultValue: 64,
    }),
    select(ControlId.Scale, 'Image content scale', [
      'fit',
      'crop',
      'fillBounds',
      'inside',
      'none',
      'fillWidth',
      'fillHeight',
    ]),
    range(ControlId.Vertices, 'Polygon / star vertices', {
      min: 3,
      max: 12,
      step: 1,
      defaultValue: 6,
    }),
    range(ControlId.Rounding, 'Shape corner rounding', {
      min: 0,
      max: 0.5,
      step: 0.05,
      defaultValue: 0,
    }),
    range(ControlId.Smoothing, 'Shape smoothing', {
      min: 0,
      max: 1,
      step: 0.1,
      defaultValue: 0,
    }),
    range(ControlId.Inner, 'Star inner radius', {
      min: 0.1,
      max: 1,
      step: 0.1,
      defaultValue: 0.5,
    }),
    text(ControlId.Badge, 'Badge label', '8'),
  ],
  'compose-layout': [
    spacing,
    select(ControlId.Alignment, 'Box content alignment', [
      'center',
      'topStart',
      'bottomEnd',
    ]),
    range(ControlId.Height, 'Box height (dp)', {
      min: 40,
      max: 120,
      step: 1,
      defaultValue: 80,
    }),
  ],
  'compose-modifiers': [
    range(ControlId.Padding, 'Padding (dp)', {
      min: 0,
      max: 32,
      step: 1,
      defaultValue: 24,
    }),
    range(ControlId.Radius, 'Clip radius (dp)', {
      min: 0,
      max: 40,
      step: 1,
      defaultValue: 16,
    }),
    range(ControlId.Border, 'Border width (dp)', {
      min: 0,
      max: 6,
      step: 1,
      defaultValue: 1,
    }),
    range(ControlId.Rotation, 'Rotation (degrees)', {
      min: -30,
      max: 30,
      step: 1,
      defaultValue: 6,
    }),
    range(ControlId.Alpha, 'Opacity multiplier', {
      min: 0.1,
      max: 1,
      step: 0.1,
      defaultValue: 1,
    }),
  ],
  'compose-dialogs': [
    toggle(ControlId.Outside, 'Dismiss on outside tap', true),
    toggle(ControlId.Back, 'Dismiss on Android back', true),
    toggle(ControlId.Handle, 'Show sheet handle', true),
    toggle(ControlId.Gestures, 'Enable sheet gestures', true),
    toggle(ControlId.SkipPartial, 'Skip partially expanded sheet', false),
  ],
  'compose-menus': [enabled],
  'compose-search': [
    text(ControlId.Placeholder, 'Search placeholder', 'Search the catalog'),
  ],
  'compose-navigation': [
    enabled,
    toggle(ControlId.Labels, 'Always show destination labels', true),
    select(ControlId.Variant, 'Floating toolbar variant', [
      'vibrant',
      'standard',
    ]),
    range(ControlId.Elevation, 'Navigation tonal elevation (dp)', {
      min: 0,
      max: 16,
      step: 1,
      defaultValue: 3,
    }),
  ],
  'compose-pager': [
    range(ControlId.Spacing, 'Page spacing (dp)', {
      min: 0,
      max: 32,
      step: 1,
      defaultValue: 12,
    }),
    padding,
    toggle(ControlId.Scroll, 'Allow swipe', true),
    toggle(ControlId.Reverse, 'Reverse layout', false),
  ],
  'compose-carousels': [
    spacing,
    padding,
    range(ControlId.Width, 'Preferred / fixed item width (dp)', {
      min: 100,
      max: 300,
      step: 10,
      defaultValue: 200,
    }),
    toggle(ControlId.Scroll, 'Allow swipe', true),
  ],
  'compose-lists': [
    range(ControlId.Spacing, 'Row spacing (dp)', {
      min: 0,
      max: 24,
      step: 1,
      defaultValue: 0,
    }),
    padding,
    range(ControlId.Rows, 'Row count', {
      min: 4,
      max: 40,
      step: 1,
      defaultValue: 12,
    }),
  ],
  'compose-feedback': [
    toggle(ControlId.Rich, 'Rich tooltip', false),
    toggle(ControlId.Persistent, 'Persistent tooltip', false),
    select(ControlId.Duration, 'Snackbar duration', [
      'short',
      'long',
      'indefinite',
    ]),
    toggle(ControlId.Dismiss, 'Show dismiss action', true),
    text(ControlId.Message, 'Snackbar message', 'Item archived'),
    text(ControlId.Action, 'Snackbar action label', 'Undo'),
  ],
  'compose-inline-dates': [
    toggle(ControlId.Title, 'Show title', true),
    toggle(ControlId.Headline, 'Show selection headline', true),
    toggle(ControlId.VariantToggle, 'Show calendar / text mode toggle', true),
  ],
  'compose-dates': [toggle(ControlId.Is24Hour, '24-hour clock', true)],
  'compose-recycling': [
    range(ControlId.Estimate, 'Estimated item height (dp)', {
      min: 48,
      max: 120,
      step: 4,
      defaultValue: 72,
    }),
  ],
} satisfies Partial<Record<CatalogEntryId, TuningControl[]>>;
export const composeDescriptions = {
  buttons: [
    'Five Material button styles',
    'Tap each style to compare feedback. Tune internal padding, shape, color, label, and disabled behavior together.',
  ],
  'icon-buttons': [
    'Four icon button styles',
    'Compare standard, filled, tonal, and outlined buttons at the same native size.',
  ],
  'floating-actions': [
    'Floating action family',
    'Compare small, regular, large, and extended actions; collapse the extended label independently.',
  ],
  selection: [
    'Selection and toggle states',
    'Try checkbox, tri-state, radio, switch, native-state switch, and all four toggle button styles.',
  ],
  segments: [
    'Single and multiple selection',
    'Change one time period or combine transport modes; compare disabled and colored segments.',
  ],
  chips: [
    'Four interactive chip roles',
    'Assist invokes an action, filter toggles selection, input removes a token, and suggestion restores it.',
  ],
  sliders: [
    'Continuous, stepped, and vertical sliders',
    'Drag each native slider. Adjust discrete steps, range, drag limits, enabled state, and direction.',
  ],
  fields: [
    'Filled, outlined, and basic text input',
    'Use the keyboard to compare input behavior; test password, error, multiline, and read-only states.',
  ],
  progress: [
    'Determinate and animated progress',
    'Drag progress while comparing linear, circular, wavy, and loading indicators; tune native wave motion and strokes.',
  ],
  content: [
    'Typography, cards, surfaces, and list slots',
    'Adjust real text properties and card elevation; tap the surface to test selection.',
  ],
  artwork: [
    'Native images, vectors, badges, and shapes',
    'Change content scaling in a non-square image frame, polygon geometry, icon size, and badge content.',
  ],
  layout: [
    'Native layout and visibility',
    'Toggle the animated panel, change its alignment and height, and inspect FlowRow spacing and an RN island.',
  ],
  modifiers: [
    'Modifier order and geometry',
    'Swap padding and background order; tune clipping, border, rotation, and opacity on native text.',
  ],
  palette: [
    'Material color roles',
    'Toggle light/dark and inspect primary, secondary, tertiary, container, error, and surface roles.',
  ],
  dialogs: [
    'Alerts, custom dialogs, and modal sheets',
    'Open each presentation and compare outside/back dismissal, sheet expansion, drag handle, and gestures.',
  ],
  menus: [
    'Anchored and exposed menus',
    'Choose density from either native dropdown, then compare disabled item behavior.',
  ],
  search: [
    'Full-screen and docked search',
    'Submit a full-screen query or filter live suggestions in the docked variant.',
  ],
  navigation: [
    'Destinations and floating toolbar',
    'Switch destinations and invoke toolbar actions; tune labels, elevation, and vibrant/standard toolbar styling.',
  ],
  pager: [
    'Swipe and programmatic paging',
    'Swipe four pages or use Next; compare spacing, padding, reverse layout, and disabled gestures.',
  ],
  carousels: [
    'Three Material carousel strategies',
    'Compare centered hero, multi-browse, and uncontained scrolling with matching width and spacing.',
  ],
  lists: [
    'Lazy lists and pull to refresh',
    'Pull down to refresh the native list; tune row count, content padding, and spacing.',
  ],
  feedback: [
    'Snackbar actions and tooltips',
    'Show a snackbar and inspect its result; long-press or tap the star for a tooltip.',
  ],
  dates: [
    'Date, range, and time dialogs',
    'Choose a date, date range, or time and compare 12/24-hour clocks.',
  ],
  'inline-dates': [
    'Inline date and range selection',
    'Switch between a calendar and a range picker, then select dates directly.',
  ],
  recycling: [
    'Native recycled list',
    'Scroll 500 keyed rows and adjust the estimated row height used by the recycling API.',
  ],
} as const satisfies Record<string, readonly [string, string]>;
