import { FieldGroup, Host, ListItem, Text } from '@expo/ui';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import { catalog, Family } from '../../../entities/catalog-entry';
import { appConfig, useTranslation } from '../../../shared/config';
import { LegalDocumentId } from '../../../shared/legal';

const resourceLabels = {
  [LegalDocumentId.Privacy]: 'guide.privacyAction',
  [LegalDocumentId.Support]: 'guide.supportAction',
  [LegalDocumentId.Notices]: 'guide.noticesAction',
} as const;

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
          <ListItem
            onPress={() => {
              void Linking.openURL(appConfig.documentation.overviewUrl);
            }}
          >
            {t('guide.docsAction', {
              sdkMajor: Number.parseInt(
                appConfig.documentation.sdkVersion,
                10,
              ).toString(),
            })}
          </ListItem>
        </FieldGroup.Section>
        <FieldGroup.Section title={t('guide.resourcesTitle')}>
          {Object.values(LegalDocumentId).map((document) => (
            <ListItem
              key={document}
              testID={`guide-${document}`}
              onPress={() => router.push(`/legal/${document}`)}
            >
              {t(resourceLabels[document])}
            </ListItem>
          ))}
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}
