# Expo UI coverage

Reviewed against installed `@expo/ui 58.0.20`. The atlas contains 65 collections.

“Live” means the API is represented in a rendered specimen; it does not imply device runtime verification. Compound slots appear through their parent components. Modifier playgrounds show representative variations, not every possible modifier combination.

## Collections

| Family | Collection | Category | Exports |
| --- | --- | --- | --- |
| universal | Button | Actions | Button |
| universal | Slider | Selection | Slider |
| universal | Switch & Checkbox | Selection | Switch, Checkbox |
| universal | Picker | Selection | Picker |
| universal | TextInput & native state | Inputs | TextInput, useNativeState |
| universal | Text | Content | Text |
| universal | Icon | Content | Icon |
| universal | Row, Column & Spacer | Layout | Row, Column, Spacer |
| universal | Collapsible | Presentation | Collapsible |
| universal | FieldGroup | Inputs | FieldGroup |
| universal | List & ListItem | Content | List, ListItem |
| universal | ScrollView | Layout | ScrollView |
| universal | Host & RNHostView | Layout | Host, RNHostView |
| universal | BottomSheet | Presentation | BottomSheet |
| swiftui | Buttons & control groups | Actions | Button, ControlGroup |
| swiftui | Toggle & SyncToggle | Selection | Toggle, SyncToggle, useNativeState |
| swiftui | Text & secure input | Inputs | TextField, SecureField |
| swiftui | Slider & Stepper | Inputs | Slider, Stepper |
| swiftui | Pickers, dates & colors | Selection | Picker, ColorPicker, DatePicker |
| swiftui | Progress & gauges | Feedback | ProgressView, Gauge |
| swiftui | Menus & context menus | Actions | Menu, ContextMenu, Items, Trigger, Preview |
| swiftui | Alerts & confirmation | Presentation | Alert, ConfirmationDialog |
| swiftui | Sheets & popovers | Presentation | BottomSheet, Popover, Group |
| swiftui | Lists & disclosure | Content | List, ListForEach, Section, DisclosureGroup, LabeledContent, SwipeActions, Actions |
| swiftui | Form | Content | Form |
| swiftui | Navigation stack & toolbar | Navigation | NavigationStack, NavigationLink, NavigationDestination, Toolbar, ToolbarItem |
| swiftui | Split navigation | Navigation | NavigationSplitView |
| swiftui | TabView | Navigation | TabView |
| swiftui | Links & sharing | Actions | Link, ShareLink |
| swiftui | Text, symbols & labels | Content | Text, Label, Image |
| swiftui | Content unavailable | Feedback | ContentUnavailableView |
| swiftui | Swift Charts | Content | Chart |
| swiftui | Stacks & grid | Layout | Host, HStack, VStack, ZStack, Spacer, Divider, Grid |
| swiftui | Scroll & lazy stacks | Layout | ScrollView, LazyHStack, LazyVStack, LazyVStackForEach, LazyHStackForEach |
| swiftui | Native shapes | Content | Rectangle, RoundedRectangle, Circle, Ellipse, Capsule, UnevenRoundedRectangle |
| swiftui | Masks, overlays & backgrounds | Modifiers | Mask, Overlay, Background |
| swiftui | Modifier playground | Modifiers | modifiers |
| swiftui | Glass & namespaces | Modifiers | Namespace, GlassEffectContainer |
| swiftui | React Native interop | Layout | RNHostView |
| swiftui | Specialized native contexts | Layout | AccessoryWidgetBackground, ArrangementView, ConcentricRectangle, EdgeCornerStyle, withAnimation, useWorkletCallback |
| compose | Material colors | Modifiers | useMaterialColors, isDynamicColorAvailable |
| compose | Recycled lazy items | Layout | LazyItems |
| compose | Buttons | Actions | Button, FilledTonalButton, OutlinedButton, ElevatedButton, TextButton |
| compose | Icon buttons | Actions | IconButton, FilledIconButton, FilledTonalIconButton, OutlinedIconButton |
| compose | Floating actions | Actions | FloatingActionButton, SmallFloatingActionButton, LargeFloatingActionButton, ExtendedFloatingActionButton |
| compose | Checkboxes & switches | Selection | Checkbox, TriStateCheckbox, Switch, SwitchThumbContent, useNativeState, SyncSwitch, RadioButton, ToggleButton, IconToggleButton, FilledIconToggleButton, OutlinedIconToggleButton |
| compose | Segmented buttons | Selection | SegmentedButton, SingleChoiceSegmentedButtonRow, MultiChoiceSegmentedButtonRow |
| compose | Chips | Selection | AssistChip, FilterChip, InputChip, SuggestionChip |
| compose | Sliders | Inputs | Slider, VerticalSlider |
| compose | Text fields | Inputs | TextField, OutlinedTextField, BasicTextField |
| compose | Progress & loading | Feedback | LinearProgressIndicator, CircularProgressIndicator, LinearWavyProgressIndicator, CircularWavyProgressIndicator, LoadingIndicator, ContainedLoadingIndicator |
| compose | Cards & surfaces | Content | Text, Card, ElevatedCard, OutlinedCard, Surface, ListItem |
| compose | Images, icons & shapes | Content | Image, Icon, Badge, BadgedBox, Shape |
| compose | Layout & visibility | Layout | Box, Row, Column, FlowRow, Spacer, HorizontalDivider, VerticalDivider, AnimatedVisibility, EnterTransition, ExitTransition, RNHostView |
| compose | Modifier playground | Modifiers | Host |
| compose | Dialogs & bottom sheets | Presentation | AlertDialog, BasicAlertDialog, ModalBottomSheet |
| compose | Menus | Presentation | DropdownMenu, Items, Trigger, DropdownMenuItem, ExposedDropdownMenuBox, ExposedDropdownMenu |
| compose | Search bars | Inputs | SearchBar, SearchBarPlaceholder, ExpandedFullScreenSearchBar, DockedSearchBar, DockedSearchBarLeadingIcon, DockedSearchBarPlaceholder |
| compose | Navigation & toolbar | Navigation | NavigationBar, NavigationBarItem, HorizontalFloatingToolbar, HorizontalFloatingToolbarFloatingActionButton |
| compose | Horizontal pager | Navigation | HorizontalPager |
| compose | Carousels | Content | HorizontalCenteredHeroCarousel, HorizontalMultiBrowseCarousel, HorizontalUncontainedCarousel |
| compose | Lazy lists & refresh | Layout | LazyColumn, LazyRow, PullToRefreshBox |
| compose | Snackbar & tooltip | Feedback | Snackbar, SnackbarHost, TooltipBox |
| compose | Date & time dialogs | Inputs | DatePickerDialog, DateRangePickerDialog, TimePickerDialog |
| compose | Inline date pickers | Inputs | DateTimePicker, DateRangePicker |

