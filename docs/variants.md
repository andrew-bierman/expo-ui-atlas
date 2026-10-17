# Interactive variant coverage

Generated with `bun scripts/variant-report.ts` from the inspector schemas. There are 277 component-specific controls, plus five shared preview controls on every specimen: appearance, accent seed, layout direction, width, and padding. Controls change real supported props/modifiers. Local interactions remain usable after inspector changes; Reset restores the specimen.

This matrix records exposed controls, not every Cartesian combination or every framework modifier. Fixed comparisons also demonstrate additional states and components within a collection. Specialized SwiftUI contexts (widgets, advanced worklet orchestration, ArrangementView) retain explicit availability notes. Compose Material colors uses the shared Host controls and its own light/dark action. Android vector assets stay bundled; arbitrary user assets are not accepted. SF Symbol selection is iOS-only; uppercase field headers are Android-only. OS-dependent styles can adapt or be unavailable on older systems. Fraction/fixed-height universal sheets map to nearest half/full on Android.

Use Customize for controls or edit/apply the JSON configuration. JSON validates known keys, enum values and types; numeric values clamp/snap to the supported range. Configurations live in memory per mounted specimen; they are not saved between app sessions. Recipes are starter snippets rather than generated code for the current configuration.

## Universal

| Collection | Controls and choices |
| --- | --- |
| u-button | Button variant: filled / outlined / text; Action label: editable text; Enabled: on / off; Corner radius: 0–32, step 2; Padding: 0–28, step 2; Opacity: 0.2–1, step 0.1 |
| u-slider | Current value: 0–200, step 1; Maximum: 10–200, step 10; Step increment: 1–25, step 1; Enabled: on / off |
| u-toggles | Notifications: on / off; Digest: on / off; Enabled: on / off; Switch label: editable text |
| u-picker | Picker appearance: menu / wheel; Selected item: forest / ocean / sunset; Enabled: on / off |
| u-input | Editable: on / off; Multiline: on / off; Secure entry: on / off; Visible lines: 1–6, step 1; Character limit: 10–120, step 5; Text size: 12–28, step 1; Keyboard: default / email-address / numeric / phone-pad / url / decimal-pad; Capitalization: none / sentences / words / characters |
| u-text | Text content: editable text; Font size: 10–48, step 1; Font weight: 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900; Font family: system / serif / monospace; Letter spacing: -2–8, step 0.5; Line limit: 1–6, step 1 |
| u-icon | Symbol size: 12–80, step 2; Symbol color: #246b4d / #ad4b2c / #6552a3 / #ba8434; SF Symbol (iOS): star.fill / heart.fill / leaf.fill / wifi |
| u-layout | Spacing: 0–40, step 2; Cross-axis alignment: start / center / end; Row width: 160–320, step 10; Cell padding: 4–24, step 2 |
| u-collapsible | Expanded: on / off; Header label: editable text; Header size: 12–24, step 1 |
| u-fields | Form height: 220–500, step 20; Uppercase section title (Android): on / off; Show section footer: on / off |
| u-list | Row count: 3–12, step 1; List height: 160–500, step 20; Leading slot: on / off; Trailing slot: on / off; Supporting text: on / off |
| u-scroll | Scroll axis: horizontal / vertical; Show scroll indicators: on / off; Card count: 3–12, step 1; Card width: 100–240, step 10; Card height: 80–220, step 10 |
| u-interop | React Native card padding: 0–40, step 2; React Native card radius: 0–32, step 2 |
| u-sheet | Snap points: half + full / full / fraction 0.3 / height 320 / automatic; Drag indicator: on / off; Sheet content padding: 0–40, step 2; Sheet background: system / #e5efdf / #eee8f8 / #17211c |

## SwiftUI

