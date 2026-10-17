import { expect, test } from 'bun:test';
import { AppLocale, appConfig, type TranslationCatalog } from './app-config';
import { i18n, type MessageKey } from './i18n';

test('English is ready synchronously and remains the only bundled locale', () => {
  expect(i18n.isInitialized).toBe(true);
  expect(i18n.language).toBe(AppLocale.English);
  expect(Object.keys(i18n.store.data)).toEqual([AppLocale.English]);
});

test('an unavailable locale falls back to English without changing app language', () => {
  const translate = i18n.getFixedT('unavailable-locale');
  expect<string>(translate('navigation.catalog')).toBe('Catalog');
  expect<string>(translate('catalog.collections', { count: 2 })).toBe(
    '2 collections',
  );
  expect(i18n.language).toBe(AppLocale.English);
});

test('collection counts use English singular and plural rules', () => {
  expect<string>(i18n.t('catalog.collections', { count: 0 })).toBe(
    '0 collections',
  );
  expect<string>(i18n.t('catalog.collections', { count: 1 })).toBe(
    '1 collection',
  );
  expect<string>(i18n.t('catalog.collections', { count: 65 })).toBe(
    '65 collections',
  );
});

test('interpolation preserves native text and resolves nested contextual labels', () => {
  expect<string>(
    i18n.t('navigation.customizeTitle', { name: 'Button & <Text>' }),
  ).toBe('Customize Button & <Text>');
  expect<string>(
    i18n.t('guide.familyTitle', {
      family: 'SwiftUI',
      countLabel: i18n.t('catalog.collections', { count: 26 }),
    }),
  ).toBe('SwiftUI · 26 collections');
  expect<string>(
    i18n.t('configuration.unknownControl', { id: 'unsupported' }),
  ).toBe('Unknown control: unsupported');
});

// Compile-only checks: these invalid calls must never execute at runtime.
function checkTranslationContract() {
  const validKey: MessageKey = 'navigation.catalog';
  const completeCatalog: TranslationCatalog = appConfig.messages;
  void validKey;
  void completeCatalog;
  // @ts-expect-error Missing message keys are rejected.
  i18n.t('navigation.missing');
  // @ts-expect-error A default value must not bypass strict key checks.
  i18n.t('navigation.missing', { defaultValue: 'Missing' });
  // @ts-expect-error Interpolated messages require their named value.
  i18n.t('navigation.customizeTitle', { wrongName: 'Button' });
  const incompleteCatalog = { ...appConfig.messages, categories: {} };
  // @ts-expect-error Additional locales must provide the complete category schema.
  const invalidCatalog: TranslationCatalog = incompleteCatalog;
  void invalidCatalog;
}
void checkTranslationContract;
