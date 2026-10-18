# iOS release and Apple review

Prepared October 17, 2026. This is a submission runbook, not a record of Apple approval. Public release has not been requested or performed.

## Current readiness

| Area | Status |
| --- | --- |
| App identity | Expo UI Atlas 1.0.0; `com.andrewbierman.expouiatlas`; personal EAS owner `andrewbierman` |
| EAS | Linked project `0ca59813-75c5-4dbe-a187-e038edf508d1`; store-distribution profiles; remote build numbers |
| Icon | Original control-catalog artwork; opaque 1024 × 1024 iPhone/iPad icon renditions verified in the signed archive |
| Code checks | 46 unit tests / 2,991 assertions, lint, types, legal drift and all-platform exports passed for the native-notice fix; prior React Doctor score 100/100 |
| Store build | Apple accepted 1.0.0 (5); build 6 was held for missing native notices; corrected production build 7 from `394113c` passed signed archive inspection and Apple processing (`VALID` / ready for beta testing) |
| Device coverage | Standalone Release from the final source tree contains all seven native notices; all six regression families passed across complete runs on both iPhone and iPad, with documented test synchronization/geometry adaptations; signed physical-device validation remains |
| Public URLs | Company support/privacy targets use the business email; reviewed website pages remain unpublished pending owner approval; bundled in-app access implemented |
| Listing | Version 1.0.0 metadata, category, age rating, free worldwide availability and manual release saved; six iPhone and six iPad screenshots saved and read back; build 7 selected and saved; final declarations remain |
| Content rights and notices | App/Expo documentation notices and dependency export are bundled; all seven pinned native prebuilt notices verified in build 7's signed archive; owner content-rights declaration remains unset |

## App Store Connect setup receipt — October 17, 2026

The app record exists under Bierman Collective LLC with limited app access. Version 1.0.0 is **Prepare for Submission**, with manual release selected and sign-in requirements disabled. Description, promotional text, keywords, copyright and reviewer walkthrough are saved. App Information has the subtitle “Explore native UI controls,” Developer Tools as the primary category, and the calculated 4+ age rating. Pricing is free in all storefronts; availability is configured for all 175 countries/regions on release. Apple Silicon Mac and Vision Pro availability are disabled for the initial iPhone/iPad release.

TestFlight beta description and reviewer walkthrough are saved; review contacts are filled in App Store Connect and TestFlight from the existing Perdiem company contact. The public business support email is documented; the review phone remains omitted from this repository. The version's Support URL points to the company page, and its optional Marketing URL is blank while the repository remains private. TestFlight rejected a blank Marketing URL, so its required field now uses the public company homepage (`https://biermancollective.com`), with a confirmed saved state. The TestFlight and App Store privacy URLs still need their final company-hosted targets after publication. The TestFlight tester list currently shows zero testers and no internal group; Apple acceptance alone will not make the app available on the owner's phone. Creating a group or inviting a tester requires owner authorization under the current release scope.

Support and privacy targets use company-hosted pages; verify their deployment before submission. The optional repository marketing URL remains unavailable while the repository is private. Privacy-label publication and the content-rights declaration remain outstanding. No version has been submitted to App Review or released.

EAS can read the record with its existing managed App Store Connect API key. Early build attempts stopped during signing setup after expired certificates and an Apple ID account-lock error. With owner approval, a new distribution certificate and the Atlas App Store provisioning profile were created and uploaded to EAS. The certificate expires October 17, 2027. No other certificates were changed. Keep CSR/private keys, certificate bundles, provisioning profiles and local `credentials.json` outside version control; the temporary credentials file was deleted after remote upload.

Build 4 (`6b77749f-2815-41c8-a53a-25e63cdeffca`) failed during credential import. Re-exporting the same authorized certificate/key in a macOS-compatible PKCS#12 format fixed the importer; no replacement certificate or revocation was needed. Signed build 5 (`31092c26-a292-4c9d-82b8-07482caa6b32`) passed archive inspection and Apple processing (`VALID`). This establishes Apple acceptance, not a physical-device installation or public release. Build 6 (`9300a508-3cb2-4c8a-9c36-2995a37e58b9`) passed signing/icon/privacy checks but was held from upload after seven missing upstream native notices were found.

