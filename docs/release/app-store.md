# iOS release and Apple review

Prepared October 17, 2026. This is a submission runbook, not a record of Apple approval. Public release has not been requested or performed.

## Current readiness

| Area | Status |
| --- | --- |
| App identity | Expo UI Atlas 1.0.0; `com.andrewbierman.expouiatlas`; personal EAS owner `andrewbierman` |
| EAS | Linked project `0ca59813-75c5-4dbe-a187-e038edf508d1`; store-distribution profiles; remote build numbers |
| Icon | Existing 1024 × 1024 PNG is opaque but uses template-style Expo/A artwork; replace with original artwork or confirm usage rights before submission |
| Code checks | Previous commit: 42 unit tests, all platform exports, five focused iOS Maestro flows; CI green |
| Store build | No iOS EAS builds returned for the linked project during this audit; no standalone release archive verified |
| Device coverage | iPhone simulator / Expo Go verified; standalone physical iPhone and iPad checks still required |
| Public URLs | Support and privacy hosting/contact details still required; private repository links are unsuitable |
| Listing | Copy and reviewer walkthrough prepared in [metadata.md](metadata.md); screenshots and App Store Connect fields still required |
| Third-party content | Expo documentation license is bundled and shown at the end of Docs sheets; full dependency-notice/archive audit remains |

## 1. Finish the release inputs

