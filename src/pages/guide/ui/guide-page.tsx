import { Button, FieldGroup, Host, Text } from '@expo/ui';
import { Linking } from 'react-native';
import { catalog, Family } from '../../../entities/catalog-entry';
import { appConfig, useTranslation } from '../../../shared/config';
export function GuidePage() {
  const { t } = useTranslation();
  return (
    <Host style={{ flex: 1 }}>
      <FieldGroup>
        <FieldGroup.Section title={appConfig.name}>
          <Text>{t('guide.intro')}</Text>
        </FieldGroup.Section>
        {Object.values(Family).map((family) => (
          <FieldGroup.Section
            key={family}
            title={t('guide.familyTitle', {
              family: t(`families.${family}.label`),
              countLabel: t('catalog.collections', {
                count: catalog.filter((entry) => entry.family === family)
                  .length,
              }),
            })}
          >
            <Text>{t(`families.${family}.description`)}</Text>
          </FieldGroup.Section>
        ))}
        {appConfig.guide.sectionOrder.map((section) => (
          <FieldGroup.Section key={section} title={t(`guide.${section}.title`)}>
            <Text>{t(`guide.${section}.body`)}</Text>
          </FieldGroup.Section>
        ))}
        <FieldGroup.Section title={t('guide.docsTitle')}>
          <Button
            label={t('guide.docsAction', {
              sdkMajor: Number.parseInt(
                appConfig.documentation.sdkVersion,
                10,
              ).toString(),
            })}
            onPress={() => {
              void Linking.openURL(appConfig.documentation.overviewUrl);
            }}
          />
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}