Corrected production build [`6616dcaa-921d-499e-b7e1-02c7e64458be`](https://expo.dev/accounts/andrewbierman/projects/expo-ui-atlas/builds/6616dcaa-921d-499e-b7e1-02c7e64458be) finished from merged source `394113c267c545a455c0c1452bd870e261d10bdc` for 1.0.0 (7). Its signed archive passed strict/deep code-signature verification, App Store identity/profile/entitlement checks, opaque 1024-pixel iPhone/iPad icon inspection and all 11 privacy-manifest checks. The complete offline dependency notice document, all seven original native notices and all three bundled legal pages are present in the embedded Hermes bundle, checked as complete text rather than name markers. All six focused regression families passed on matching-source iPhone/iPad Release simulators; EAS submission `aeaa7d0b-970f-4e82-a7fb-489b1be6db3c` finished, and Apple reports this exact build `VALID`, internally `READY_FOR_BETA_TESTING`, externally `READY_FOR_BETA_SUBMISSION`, and not expired. Monitor this exact ID; do not submit the held build 6 or use `--latest`.

The version page shows six saved screenshots for iPhone Dynamic Island medium (1206 × 2622) and six for iPad 13-inch (2064 × 2752), captured from the standalone app. Both sets were read back in App Store Connect. Build 7 is selected for version 1.0.0, saved and read back after a full page reload; the version remains Prepare for Submission with manual release. The privacy questionnaire has a saved **Data Not Collected** draft, not a published label; the company policy pages and owner content-rights answer remain outstanding.

Unsigned standalone Release validation and screenshots completed on iPhone and iPad simulators from source `3076996`; the validation worktree records the evidence in `artifacts/app-store/VALIDATION.md`. A subsequent Release build from `5f140926` succeeded; its tree is identical to merged `394113c`, and its embedded Hermes bundle contains the complete dependency notice document plus all seven native notices. New evidence lives under `artifacts/final-source-validation/`; all six regression families have passing complete executions on both devices. Initial automation failures and the transition/geometry adaptations remain recorded beside the successful replays. These simulator checks do not establish signed physical-device behavior or exhaustive specimen coverage. The dated iOS source-map audit described in [the open-source checklist](open-source.md) found no executable modules for the three installed dependencies with unresolved notices (`client-only`, `server-only`, and `tr46`); this is evidence for that export, not a permanent exclusion guarantee. Build 7's signed archive review is complete; signed physical-device validation, public support/privacy hosting and owner declarations remain pending.

## 1. Finish the release inputs

- Confirm the App Store name is available. This is an independent developer utility, not an official Expo or Apple product. Obtain permission for third-party branding where needed; an attribution sentence does not grant trademark rights. See [Apple 4.1 and 5.2](https://developer.apple.com/app-store/review/guidelines/).
- Publish the [privacy policy](../privacy.md) and [support page](../support.md) at the [company website URLs](open-source.md). Guide provides bundled offline access to both pages. Verify the external URLs in a signed-out browser after website deployment. Repository visibility does not control these company pages. Apple requires both the metadata URL and in-app access: [5.1.1](https://developer.apple.com/app-store/review/guidelines/#privacy).
- Follow the [public repository checklist](open-source.md), including the personal Apple-login email still present in old history, before changing repository visibility.
- Confirm distribution rights/notices for bundled documentation, dependencies, fonts and artwork. The Docs sheet includes the Expo documentation notice; verify it remains in the final binary. The offline dependency export now includes the seven original upstream notices for RN 0.88.0's prebuilt native constituents, supplementing the npm graph and existing RN/Hermes root notices. Confirm the rebuilt archive retains that export and the expected native framework inventory. The original app source is MIT-licensed; preserve its license and bundled third-party notices.
- Choose price, storefronts, copyright holder, reviewer contact name/email/phone, and App Store Connect age-rating answers. Never put signing keys, Apple passwords or private contact fields into source control.

## 2. Create or select the App Store Connect record

The existing [Expo UI Atlas record](https://appstoreconnect.apple.com/apps/6824046567/distribution) uses Apple ID `6824046567`, team `666HGMV2LU`, English (U.S.) and SKU `expo-ui-atlas-ios`. Preserve it. Both submit profiles target this record through `submit.testflight.ios` in `eas.json`; production inherits those identifiers. The numeric Apple ID is not the bundle identifier or Apple account email.

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