## Public runtime export audit

| Family | Export | Coverage |
| --- | --- | --- |
| universal | BottomSheet | Live / compound: BottomSheet |
| universal | Button | Live / compound: Button |
| universal | Checkbox | Live / compound: Switch & Checkbox |
| universal | Collapsible | Live / compound: Collapsible |
| universal | Column | Live / compound: Row, Column & Spacer |
| universal | FieldGroup | Live / compound: FieldGroup |
| universal | Host | Live / compound: Host & RNHostView |
| universal | Icon | Live / compound: Icon |
| universal | List | Live / compound: List & ListItem |
| universal | ListItem | Live / compound: List & ListItem |
| universal | Picker | Live / compound: Picker |
| universal | RNHostView | Live / compound: Host & RNHostView |
| universal | Row | Live / compound: Row, Column & Spacer |
| universal | ScrollView | Live / compound: ScrollView |
| universal | Slider | Live / compound: Slider |
| universal | Spacer | Live / compound: Row, Column & Spacer |
| universal | Switch | Live / compound: Switch & Checkbox |
| universal | Text | Live / compound: Text |
| universal | TextInput | Live / compound: TextInput & native state |
| universal | getFieldItemPosition | Internal FieldGroup section-position helper; exercised by the grouped form, not a standalone view. |
| universal | useNativeState | Live / compound: TextInput & native state |
| swiftui | AccessoryWidgetBackground | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| swiftui | Actions | Live / compound: Lists & disclosure |
| swiftui | Alert | Live / compound: Alerts & confirmation |
| swiftui | ArrangementView | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| swiftui | Background | Live / compound: Masks, overlays & backgrounds |
| swiftui | BottomSheet | Live / compound: Sheets & popovers |
| swiftui | Button | Live / compound: Buttons & control groups |
| swiftui | Capsule | Live / compound: Native shapes |
| swiftui | Chart | Live / compound: Swift Charts |
| swiftui | Circle | Live / compound: Native shapes |
| swiftui | ColorPicker | Live / compound: Pickers, dates & colors |
| swiftui | ConcentricRectangle | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| swiftui | ConfirmationDialog | Live / compound: Alerts & confirmation |
| swiftui | ContentUnavailableView | Live / compound: Content unavailable |
| swiftui | ContextMenu | Live / compound: Menus & context menus |
| swiftui | ControlGroup | Live / compound: Buttons & control groups |
| swiftui | DatePicker | Live / compound: Pickers, dates & colors |
| swiftui | DisclosureGroup | Live / compound: Lists & disclosure |
| swiftui | Divider | Live / compound: Stacks & grid |
| swiftui | EdgeCornerStyle | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| swiftui | Ellipse | Live / compound: Native shapes |
| swiftui | Form | Live / compound: Form |
| swiftui | Gauge | Live / compound: Progress & gauges |
| swiftui | GlassEffectContainer | Live / compound: Glass & namespaces |
| swiftui | Grid | Live / compound: Stacks & grid |
| swiftui | Group | Live / compound: Sheets & popovers |
| swiftui | HStack | Live / compound: Stacks & grid |
| swiftui | Host | Live / compound: Stacks & grid |
| swiftui | Image | Live / compound: Text, symbols & labels |
| swiftui | Items | Live / compound: Menus & context menus |
| swiftui | Label | Live / compound: Text, symbols & labels |
| swiftui | LabeledContent | Live / compound: Lists & disclosure |
| swiftui | LazyHStack | Live / compound: Scroll & lazy stacks |
| swiftui | LazyHStackForEach | Live / compound: Scroll & lazy stacks |
| swiftui | LazyVStack | Live / compound: Scroll & lazy stacks |
| swiftui | LazyVStackForEach | Live / compound: Scroll & lazy stacks |
| swiftui | Link | Live / compound: Links & sharing |
| swiftui | List | Live / compound: Lists & disclosure |
| swiftui | ListForEach | Live / compound: Lists & disclosure |
| swiftui | Mask | Live / compound: Masks, overlays & backgrounds |
| swiftui | Menu | Live / compound: Menus & context menus |
| swiftui | Namespace | Live / compound: Glass & namespaces |
| swiftui | NavigationDestination | Live / compound: Navigation stack & toolbar |
| swiftui | NavigationLink | Live / compound: Navigation stack & toolbar |
| swiftui | NavigationSplitView | Live / compound: Split navigation |
| swiftui | NavigationStack | Live / compound: Navigation stack & toolbar |
| swiftui | Overlay | Live / compound: Masks, overlays & backgrounds |
| swiftui | Picker | Live / compound: Pickers, dates & colors |
| swiftui | Popover | Live / compound: Sheets & popovers |
| swiftui | Preview | Live / compound: Menus & context menus |
| swiftui | ProgressView | Live / compound: Progress & gauges |
| swiftui | RNHostView | Live / compound: React Native interop |
| swiftui | Rectangle | Live / compound: Native shapes |
| swiftui | RoundedRectangle | Live / compound: Native shapes |
| swiftui | ScrollView | Live / compound: Scroll & lazy stacks |
| swiftui | Section | Live / compound: Lists & disclosure |
| swiftui | SecureField | Live / compound: Text & secure input |
| swiftui | ShareLink | Live / compound: Links & sharing |
| swiftui | Slider | Live / compound: Slider & Stepper |
| swiftui | Spacer | Live / compound: Stacks & grid |
| swiftui | Stepper | Live / compound: Slider & Stepper |
| swiftui | SwipeActions | Live / compound: Lists & disclosure |
| swiftui | SyncToggle | Live / compound: Toggle & SyncToggle |
| swiftui | TabView | Live / compound: TabView |
| swiftui | Text | Live / compound: Text, symbols & labels |
| swiftui | TextField | Live / compound: Text & secure input |
| swiftui | Toggle | Live / compound: Toggle & SyncToggle |
| swiftui | Toolbar | Live / compound: Navigation stack & toolbar |
| swiftui | ToolbarItem | Live / compound: Navigation stack & toolbar |
| swiftui | Trigger | Live / compound: Menus & context menus |
| swiftui | UnevenRoundedRectangle | Live / compound: Native shapes |
| swiftui | VStack | Live / compound: Stacks & grid |
| swiftui | ZStack | Live / compound: Stacks & grid |
| swiftui | useNativeState | Live / compound: Toggle & SyncToggle |
| swiftui | useWorkletCallback | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| swiftui | withAnimation | Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts. |
| compose | AlertDialog | Live / compound: Dialogs & bottom sheets |
| compose | AnimatedVisibility | Live / compound: Layout & visibility |
| compose | AssistChip | Live / compound: Chips |
| compose | Badge | Live / compound: Images, icons & shapes |
| compose | BadgedBox | Live / compound: Images, icons & shapes |
| compose | BasicAlertDialog | Live / compound: Dialogs & bottom sheets |
| compose | BasicTextField | Live / compound: Text fields |
| compose | Box | Live / compound: Layout & visibility |
| compose | Button | Live / compound: Buttons |
| compose | Card | Live / compound: Cards & surfaces |
| compose | Checkbox | Live / compound: Checkboxes & switches |
| compose | CircularProgressIndicator | Live / compound: Progress & loading |
| compose | CircularWavyProgressIndicator | Live / compound: Progress & loading |
| compose | Column | Live / compound: Layout & visibility |
| compose | ContainedLoadingIndicator | Live / compound: Progress & loading |
| compose | DatePickerDialog | Live / compound: Date & time dialogs |
| compose | DateRangePicker | Live / compound: Inline date pickers |
| compose | DateRangePickerDialog | Live / compound: Date & time dialogs |
| compose | DateTimePicker | Live / compound: Inline date pickers |
| compose | DockedSearchBar | Live / compound: Search bars |
| compose | DockedSearchBarLeadingIcon | Live / compound: Search bars |
| compose | DockedSearchBarPlaceholder | Live / compound: Search bars |
| compose | DropdownMenu | Live / compound: Menus |
| compose | DropdownMenuItem | Live / compound: Menus |
| compose | ElevatedButton | Live / compound: Buttons |
| compose | ElevatedCard | Live / compound: Cards & surfaces |
| compose | EnterTransition | Live / compound: Layout & visibility |
| compose | ExitTransition | Live / compound: Layout & visibility |
| compose | ExpandedFullScreenSearchBar | Live / compound: Search bars |
| compose | ExposedDropdownMenu | Live / compound: Menus |
| compose | ExposedDropdownMenuBox | Live / compound: Menus |
| compose | ExtendedFloatingActionButton | Live / compound: Floating actions |
| compose | FilledIconButton | Live / compound: Icon buttons |
| compose | FilledIconToggleButton | Live / compound: Checkboxes & switches |
| compose | FilledTonalButton | Live / compound: Buttons |
| compose | FilledTonalIconButton | Live / compound: Icon buttons |
| compose | FilterChip | Live / compound: Chips |
| compose | FloatingActionButton | Live / compound: Floating actions |
| compose | FlowRow | Live / compound: Layout & visibility |
| compose | HorizontalCenteredHeroCarousel | Live / compound: Carousels |
| compose | HorizontalDivider | Live / compound: Layout & visibility |
| compose | HorizontalFloatingToolbar | Live / compound: Navigation & toolbar |
| compose | HorizontalFloatingToolbarFloatingActionButton | Live / compound: Navigation & toolbar |
| compose | HorizontalMultiBrowseCarousel | Live / compound: Carousels |
| compose | HorizontalPager | Live / compound: Horizontal pager |
| compose | HorizontalUncontainedCarousel | Live / compound: Carousels |
| compose | Host | Live / compound: Modifier playground |
| compose | HostPaletteContext | Internal context provider; used by the native Host and Material color hook. |
| compose | Icon | Live / compound: Images, icons & shapes |
| compose | IconButton | Live / compound: Icon buttons |
| compose | IconToggleButton | Live / compound: Checkboxes & switches |
| compose | Image | Live / compound: Images, icons & shapes |
| compose | InputChip | Live / compound: Chips |
| compose | Items | Live / compound: Menus |
| compose | LargeFloatingActionButton | Live / compound: Floating actions |
| compose | LazyColumn | Live / compound: Lazy lists & refresh |
| compose | LazyItems | Live / compound: Recycled lazy items |
| compose | LazyRow | Live / compound: Lazy lists & refresh |
| compose | LinearProgressIndicator | Live / compound: Progress & loading |
| compose | LinearWavyProgressIndicator | Live / compound: Progress & loading |
| compose | ListItem | Live / compound: Cards & surfaces |
| compose | LoadingIndicator | Live / compound: Progress & loading |
| compose | ModalBottomSheet | Live / compound: Dialogs & bottom sheets |
| compose | MultiChoiceSegmentedButtonRow | Live / compound: Segmented buttons |
| compose | NavigationBar | Live / compound: Navigation & toolbar |
| compose | NavigationBarItem | Live / compound: Navigation & toolbar |
| compose | OutlinedButton | Live / compound: Buttons |
| compose | OutlinedCard | Live / compound: Cards & surfaces |
| compose | OutlinedIconButton | Live / compound: Icon buttons |
| compose | OutlinedIconToggleButton | Live / compound: Checkboxes & switches |
| compose | OutlinedTextField | Live / compound: Text fields |
| compose | Preview | Context-menu preview slot; Android anchored menu specimen focuses on menu items, no context-menu preview. |
| compose | PullToRefreshBox | Live / compound: Lazy lists & refresh |
| compose | RNHostView | Live / compound: Layout & visibility |
| compose | RadioButton | Live / compound: Checkboxes & switches |
| compose | Row | Live / compound: Layout & visibility |
| compose | SearchBar | Live / compound: Search bars |
| compose | SearchBarPlaceholder | Live / compound: Search bars |
| compose | SegmentedButton | Live / compound: Segmented buttons |
| compose | Shape | Live / compound: Images, icons & shapes |
| compose | SingleChoiceSegmentedButtonRow | Live / compound: Segmented buttons |
| compose | Slider | Live / compound: Sliders |
| compose | SmallFloatingActionButton | Live / compound: Floating actions |
| compose | Snackbar | Live / compound: Snackbar & tooltip |
| compose | SnackbarHost | Live / compound: Snackbar & tooltip |
| compose | Spacer | Live / compound: Layout & visibility |
| compose | SuggestionChip | Live / compound: Chips |
| compose | Surface | Live / compound: Cards & surfaces |
| compose | Switch | Live / compound: Checkboxes & switches |
| compose | SwitchThumbContent | Live / compound: Checkboxes & switches |
| compose | SyncSwitch | Live / compound: Checkboxes & switches |
| compose | Text | Live / compound: Cards & surfaces |
| compose | TextButton | Live / compound: Buttons |
| compose | TextField | Live / compound: Text fields |
| compose | TimePickerDialog | Live / compound: Date & time dialogs |
| compose | ToggleButton | Live / compound: Checkboxes & switches |
| compose | TooltipBox | Live / compound: Snackbar & tooltip |
| compose | TriStateCheckbox | Live / compound: Checkboxes & switches |
| compose | Trigger | Live / compound: Menus |
| compose | VerticalDivider | Live / compound: Layout & visibility |
| compose | VerticalSlider | Live / compound: Sliders |
| compose | getMaterialColors | Palette utility; useMaterialColors specimen shows the active Host palette. |
| compose | isDynamicColorAvailable | Live / compound: Material colors |
| compose | parseJSXShape | Internal shape-element conversion helper; native Shape specimen uses public factory APIs. |
| compose | transformButtonProps | Internal prop conversion helper invoked by native button implementations. |
| compose | transformToggleButtonProps | Internal prop conversion helper invoked by toggle-button implementations. |
| compose | useMaterialColors | Live / compound: Material colors |
| compose | useNativeState | Live / compound: Checkboxes & switches |
| compose | useWorkletCallback | Advanced synchronous UI-thread callback helper. Ordinary specimens use JS callbacks; worklet orchestration is not demonstrated. |

