# Next update draft

Status: prepared for the next release. Version and build number are not assigned. Leave the submitted 1.0.0 (7) release unchanged.

## Privacy policy alignment

Use the existing Bierman Collective privacy policy at <https://biermancollective.com/privacy-policy>, following the shared-policy approach used by Perdiem and Prysm. Keep Atlas's **Data Not Collected** declaration; this update changes policy organization and links, not app data handling.

- Check that the shared policy accurately describes Atlas’s no-collection behavior before changing bundled wording or redirecting the existing URL.
- Update the typed privacy URL in `src/shared/config/app-config.ts` and align Guide's privacy access and bundled wording with the shared policy.
- Update the App Store Connect and TestFlight privacy URLs for the next release.
- Keep the existing `/apps/expo-ui-atlas/privacy` URL working for installed build 7 and existing links; redirect it to the shared policy when the alignment is ready.
- Check the in-app policy link and public destinations on the next TestFlight build. Preserve the app's factual no-account, no-advertising, no-analytics, no-tracking and no-data-collection statements.

Do not change other apps' privacy declarations or rewrite the company policy as part of this link cleanup.

## Next Expo SDK upgrade

At the next Expo SDK bump, inspect the official version-matched documentation and installed `@expo/ui` types before selecting the new scope. Reconcile added and changed universal, SwiftUI and Jetpack Compose exports with the catalog inventory.

- Extend the configuration-driven catalog with newly available components and meaningful ready-made variants, states and interactions; keep optional customization as a playground.
- Refresh bundled reference Markdown for the upgraded SDK and regenerate the coverage report after reconciling new or changed APIs.
- Verify Expo Go compatibility, platform-isolated native imports and the appropriate iOS/Android examples against the upgraded SDK.
- Preserve native defaults, Feature-Sliced Design, strong types and the existing no-custom-native-module constraint.

This is future upgrade scope; no Expo upgrade or additional component implementation is part of this draft.

## Draft What's New

Planned: align privacy-policy links with the shared Bierman Collective policy while keeping Expo UI Atlas’s Data Not Collected declaration unchanged.

At the next Expo SDK upgrade, expand the native UI catalog with newly available components and interactive variants. Final release notes should name only additions actually implemented and verified for that release.

## App Store draft

Create the next version's App Store Connect draft after 1.0.0 reaches Ready for Distribution. Apple requires that state before starting a new version: [Create a new version](https://developer.apple.com/help/app-store-connect/update-your-app/create-a-new-version).

This document is the prepared update draft; a future App Store version has not been created or submitted.
