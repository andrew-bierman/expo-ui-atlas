import type { MaterialIcon, SFSymbolIcon } from 'expo-router/native-tabs';

export enum AppLocale {
  English = 'en',
}
export enum TabRoute {
  Catalog = '(catalog)',
  Guide = 'guide',
}
export enum GuideSection {
  Usage = 'usage',
  Boundaries = 'boundaries',
  Specimen = 'specimen',
  Extension = 'extension',
}
interface MessageTree {
  readonly [key: string]: string | MessageTree;
}
interface RangeSetting {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}
interface AppConfiguration {
  name: string;
  localization: { defaultLocale: AppLocale; fallbackLocale: AppLocale };
  navigation: {
    tabs: readonly {
      route: TabRoute;
      labelKey: `navigation.${'catalog' | 'guide'}`;
      icon: SFSymbolIcon & MaterialIcon;
    }[];
    sheets: {
      reference: readonly [number, ...number[]];
      customize: readonly [number, ...number[]];
    };
  };
  guide: { sectionOrder: readonly GuideSection[] };
  catalog: { filtersInitiallyOpen: boolean };
  gallery: { initialRows: number; rowsPerBatch: number; viewportCount: number };
  preview: {
    appearanceOptions: readonly ('system' | 'light' | 'dark')[];
    accentOptions: readonly ('system' | `#${string}`)[];
    directionOptions: readonly ('system' | 'leftToRight' | 'rightToLeft')[];
    width: RangeSetting;
    padding: RangeSetting;
  };
  documentation: { sdkVersion: string; overviewUrl: `https://${string}` };
  publicResources: {
    repository: `https://${string}`;
    issues: `https://${string}`;
    privacy: `https://${string}`;
    support: `https://${string}`;
    notices: `https://${string}`;
    dependencyNotices: `https://${string}`;
  };
  messages: MessageTree;
}

