import { createInstance, type ParseKeys } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { appConfig } from './app-config';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    strictKeyChecks: true;
    returnNull: false;
    resources: { translation: typeof appConfig.messages };
  }
}

export const i18n = createInstance();
void i18n.use(initReactI18next).init({
  lng: appConfig.localization.defaultLocale,
  fallbackLng: appConfig.localization.fallbackLocale,
  defaultNS: 'translation',
  resources: {
    [appConfig.localization.defaultLocale]: { translation: appConfig.messages },
  },
  initAsync: false,
  returnNull: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export { useTranslation };
export type MessageKey = ParseKeys;
