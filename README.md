# Expo UI Atlas

A hands-on field guide to Expo UI: **65 collections across the source inventory** spanning universal components, direct SwiftUI, and direct Jetpack Compose. Each device shows only its supported collections: universal and SwiftUI on iOS, universal and Compose on Android, and universal on web. Search by component or behavior, filter by API and category, open live specimens, and customize a component when needed. Built with Expo UI and Expo Router native tabs (Catalog and Guide).

## Run

Requires Bun 1.3.14+ and Node.js 22 LTS (for Expo tooling).

```sh
bun install
bun start
```

Scan the terminal QR code with **Expo Go for SDK 58**. The project uses Expo SDK 58.0.14 and `@expo/ui` 58.0.20. All native dependencies are included in compatible Expo Go; there are no custom native modules and no development build is required.

**Expo Go distribution matters:** the iOS App Store version may lag SDK 58. Get a matching build through [expo.dev/go](https://expo.dev/go) and follow Expo's [version mismatch guide](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/). Physical iOS installation of newer Expo Go may require Apple's signing/distribution steps. An older Expo Go cannot load this SDK; do not downgrade only `expo` without reviewing Expo UI's APIs.

```sh
bun run web        # browser preview; direct native examples show availability notes
bun run ios        # optional: opens iOS simulator (only when you own that simulator)
bun run android    # optional: opens Android emulator/device
```

Universal examples use the root `@expo/ui` API; native examples use their direct SwiftUI/Compose imports. Web renders the universal package's own web implementations. It does not preview the native appearance. Native icons render only on iOS/Android.

## Explore

- **14 universal collections:** controls, text input/native state, lists, grouped forms, layout, scrolling, disclosure, sheets, icons, and host interop.
- **26 SwiftUI collections:** controls and modifiers, forms, menus, alerts, sheets/popovers, navigation stacks/split views/tabs, sharing, charts, shapes, grids, recycled stacks/lists, Liquid Glass, and interop.
- **25 Compose collections:** Material controls, chips, segmented buttons, progress, dialogs and date/time, sheets, anchored menus, search, navigation, carousels/pagers, recycled lists/refresh, tooltips/snackbars, palette and modifier playgrounds.

See [coverage](docs/coverage.md) for the complete inventory and the distinction between live components, compound slots, utilities, and specialized contexts. Widget-extension APIs cannot be hosted by Expo Go app content. Newer OS effects and worklet orchestration have explicit notes instead of simulated output.

Component details open to **Variants**: ready-made live examples for every listed enum choice and on/off state, with minimum/default/maximum samples for numeric settings. Scroll through the variants directly. **Customize** opens a separate native sheet to combine real props, modifiers, and environment settings. **Docs** opens bundled official Markdown in its own sheet. There are **277 component-specific controls** plus five shared preview controls. Optional native style ranges stay on **Native default** until Override is enabled. Edit/apply JSON to reproduce a configuration; unapplied drafts survive inspector changes, and Reset restores defaults. See the [variant matrix](docs/variants.md) for available knobs and scope limits; configurations currently stay in memory.

## Support, privacy and open source

Read the [support page](docs/support.md), [privacy policy](docs/privacy.md), and [open-source notices](docs/notices.md). The same documents are available offline in Guide. Original app code/assets use the [MIT license](LICENSE); bundled third-party content retains its own licenses. Contact [admin@biermancollective.com](mailto:admin@biermancollective.com) for support; do not send passwords or sensitive screenshots.

The repository is being prepared for public release. Follow the [publication checklist](docs/release/open-source.md) before changing visibility. The company website hosts the planned App Store [support](https://biermancollective.com/apps/expo-ui-atlas/support) and [privacy](https://biermancollective.com/apps/expo-ui-atlas/privacy) URLs independently of repository visibility. Verify those pages before submission.

## Ship to the App Store

The installed release runs independently of Expo Go and Metro. Start with the [Apple review and release runbook](docs/release/app-store.md), then use the prepared [listing copy and reviewer walkthrough](docs/release/metadata.md).

```sh
bunx eas-cli@23.2.0 build --platform ios --profile production
bunx eas-cli@23.2.0 submit --platform ios --profile production --id YOUR_VERIFIED_BUILD_ID
```

Before submission, verify the runbook's public support/privacy URLs, App Store Connect record, signing, release-device testing, and listing requirements. Uploading a build does not submit it for App Review or make it public. Production inherits the existing TestFlight store-distribution profile and uses remote, incrementing build numbers. No public launch or standalone production validation has been completed yet.

## Organization

```text
src/app/                         Thin Expo Router routes and app composition
src/pages/catalog/               Browse page slice (ui)
src/pages/playground/            Focused component workbench
src/pages/guide/                 API and usage guidance
src/pages/catalog-detail/        Detail page slice (ui)
src/pages/not-found/             Missing-route page slice (ui)
src/features/explore-examples/   Live specimens, typed tuning schemas, inspectors, reset/error UI
src/entities/catalog-entry/      Catalog model, metadata, inventory, and tests
src/shared/config/               Typed app settings and English-first translations
src/shared/ui/                   Context-free UI primitives
src/shared/theme/                Appearance tokens and hook
scripts/                        Inventory/report tooling and FSD boundary checks
```

Metadata never imports native renderers. Metro chooses `index.ios.tsx` / `index.android.tsx`; the fallback exports no native examples. Unsupported-platform details explain availability. A per-specimen React error boundary can recover JS render errors; it cannot intercept native crashes.

## App settings and language

`src/shared/config/app-config.ts` centralizes navigation, sheet sizes, gallery batching, preview settings, documentation links, and English app copy. UI uses typed `useTranslation()` keys; non-React validation uses `i18n.t()`. English is the initial and fallback language.

To add a language, define its messages with `satisfies TranslationCatalog`, add its locale to `AppLocale`, and register the catalog in the i18next resources in `src/shared/config/i18n.ts`. The catalog type requires the same message structure; typed keys and interpolation parameters catch mismatches. Specimen content, API names/options, code samples, and bundled original Expo documentation remain unchanged.

## Quality checks

```sh
bun run check
bun run typecheck
bun test
bunx expo install --check
bunx expo-doctor
bunx expo export --platform all
```

CI runs Biome, React Native ESLint rules, types, tests, dependency alignment, and all-platform bundles. Native Maestro flows are in [.maestro](.maestro/README.md) and require an explicit dedicated device. Tests enforce FSD layer/public-API boundaries and catch search/filter errors, missing IDs, platform metadata regressions, SDK export drift, and metadata/renderer registration mismatches.

Validation includes unit tests, inspector-schema configuration round trips, all three platform bundles, and browser interaction checks. Native Maestro checks use a dedicated iOS simulator so other sessions' devices remain untouched. The flows exercise search recovery, button interaction/reset, documentation sheets, customization with the keyboard open, and navigation/scroll reachability. These focused checks do not exercise every native specimen or replace Android device testing. Use the broader checklist in [coverage](docs/coverage.md#device-smoke-checklist).

See [CONTRIBUTING.md](CONTRIBUTING.md) to extend the catalog and [architecture](docs/architecture.md) for Feature-Sliced Design boundaries.

Types, enum identifiers, shared tokens and control-definition conventions are documented in [code conventions](docs/code-conventions.md). The app’s Guide also includes original explanations of specimen behavior and extension points. TypeScript checks indexed access and overrides; Biome rejects explicit `any` and unused declarations.

Public legal documents are authored in `docs/`. After editing, run `bun run legal:sync`; CI rejects drift between public Markdown and bundled copies. Full installed dependency notices are bundled for native export rather than rendering hundreds of documents together.
