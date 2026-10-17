export enum Family {
  Universal = 'universal',
  SwiftUI = 'swiftui',
  Compose = 'compose',
}
export enum Category {
  Actions = 'Actions',
  Inputs = 'Inputs',
  Selection = 'Selection',
  Feedback = 'Feedback',
  Presentation = 'Presentation',
  Content = 'Content',
  Layout = 'Layout',
  Navigation = 'Navigation',
  Modifiers = 'Modifiers',
}
export enum CatalogPlatform {
  IOS = 'ios',
  Android = 'android',
  Web = 'web',
}
export enum CatalogFilter {
  All = 'all',
}
export enum CatalogEntryId {
  UniversalButton = 'u-button',
  UniversalSlider = 'u-slider',
  UniversalToggles = 'u-toggles',
  UniversalPicker = 'u-picker',
  UniversalInput = 'u-input',
  UniversalText = 'u-text',
  UniversalIcon = 'u-icon',
  UniversalLayout = 'u-layout',
  UniversalCollapsible = 'u-collapsible',
  UniversalFields = 'u-fields',
  UniversalList = 'u-list',
  UniversalScroll = 'u-scroll',
  UniversalInterop = 'u-interop',
  UniversalSheet = 'u-sheet',
  SwiftUIButtons = 'swiftui-buttons',
  SwiftUISwitches = 'swiftui-switches',
  SwiftUIFields = 'swiftui-fields',
  SwiftUIRanges = 'swiftui-ranges',
  SwiftUIPickers = 'swiftui-pickers',
  SwiftUIFeedback = 'swiftui-feedback',
  SwiftUIMenus = 'swiftui-menus',
  SwiftUIDialogs = 'swiftui-dialogs',
  SwiftUISheets = 'swiftui-sheets',
  SwiftUILists = 'swiftui-lists',
  SwiftUIForm = 'swiftui-form',
  SwiftUINavigation = 'swiftui-navigation',
  SwiftUISplit = 'swiftui-split',
  SwiftUITabs = 'swiftui-tabs',
  SwiftUILinks = 'swiftui-links',
  SwiftUITypography = 'swiftui-typography',
  SwiftUIEmpty = 'swiftui-empty',
  SwiftUICharts = 'swiftui-charts',
  SwiftUILayout = 'swiftui-layout',
  SwiftUIScrolling = 'swiftui-scrolling',
  SwiftUIShapes = 'swiftui-shapes',
  SwiftUILayers = 'swiftui-layers',
  SwiftUIModifiers = 'swiftui-modifiers',
  SwiftUIGlass = 'swiftui-glass',
  SwiftUIInterop = 'swiftui-interop',
  SwiftUIContexts = 'swiftui-contexts',
  ComposePalette = 'compose-palette',
  ComposeRecycling = 'compose-recycling',
  ComposeButtons = 'compose-buttons',
  ComposeIconButtons = 'compose-icon-buttons',
  ComposeFloatingActions = 'compose-floating-actions',
  ComposeSelection = 'compose-selection',
  ComposeSegments = 'compose-segments',
  ComposeChips = 'compose-chips',
  ComposeSliders = 'compose-sliders',
  ComposeFields = 'compose-fields',
  ComposeProgress = 'compose-progress',
  ComposeContent = 'compose-content',
  ComposeArtwork = 'compose-artwork',
  ComposeLayout = 'compose-layout',
  ComposeModifiers = 'compose-modifiers',
  ComposeDialogs = 'compose-dialogs',
  ComposeMenus = 'compose-menus',
  ComposeSearch = 'compose-search',
  ComposeNavigation = 'compose-navigation',
  ComposePager = 'compose-pager',
  ComposeCarousels = 'compose-carousels',
  ComposeLists = 'compose-lists',
  ComposeFeedback = 'compose-feedback',
  ComposeDates = 'compose-dates',
  ComposeInlineDates = 'compose-inline-dates',
}
export interface CatalogEntry {
  id: CatalogEntryId;
  name: string;
  summary: string;
  family: Family;
  category: Category;
  platforms: CatalogPlatform[];
  exports: string[];
  tags: string[];
  notes?: string;
  docs?: string;
}
export const families = {
  [Family.Universal]: {
    label: 'Universal',
    short: 'U',
    color: '#246b4d',
    description: 'One API. Native on iOS and Android, with web fallbacks.',
  },
  [Family.SwiftUI]: {
    label: 'SwiftUI',
    short: 'S',
    color: '#ad4b2c',
    description: 'Direct access to Apple’s native controls and modifiers.',
  },
  [Family.Compose]: {
    label: 'Compose',
    short: 'C',
    color: '#6552a3',
    description: 'Direct Jetpack Compose and Material components on Android.',
  },
} as const;
export const categories = Object.values(Category);
export const familyOptions = Object.values(Family).map((id) => ({
  id,
  ...families[id],
}));
export const platformLabels: Record<CatalogPlatform, string> = {
  [CatalogPlatform.IOS]: 'iOS',
  [CatalogPlatform.Android]: 'Android',
  [CatalogPlatform.Web]: 'Web',
};
