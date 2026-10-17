import type { TuningControl } from '../../../../model/tuning';

const toggle = (
  id: string,
  label: string,
  defaultValue = true,
): TuningControl => ({ id, label, type: 'toggle', defaultValue });
const range = (
  id: string,
  label: string,
  min: number,
  max: number,
  defaultValue: number,
  step = 1,
): TuningControl => ({
  id,
  label,
  type: 'range',
  min,
  max,
  step,
  defaultValue,
});
const select = (
  id: string,
  label: string,
  options: string[],
  defaultValue = options[0],
): TuningControl => ({ id, label, type: 'select', options, defaultValue });
const text = (
  id: string,
  label: string,
  defaultValue: string,
): TuningControl => ({ id, label, type: 'text', defaultValue });
const enabled = toggle('enabled', 'Enabled');
const custom = toggle('customColor', 'Override native colors', false);
const spacing = range('spacing', 'Spacing (dp)', 0, 32, 8);
const padding = range('padding', 'Content padding (dp)', 0, 32, 0);
export const composeControls: Record<string, TuningControl[]> = {
  'compose-buttons': [
    enabled,
    text('label', 'Button label', 'Explore'),
    range('padding', 'Internal padding (dp)', 4, 32, 16),
    range('radius', 'Corner radius (dp)', 0, 32, 24),
    custom,
  ],
  'compose-icon-buttons': [
    enabled,
    range('size', 'Native button size (dp)', 32, 72, 48, 4),
    custom,
  ],
  'compose-floating-actions': [
    toggle('expanded', 'Expanded extended FAB'),
    custom,
  ],
  'compose-selection': [enabled, custom, toggle('thumb', 'Switch thumb icon')],
  'compose-segments': [enabled, custom],
  'compose-chips': [
    enabled,
    range('elevation', 'Chip elevation (dp)', 0, 12, 0),
    range('border', 'Chip border width (dp)', 0, 4, 1),
  ],
  'compose-sliders': [
    enabled,
    range('steps', 'Discrete interior steps', 0, 12, 4),
    range('maximum', 'Maximum value', 1, 10, 1),
    toggle('reverse', 'Reverse vertical direction'),
    toggle('limited', 'Constrain drag to middle 60%', false),
  ],
  'compose-fields': [
    enabled,
    toggle('readOnly', 'Read only', false),
    toggle('singleLine', 'Single line'),
    {
      ...range('lines', 'Multiline line count', 1, 5, 3),
      previewValues: { singleLine: false },
    },
    toggle('error', 'Error state', false),
    toggle('password', 'Password transformation', false),
    select('keyboard', 'Keyboard type', [
      'text',
      'number',
      'email',
      'phone',
      'uri',
    ]),
  ],
  'compose-progress': [
    toggle('determinate', 'Determinate progress'),
    range('strokeWidth', 'Circular stroke width (dp)', 1, 12, 4),
    range('gap', 'Track gap (dp)', 0, 12, 4),
    select('cap', 'Stroke cap', ['round', 'butt', 'square']),
    range('amplitude', 'Wave amplitude', 0, 1, 1, 0.1),
    range('wavelength', 'Wavelength (dp)', 8, 64, 24, 4),
    range('speed', 'Wave speed (dp/s)', 0, 96, 24, 4),
  ],
  'compose-content': [
    text('text', 'Headline text', 'Material typography'),
    range('fontSize', 'Headline font size', 12, 42, 24),
    select('family', 'Font family', ['serif', 'sans-serif', 'monospace']),
    toggle('italic', 'Italic'),
    range('elevation', 'Card elevation (dp)', 0, 24, 6),
  ],
  'compose-artwork': [
    range('size', 'Image / icon size (dp)', 32, 120, 64, 4),
    select('scale', 'Image content scale', [
      'fit',
      'crop',
      'fillBounds',
      'inside',
      'none',
      'fillWidth',
      'fillHeight',
    ]),
    range('vertices', 'Polygon / star vertices', 3, 12, 6),
    range('rounding', 'Shape corner rounding', 0, 0.5, 0, 0.05),
    range('smoothing', 'Shape smoothing', 0, 1, 0, 0.1),
    range('inner', 'Star inner radius', 0.1, 1, 0.5, 0.1),
    text('badge', 'Badge label', '8'),
  ],
  'compose-layout': [
    spacing,
    select('alignment', 'Box content alignment', [
      'center',
      'topStart',
      'bottomEnd',
    ]),
    range('height', 'Box height (dp)', 40, 120, 80),
  ],
  'compose-modifiers': [
    range('padding', 'Padding (dp)', 0, 32, 24),
    range('radius', 'Clip radius (dp)', 0, 40, 16),
    range('border', 'Border width (dp)', 0, 6, 1),
    range('rotation', 'Rotation (degrees)', -30, 30, 6),
    range('alpha', 'Opacity multiplier', 0.1, 1, 1, 0.1),
  ],
  'compose-dialogs': [
    toggle('outside', 'Dismiss on outside tap'),
    toggle('back', 'Dismiss on Android back'),
    toggle('handle', 'Show sheet handle'),
    toggle('gestures', 'Enable sheet gestures'),
    toggle('skipPartial', 'Skip partially expanded sheet', false),
  ],
  'compose-menus': [enabled],
  'compose-search': [
    text('placeholder', 'Search placeholder', 'Search the catalog'),
  ],
  'compose-navigation': [
    enabled,
    toggle('labels', 'Always show destination labels'),
    select('variant', 'Floating toolbar variant', ['vibrant', 'standard']),
    range('elevation', 'Navigation tonal elevation (dp)', 0, 16, 3),
  ],
  'compose-pager': [
    range('spacing', 'Page spacing (dp)', 0, 32, 12),
    padding,
    toggle('scroll', 'Allow swipe'),
    toggle('reverse', 'Reverse layout', false),
  ],
  'compose-carousels': [
    spacing,
    padding,
    range('width', 'Preferred / fixed item width (dp)', 100, 300, 200, 10),
    toggle('scroll', 'Allow swipe'),
  ],
  'compose-lists': [
    range('spacing', 'Row spacing (dp)', 0, 24, 0),
    padding,
    range('rows', 'Row count', 4, 40, 12),
  ],
  'compose-feedback': [
    toggle('rich', 'Rich tooltip', false),
    toggle('persistent', 'Persistent tooltip', false),
    select('duration', 'Snackbar duration', ['short', 'long', 'indefinite']),
    toggle('dismiss', 'Show dismiss action'),
    text('message', 'Snackbar message', 'Item archived'),
    text('action', 'Snackbar action label', 'Undo'),
  ],
  'compose-inline-dates': [
    toggle('title', 'Show title'),
    toggle('headline', 'Show selection headline'),
    toggle('variantToggle', 'Show calendar / text mode toggle'),
  ],
  'compose-dates': [toggle('is24Hour', '24-hour clock')],
  'compose-recycling': [
    range('estimate', 'Estimated item height (dp)', 48, 120, 72, 4),
  ],
};
export const composeDescriptions: Record<string, [string, string]> = {
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
};
