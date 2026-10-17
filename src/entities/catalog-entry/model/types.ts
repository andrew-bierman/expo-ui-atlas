export type Family = 'universal' | 'swiftui' | 'compose';
export type Category =
  | 'Actions'
  | 'Inputs'
  | 'Selection'
  | 'Feedback'
  | 'Presentation'
  | 'Content'
  | 'Layout'
  | 'Navigation'
  | 'Modifiers';
export type CatalogPlatform = 'ios' | 'android' | 'web';
export interface CatalogEntry {
  id: string;
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
  universal: {
    label: 'Universal',
    short: 'U',
    color: '#246b4d',
    description: 'One API. Native on iOS and Android, with web fallbacks.',
  },
  swiftui: {
    label: 'SwiftUI',
    short: 'S',
    color: '#ad4b2c',
    description: 'Direct access to Apple’s native controls and modifiers.',
  },
  compose: {
    label: 'Compose',
    short: 'C',
    color: '#6552a3',
    description: 'Direct Jetpack Compose and Material components on Android.',
  },
} as const;
export const categories: Category[] = [
  'Actions',
  'Inputs',
  'Selection',
  'Feedback',
  'Presentation',
  'Content',
  'Layout',
  'Navigation',
  'Modifiers',
];