| Collection | Controls and choices |
| --- | --- |
| styles | Button border shape: automatic / capsule / roundedRectangle / circle; Button corner radius: 0–40, step 1; Button style · glass requires iOS 26+: automatic / bordered / borderedProminent / borderless / glass / glassProminent / plain; Control size: mini / small / regular / large / extraLarge; Action role: default / cancel / destructive / close; Action label: editable text; Disable action: on / off; Label visibility: automatic / iconOnly / titleAndIcon / titleOnly |
| toggles | Toggle style: automatic / switch / button; Control size: mini / small / regular / large / extraLarge; Toggle label: editable text; Disable first toggle: on / off |
| input | Field style: automatic / plain / roundedBorder; Keyboard: default / email-address / numeric / phone-pad / ascii-capable / numbers-and-punctuation / url / name-phone-pad / decimal-pad / twitter / web-search / ascii-capable-number-pad; Return key: done / go / send / join / route / search / return / next / continue; Input axis: horizontal / vertical; Maximum characters: 5–120, step 1; Disable autocorrection: on / off; Disable fields: on / off; Placeholder: editable text |
| ranges | Slider / stepper increment: 1–25, step 1; Disable controls: on / off; Hide native labels: on / off |
| pickers | Period picker style: automatic / inline / menu / navigationLink / palette / segmented / wheel; Date picker style: automatic / compact / graphical / wheel; Date components: date / hourAndMinute / both; Allow color opacity: on / off; Limit dates to this week: on / off; Control size: mini / small / regular / large / extraLarge |
| feedback | Progress style: automatic / linear / circular; Gauge style: automatic / circular / circularCapacity / linear / linearCapacity; Indeterminate primary progress: on / off; Control size: mini / small / regular / large / extraLarge |
| menus | Menu style: automatic / button; Menu indicator: automatic / visible / hidden; Action dismissal: automatic / disabled / enabled; Menu title: editable text |
| dialogs | Alert title: editable text; Alert message: editable text; Confirmation title visibility: automatic / visible / hidden |
| presentations | Sheet corner radius: 0–60, step 1; Sheet sizing · iPad / iOS 18+: automatic / fitted / form / page; Sheet background interaction: automatic / enabled / disabled; Sheet detents: medium + large / medium / large / fraction / height; Fraction detent: 0.2–1, step 0.1; Height detent: 160–600, step 20; Drag indicator: automatic / visible / hidden; Prevent swipe dismissal: on / off; Popover arrow: none / leading / trailing / top / bottom; Popover anchor: center / leading / trailing / top / bottom |
| list | List style: automatic / plain / inset / insetGrouped / grouped / sidebar; Row spacing: 0–24, step 1; Hide row separators: on / off; Allow full swipe: on / off; Hide scroll background: on / off |
| form | Name placeholder: editable text; Disable form: on / off; Control size: mini / small / regular / large / extraLarge |
| stack | Navigation title display: automatic / inline / large; Navigation title: editable text |
| split | Split view style: automatic / balanced / prominentDetail |
| tabs | Tab presentation: automatic / page / sidebarAdaptable; Page indicator: automatic / always / never |
| links | Link button style: automatic / bordered / borderedProminent / borderless / glass / glassProminent / plain; Share label style: automatic / iconOnly / titleAndIcon / titleOnly; Shared text: editable text |
| text | Date text format: timer / relative / offset / date / time; Truncation position: head / middle / tail; Title maximum lines: 1–5, step 1; Multiline text alignment: leading / center / trailing; SF Symbol effect · availability varies by OS: none / appear / bounce / breathe / disappear / drawOff / drawOn / pulse / rotate / scale / variableColor / wiggle; Symbol animation speed: 0.2–3, step 0.2; Text content: editable text; Dynamic text style: largeTitle / title / title2 / title3 / headline / subheadline / body / callout / footnote / caption / caption2; Font weight: ultraLight / thin / light / regular / medium / semibold / bold / heavy / black; Font design: default / rounded / serif / monospaced; Italic: on / off; Enable text selection: on / off; Label visibility: automatic / iconOnly / titleAndIcon / titleOnly; SF Symbol: heart / heart.fill / star / star.fill / wifi / speaker.wave.3.fill / person.crop.circle.fill; Symbol size: 12–64, step 1; Variable symbol value: 0–1, step 0.05; Text kerning: -2–6, step 0.5 |
| empty | Empty title: editable text; Empty description: editable text |
| chart | Chart type: bar / line / area / point / pie / rectangle; Point symbol: circle / square / diamond; Line width: 1–10, step 1; Point size: 10–150, step 5; Dashed line: on / off; Bar / rectangle corner radius: 0–20, step 1; Bar width: 5–45, step 1; Pie inner radius: 0–0.9, step 0.05; Pie slice spacing: 0–12, step 1; Pie opacity: 0.1–1, step 0.1; Show categorical legend: on / off; Animate changes: on / off; Reference rule at 12: on / off |
| layout | Stack alignment: leading / center / trailing; Stack spacing: 0–36, step 1; Grid horizontal spacing: 0–48, step 1; Grid vertical spacing: 0–32, step 1 |
| scroll | Lazy stack spacing: 0–40, step 1; Scroll indicators: automatic / visible / hidden / never; Disable scrolling: on / off |
| shapes | Capsule corner style: continuous / circular; Shape width: 25–85, step 1; Shape height: 25–85, step 1; Corner radius: 0–40, step 1; Uneven top trailing radius: 0–40, step 1; Uneven bottom leading radius: 0–40, step 1 |
| layers | Masked surface width: 100–260, step 1; Masked surface height: 50–130, step 1; Overlay text: editable text |
| modifiers | Rotation degrees: -180–180, step 5; Scale: 0.5–1.2, step 0.05; Opacity: 0.1–1, step 0.05; Blur radius: 0–10, step 1; Shadow radius: 0–20, step 1; Padding: 0–30, step 1; Corner radius: 0–40, step 1 |
| glass | Glass variant · iOS 26+: regular / clear / identity; Interactive glass: on / off; Glass container blend spacing: 0–80, step 1; Surface padding: 8–32, step 1 |
| interop | React Native island padding: 0–32, step 1; Island corner radius: 0–32, step 1 |

