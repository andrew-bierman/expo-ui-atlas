import type { UniversalHostProps } from '@expo/ui';

export const nativeDefault = 'system';

export function resolveHostEnvironment(
  appearance: string,
  accent: string,
  direction: string,
): Pick<UniversalHostProps, 'colorScheme' | 'seedColor' | 'layoutDirection'> {
  return {
    colorScheme:
      appearance === 'light' || appearance === 'dark' ? appearance : undefined,
    seedColor: accent === nativeDefault ? undefined : accent,
    layoutDirection:
      direction === 'leftToRight' || direction === 'rightToLeft'
        ? direction
        : undefined,
  };
}