- Confirm the App Store name is available. This is an independent developer utility, not an official Expo or Apple product. Obtain permission for third-party branding where needed; an attribution sentence does not grant trademark rights. See [Apple 4.1 and 5.2](https://developer.apple.com/app-store/review/guidelines/).
- Publish the reviewed [privacy policy draft](privacy-policy.md) and [support page draft](support.md) on stable, public HTTPS URLs without login. Replace every bracketed publishing instruction first. Add an easily accessible privacy-policy link inside the app, such as Guide → Privacy. This remains a release blocker until the URL is known and wired up. Apple requires both the metadata URL and in-app access: [5.1.1](https://developer.apple.com/app-store/review/guidelines/#privacy).
- Confirm distribution rights/notices for bundled documentation, dependencies, fonts and artwork. The Docs sheet includes the Expo documentation notice; verify it remains in the final binary. Do not add a license to the original app source without the owner's decision.
- Choose price, storefronts, copyright holder, reviewer contact name/email/phone, and App Store Connect age-rating answers. Never put signing keys, Apple passwords or private contact fields into source control.

## 2. Create or select the App Store Connect record

In [App Store Connect](https://appstoreconnect.apple.com), create an iOS app using the existing bundle ID, English (U.S.), and a unique SKU such as `expo-ui-atlas-ios`. Preserve an existing record if one exists. Copy its numeric **Apple ID** into `submit.production.ios.ascAppId` in `eas.json` so later uploads target that exact record. This ID is not the bundle identifier or Apple account email.

Complete App Information, Developer Tools category, age-rating questionnaire, pricing/availability, content-rights answers, and applicable agreements/tax/banking setup. iPad support is currently enabled; keep it and test it rather than silently disabling an advertised platform.

## 3. Run local release checks

```sh
bun install --frozen-lockfile
bun run check
bun run typecheck
bun test
bunx expo install --check
bunx expo-doctor
bunx expo export --platform all
MAESTRO_DEVICE_ID=YOUR_DEDICATED_DEVICE_UUID bun run test:e2e
```

Read [.maestro/README.md](../../.maestro/README.md) before native tests. Never select a simulator owned by another session. Run the [device checklist](../coverage.md#device-smoke-checklist) on a physical iPhone and an iPad, including rotation, large text, VoiceOver, light/dark appearance, long catalog scrolling, every iOS presentation family, and docs/customization sheets. Current automated flows are focused regressions, not exhaustive coverage of all specimens.

## 4. Build a standalone release

```sh
bunx eas-cli@23.2.0 whoami
bunx eas-cli@23.2.0 build --platform ios --profile production
```

The production profile inherits the existing store-distribution TestFlight profile. Remote versioning and `autoIncrement` supply unique build numbers. Preserve the EAS project and bundle ID. Cloud builds consume EAS plan resources. Do not add `expo-dev-client` or require Expo Go for the submitted app.

Save the returned build ID, source commit, app version/build number, EAS URL and toolchain. Verify the build image meets Apple's [current upload requirements](https://developer.apple.com/news/upcoming-requirements/) at build time; don't assume SDK 58 or a passing JavaScript export proves native upload eligibility. Verify the archive's bundle ID, version/build, icon, deployment target, entitlements, required-reason privacy manifests and export-compliance declaration. `ITSAppUsesNonExemptEncryption: false` is configured; confirm it still matches the final binary and dependencies before answering Apple's questionnaire.

## 5. Upload the exact build and test it

```sh
bunx eas-cli@23.2.0 submit --platform ios --profile production --id YOUR_VERIFIED_BUILD_ID
```

Do not use `--latest` when multiple builds might exist. Upload is not submission to App Review. Wait for Apple processing, resolve compliance notices, assign the intended TestFlight group, then install that exact build. Verify launch with Metro stopped and no Expo Go installed/required, plus airplane-mode catalog/examples/bundled docs. Online links and unbundled remote documentation media need connectivity. Do not use personal information in sample fields or screenshots. Reuse this processed build for App Review if no code or configuration changes are needed. See [Expo's iOS submission guide](https://docs.expo.dev/submit/ios/).

## 6. Complete the listing

Use [metadata.md](metadata.md). App Store Connect needs description, keywords, support/privacy URLs, screenshot sets, category, copyright, review contact and privacy/age-rating declarations. Answer the actual current questionnaires; don't infer an age rating or privacy label solely from this draft.

Capture the standalone app, with no Expo Go tools, developer banners, keyboard debug UI or personal data. Suggested sequence: catalog/search, interactive button variants, Customize, SwiftUI controls/charts, offline Docs. Screenshots must match the shipped iOS experience; don't use Android screens to imply Compose renders on iOS. Supply iPhone screenshots in one of Apple's accepted primary display sizes and 13-inch iPad screenshots because `supportsTablet` is true. Use the [live screenshot matrix](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/) instead of resizing arbitrary simulator captures. At audit time accepted portrait examples include iPhone 1260 × 2736 and iPad 2064 × 2752 or 2048 × 2732; choose sizes matching actual capture devices and validate in Connect.

The suggested privacy answer is **Data Not Collected** only after checking the final production binary/SDKs and hosted services against [Apple's definitions](https://developer.apple.com/app-store/app-privacy-details/). The source currently has no account, advertising, analytics, backend or cloud configuration sync. Local sample inputs and OS share sheets are not a hosted user-content service. External docs/media can contact third-party hosts; audit those separately and ensure the policy matches actual behavior.

## 7. Submit for review

Select version 1.0.0 and the exact processed build. Paste the reviewer notes and walkthrough from [metadata.md](metadata.md); no login or demo credentials are required. Add real reviewer contact details. Choose **manual release** for this first launch so approval does not publish automatically.

Resolve all outstanding fields, click **Add for Review**, inspect the submission, then **Submit for Review**. Adding a draft alone does not send it. Follow [Apple's submission steps](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app/). Respond to Resolution Center questions with the exact navigation path, device/OS, and a video if useful. Don't claim the catalog is an official SDK or that every native modifier combination is covered.

This is a complete interactive developer reference, but [2.2 and 4.2](https://developer.apple.com/app-store/review/guidelines/) deserve attention: Apple distinguishes complete utilities from unfinished demos and thin documentation wrappers. The review notes should demonstrate the app's lasting interactive utility honestly. Describing an unfinished product differently does not fix a completeness problem, and approval cannot be guaranteed.

## 8. Release after approval

For manual release, wait for **Pending Developer Release**, then explicitly choose **Release This Version** when ready. Verify actual availability in the intended storefronts before calling the app live. Record the approved version/build, source commit, release date and public App Store URL. See [release options](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/select-an-app-store-version-release-option/).