export const appConfig = {
  name: 'Expo UI Atlas',
  localization: {
    defaultLocale: AppLocale.English,
    fallbackLocale: AppLocale.English,
  },
  navigation: {
    tabs: [
      {
        route: TabRoute.Catalog,
        labelKey: 'navigation.catalog',
        icon: { sf: 'square.grid.2x2', md: 'apps' },
      },
      {
        route: TabRoute.Guide,
        labelKey: 'navigation.guide',
        icon: { sf: 'book', md: 'info' },
      },
    ],
    sheets: { reference: [0.5, 1], customize: [1] },
  },
  guide: {
    sectionOrder: [
      GuideSection.Usage,
      GuideSection.Boundaries,
      GuideSection.Specimen,
      GuideSection.Extension,
    ],
  },
  catalog: { filtersInitiallyOpen: false },
  gallery: { initialRows: 2, rowsPerBatch: 2, viewportCount: 3 },
  preview: {
    appearanceOptions: ['system', 'light', 'dark'],
    accentOptions: [
      'system',
      '#246b4d',
      '#6552a3',
      '#ad4b2c',
      '#006fbb',
      '#a12670',
    ],
    directionOptions: ['system', 'leftToRight', 'rightToLeft'],
    width: { min: 55, max: 100, step: 5, defaultValue: 100 },
    padding: { min: 0, max: 32, step: 2, defaultValue: 16 },
  },
  documentation: {
    sdkVersion: '58.0.0',
    overviewUrl: 'https://docs.expo.dev/versions/v58.0.0/sdk/ui/',
  },
  publicResources: {
    repository: 'https://github.com/andrew-bierman/expo-ui-atlas',
    issues: 'https://github.com/andrew-bierman/expo-ui-atlas/issues',
    privacy:
      'https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/privacy.md',
    support:
      'https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/support.md',
    notices:
      'https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/notices.md',
    dependencyNotices:
      'https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/dependency-notices.md',
  },
  messages: {
    navigation: {
      catalog: 'Catalog',
      guide: 'Guide',
      customize: 'Customize',
      docs: 'Docs',
      done: 'Done',
      detail: 'Explore specimen',
      documentation: 'Documentation',
      legal: 'Information',
      customizeTitle: 'Customize {{name}}',
      docsTitle: '{{name}} docs',
    },
    catalog: {
      search: 'Search components',
      webSearch: 'Search components, modifiers, interactions…',
      filters: 'Filters',
      allApis: 'All APIs',
      allCategories: 'All categories',
      clearFilters: 'Clear filters',
      collections_one: '{{count}} collection',
      collections_other: '{{count}} collections',
      empty: 'No matching components',
      row: '{{family}} · {{category}}',
      detailSummary: '{{family}} · {{summary}}',
      notFound: 'Component not found',
      notFoundBody: 'Return to the catalog to keep exploring.',
      back: 'Back to catalog',
      availableOn: 'Available on {{platforms}}',
      platformSeparator: ' or ',
      unavailable: 'Unavailable on this platform',
      chooseAvailable: 'Choose a component available on this device.',
    },
    families: {
      universal: {
        label: 'Universal',
        description: 'One API. Native on iOS and Android, with web fallbacks.',
      },
      swiftui: {
        label: 'SwiftUI',
        description: 'Direct access to Apple’s native controls and modifiers.',
      },
      compose: {
        label: 'Compose',
        description:
          'Direct Jetpack Compose and Material components on Android.',
      },
    },
    categories: {
      Actions: 'Actions',
      Inputs: 'Inputs',
      Selection: 'Selection',
      Feedback: 'Feedback',
      Presentation: 'Presentation',
      Content: 'Content',
      Layout: 'Layout',
      Navigation: 'Navigation',
      Modifiers: 'Modifiers',
    },
    guide: {
      intro:
        'Explore native components, ready-made variants, and optional customization.',
      familyTitle: '{{family}} · {{countLabel}}',
      usage: {
        title: 'Try, customize, compare.',
        body: 'Open a collection to browse ready-made variants without configuration. Open Customize when you want to combine settings. Component controls change actual native props; environment controls change appearance, tint, direction, width, and inset. Edit the JSON to apply a repeatable configuration. Reset restores both props and interaction state.',
      },
      boundaries: {
        title: 'Know the boundaries.',
        body: 'Platform and OS notes matter: SwiftUI renders on iOS, Compose on Android, and universal components have web fallbacks. Glass styles need newer iOS. Widget extensions cannot run inside Expo Go. The atlas covers documented app-use variations; not every combination of all native framework modifiers is represented.',
      },
      specimen: {
        title: 'Read a specimen.',
        body: 'A variant title names the setting being demonstrated. Related settings are enabled when needed—for example, line width uses a line chart. Presentation examples have an Open action so you can try the actual sheet or dialog. Reset restores that example’s starting settings.',
      },
      extension: {
        title: 'Built to extend.',
        body: 'Collections and controls use typed identifiers. Schemas declare allowed choices, defaults and numeric bounds; the same definitions produce ready-made variants and optional playground controls. Adding a choice therefore adds a comparison without duplicating the surrounding screen.',
      },
      resourcesTitle: 'About and support',
      privacyAction: 'Privacy policy',
      supportAction: 'Support',
      noticesAction: 'Open-source notices',
      docsTitle: 'Official documentation',
      docsAction: 'Open SDK {{sdkMajor}} Expo UI documentation',
    },
    reference: {
      attribution:
        'Official Expo documentation · SDK {{sdkVersion}} · Bundled {{date}} · Available offline',
      overview:
        'No dedicated component page is indexed for this collection in this SDK. The official family overview is available below.',
      openOfficial: 'Open official page ↗',
      missing: 'No bundled reference is available for this collection.',
      closeNotFound: 'Close this sheet and return to the catalog.',
    },
    examples: {
      reset: 'Reset example',
      viewRecipe: 'View recipe',
      hideRecipe: 'Hide recipe',
      liveControls: 'Live controls',
      localExperiment:
        'Change component props and the native environment. Your experiment stays local to this specimen.',
      renderError:
        'This specimen could not render. Check your Expo Go version, then reset to try again.',
      title: '{{index}}. {{title}}',
    },
    tuning: {
      nativeDefault: 'Native default',
      rangeLabel: '{{label}}: {{value}}',
      override: 'Override {{label}}',
    },
    legal: {
      shareNotices: 'Export dependency notices',
      notFoundTitle: 'Document not found',
      notFoundBody: 'Close this sheet and choose a document from Guide.',
    },
    configuration: {
      instructions:
        'Edit the values below, then apply. Unapplied edits stay until Apply or Reset. Unsupported keys and values are rejected.',
      apply: 'Apply configuration',
      applied: 'Configuration applied',
      invalidJson: 'Enter valid JSON.',
      objectRequired: 'Use a JSON object of control values.',
      unknownControl: 'Unknown control: {{id}}',
      unsupportedValue: 'Unsupported value for {{id}}',
      invalidValue: 'Invalid value for {{id}}',
    },
    environment: {
      appearance: 'Appearance',
      accent: 'Native tint / Material seed',
      direction: 'Layout direction',
      width: 'Preview width (%)',
      padding: 'Preview inset',
    },
    notFound: {
      title: 'Uncharted territory',
      body: 'This page does not exist.',
      back: 'Return to the atlas →',
    },
  },
} as const satisfies AppConfiguration;

type StringShape<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : StringShape<T[K]>;
};
export type TranslationCatalog = StringShape<typeof appConfig.messages>;