## Runtime boundaries

- Universal icons intentionally render only on native platforms; web Icon returns no output.
- AccessoryWidgetBackground needs a real widget extension and cannot run in Expo Go app content.
- ArrangementView needs iOS 27.1; ConcentricRectangle and Liquid Glass appearance need iOS 26+. Specialized geometry and worklet orchestration are explained rather than simulated. Liquid Glass has a live specimen with native fallback on older iOS.
- Compose DropdownMenu Preview is an iOS-oriented compatibility slot and is not a meaningful Android preview.
- Runtime helper exports and native worklet utilities are described separately. Drop-in community replacement entrypoints are outside this three-family catalog.

## Device smoke checklist

Native execution has not been performed in this run. Existing simulators belonged to another Codex session and were left alone. Typechecks and Hermes bundles establish import/API compatibility, not native runtime correctness.

On SDK 58 Expo Go on each platform:

1. Browse all families and search for Slider. Confirm the other native family shows its availability message.
2. Change controls, text fields, selections, and sliders. Check echoed state; reset each specimen.
3. Open and dismiss menus, dialogs, sheets, popovers, date/time pickers, tooltips, and snackbars. Try system Back and swipe dismissal.
4. Scroll nested lists/carousels; pull to refresh; navigate within native stack/split/tab specimens and return to the catalog.
5. Check light/dark appearance, larger text, landscape/tablet widths, narrow phones, keyboard visibility, and accessible labels.
6. On iOS 26+, inspect Liquid Glass. Confirm OS-specific examples explain unsupported behavior on older systems.

## Updating this report

Run `bun scripts/ui-inventory.ts` after an intentional SDK upgrade, reconcile new exports, then `bun scripts/coverage-report.ts`. `bun test` fails if installed exports drift or metadata lacks renderer registration.
