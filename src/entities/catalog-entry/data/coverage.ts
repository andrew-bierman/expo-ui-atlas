/** Runtime helpers and compound slots are accounted separately from standalone specimens. */
export const supportExports: Record<string, Record<string, string>> = {
  universal: {
    getFieldItemPosition:
      'Internal FieldGroup section-position helper; exercised by the grouped form, not a standalone view.',
  },
  swiftui: {},
  compose: {
    DockedSearchBarLeadingIcon:
      'Compound slot rendered as DockedSearchBar.LeadingIcon.',
    DockedSearchBarPlaceholder:
      'Compound slot rendered as DockedSearchBar.Placeholder.',
    ExpandedFullScreenSearchBar:
      'Compound slot rendered as SearchBar.ExpandedFullScreenSearchBar.',
    HorizontalFloatingToolbarFloatingActionButton:
      'Compound slot rendered as HorizontalFloatingToolbar.FloatingActionButton.',
    SearchBarPlaceholder: 'Compound slot rendered as SearchBar.Placeholder.',
    Items:
      'Compound DropdownMenu.Items slot rendered by anchored menu specimen.',
    Preview:
      'Context-menu preview slot; Android anchored menu specimen focuses on menu items, no context-menu preview.',
    Trigger: 'Compound DropdownMenu.Trigger slot rendered by menu specimen.',
    LazyItems:
      'Large-data adapter for LazyColumn/LazyRow; small scrolling specimen uses keyed children.',
    EnterTransition:
      'Animation descriptor used by AnimatedVisibility fade/expand specimen.',
    ExitTransition:
      'Animation descriptor used by AnimatedVisibility fade/shrink specimen.',
    HostPaletteContext:
      'Internal context provider; used by the native Host and Material color hook.',
    parseJSXShape:
      'Internal shape-element conversion helper; native Shape specimen uses public factory APIs.',
    transformButtonProps:
      'Internal prop conversion helper invoked by native button implementations.',
    transformToggleButtonProps:
      'Internal prop conversion helper invoked by toggle-button implementations.',
    getMaterialColors:
      'Palette utility; useMaterialColors specimen shows the active Host palette.',
    isDynamicColorAvailable:
      'Device capability utility; Material palette specimen reports support.',
    useMaterialColors: 'Hook rendered in the Material palette specimen.',
    useNativeState:
      'Native observable state hook rendered by SyncSwitch specimen.',
    useWorkletCallback:
      'Advanced synchronous UI-thread callback helper. Ordinary specimens use JS callbacks; worklet orchestration is not demonstrated.',
  },
};
export const contextualSwiftExports = new Set([
  'AccessoryWidgetBackground',
  'ArrangementView',
  'ConcentricRectangle',
  'EdgeCornerStyle',
  'withAnimation',
  'useWorkletCallback',
]);
