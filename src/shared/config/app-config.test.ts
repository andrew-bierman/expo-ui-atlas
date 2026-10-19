import { expect, test } from 'bun:test';
import expoPackage from 'expo/package.json';
import { appConfig, GuideSection, TabRoute } from './app-config';
import { i18n } from './i18n';

test('configured tabs are unique, complete, and have translated labels', () => {
  const routes = appConfig.navigation.tabs.map((tab) => tab.route);
  expect(new Set(routes).size).toBe(routes.length);
  expect([...routes].sort()).toEqual(Object.values(TabRoute).sort());
  for (const tab of appConfig.navigation.tabs) {
    expect(i18n.exists(tab.labelKey)).toBe(true);
    expect<string>(i18n.t(tab.labelKey)).not.toBe(tab.labelKey);
  }
});

test('guide ordering covers every section once with usable English content', () => {
  const sections = appConfig.guide.sectionOrder;
  expect(new Set(sections).size).toBe(sections.length);
  expect([...sections].sort()).toEqual(Object.values(GuideSection).sort());
  for (const section of sections) {
    expect(appConfig.messages.guide[section].title.length).toBeGreaterThan(0);
    expect(appConfig.messages.guide[section].body.length).toBeGreaterThan(0);
  }
});

test('official documentation stays pinned to the installed Expo SDK major', () => {
  const sdkMajor = Number.parseInt(
    appConfig.documentation.sdkVersion,
    10,
  ).toString();
  expect(sdkMajor).toBe(Number.parseInt(expoPackage.version, 10).toString());
  const url = new URL(appConfig.documentation.overviewUrl);
  expect(url.origin).toBe('https://docs.expo.dev');
  expect(url.pathname).toBe(
    `/versions/v${appConfig.documentation.sdkVersion}/sdk/ui/`,
  );
  expect<string>(i18n.t('guide.docsAction', { sdkMajor })).toBe(
    `Open SDK ${sdkMajor} Expo UI documentation`,
  );
});

test('preview defaults are reachable by their configured slider steps', () => {
  for (const range of [appConfig.preview.width, appConfig.preview.padding]) {
    expect(range.step).toBeGreaterThan(0);
    expect(range.max).toBeGreaterThan(range.min);
    expect(range.defaultValue).toBeGreaterThanOrEqual(range.min);
    expect(range.defaultValue).toBeLessThanOrEqual(range.max);
    expect((range.defaultValue - range.min) % range.step).toBe(0);
  }
});

test('shared Guide and environment copy does not advertise another native platform', () => {
  const sharedCopy = [
    appConfig.messages.families.universal.description,
    ...Object.values(appConfig.messages.guide).flatMap((value) =>
      typeof value === 'string' ? [value] : Object.values(value),
    ),
    ...Object.values(appConfig.messages.environment),
  ].join(' ');
  expect(sharedCopy).not.toMatch(
    /\bandroid\b|jetpack[\s/-]+compose|\bios\b|swift[\s/-]*ui/i,
  );
});