## Compose

| Collection | Controls and choices |
| --- | --- |
| compose-buttons | Enabled: on / off; Button label: editable text; Internal padding (dp): 4–32, step 1; Corner radius (dp): 0–32, step 1; Override native colors: on / off |
| compose-icon-buttons | Enabled: on / off; Native button size (dp): 32–72, step 4; Override native colors: on / off |
| compose-floating-actions | Expanded extended FAB: on / off; Override native colors: on / off |
| compose-selection | Enabled: on / off; Override native colors: on / off; Switch thumb icon: on / off |
| compose-segments | Enabled: on / off; Override native colors: on / off |
| compose-chips | Enabled: on / off; Chip elevation (dp): 0–12, step 1; Chip border width (dp): 0–4, step 1 |
| compose-sliders | Enabled: on / off; Discrete interior steps: 0–12, step 1; Maximum value: 1–10, step 1; Reverse vertical direction: on / off; Constrain drag to middle 60%: on / off |
| compose-fields | Enabled: on / off; Read only: on / off; Single line: on / off; Multiline line count: 1–5, step 1; Error state: on / off; Password transformation: on / off; Keyboard type: text / number / email / phone / uri |
| compose-progress | Determinate progress: on / off; Circular stroke width (dp): 1–12, step 1; Track gap (dp): 0–12, step 1; Stroke cap: round / butt / square; Wave amplitude: 0–1, step 0.1; Wavelength (dp): 8–64, step 4; Wave speed (dp/s): 0–96, step 4 |
| compose-content | Headline text: editable text; Headline font size: 12–42, step 1; Font family: serif / sans-serif / monospace; Italic: on / off; Card elevation (dp): 0–24, step 1 |
| compose-artwork | Image / icon size (dp): 32–120, step 4; Image content scale: fit / crop / fillBounds / inside / none / fillWidth / fillHeight; Polygon / star vertices: 3–12, step 1; Shape corner rounding: 0–0.5, step 0.05; Shape smoothing: 0–1, step 0.1; Star inner radius: 0.1–1, step 0.1; Badge label: editable text |
| compose-layout | Spacing (dp): 0–32, step 1; Box content alignment: center / topStart / bottomEnd; Box height (dp): 40–120, step 1 |
| compose-modifiers | Padding (dp): 0–32, step 1; Clip radius (dp): 0–40, step 1; Border width (dp): 0–6, step 1; Rotation (degrees): -30–30, step 1; Opacity multiplier: 0.1–1, step 0.1 |
| compose-dialogs | Dismiss on outside tap: on / off; Dismiss on Android back: on / off; Show sheet handle: on / off; Enable sheet gestures: on / off; Skip partially expanded sheet: on / off |
| compose-menus | Enabled: on / off |
| compose-search | Search placeholder: editable text |
| compose-navigation | Enabled: on / off; Always show destination labels: on / off; Floating toolbar variant: vibrant / standard; Navigation tonal elevation (dp): 0–16, step 1 |
| compose-pager | Page spacing (dp): 0–32, step 1; Content padding (dp): 0–32, step 1; Allow swipe: on / off; Reverse layout: on / off |
| compose-carousels | Spacing (dp): 0–32, step 1; Content padding (dp): 0–32, step 1; Preferred / fixed item width (dp): 100–300, step 10; Allow swipe: on / off |
| compose-lists | Row spacing (dp): 0–24, step 1; Content padding (dp): 0–32, step 1; Row count: 4–40, step 1 |
| compose-feedback | Rich tooltip: on / off; Persistent tooltip: on / off; Snackbar duration: short / long / indefinite; Show dismiss action: on / off; Snackbar message: editable text; Snackbar action label: editable text |
| compose-inline-dates | Show title: on / off; Show selection headline: on / off; Show calendar / text mode toggle: on / off |
| compose-dates | 24-hour clock: on / off |
| compose-recycling | Estimated item height (dp): 48–120, step 4 |
