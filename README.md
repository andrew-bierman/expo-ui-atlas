# Expo UI Atlas

A hands-on field guide to Expo UI: **65 collections** spanning universal components, direct SwiftUI, and direct Jetpack Compose. Search by component or behavior, filter by API and category, open live specimens, and reset each experiment independently.

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

## Organization

```text
src/app/                    Expo Router browse and detail routes
src/catalog/                Serializable metadata, search, export inventory, tests
src/components/             Shared example card, reset/error boundary, UI primitives
src/examples/universal/     Focused live universal specimens
src/examples/native/        Platform entrypoints and focused native specimens
src/theme/                  Catalog appearance tokens
scripts/ui-inventory.ts     Reads public runtime exports from installed types
```

Metadata never imports native renderers. Metro chooses `index.ios.tsx` / `index.android.tsx`; the fallback exports no native examples. Unsupported-platform details explain availability. A per-specimen React error boundary can recover JS render errors; it cannot intercept native crashes.

## Quality checks

```sh
bun run check
bun run typecheck
bun test
bunx expo install --check
bunx expo-doctor
bunx expo export --platform all
```

CI runs formatting/lint, types, tests, dependency alignment, and all-platform bundles. Tests catch search/filter errors, missing IDs, platform metadata regressions, SDK export drift, and metadata/renderer registration mismatches.

Initial validation included all three platform bundles and desktop/mobile browser interaction checks. **Native runtime testing remains a device check:** no simulator was operated because another Codex session was using simulators. Bundling and types do not prove native presentation or gesture behavior. Use the checklist in [coverage](docs/coverage.md#device-smoke-checklist).

See [CONTRIBUTING.md](CONTRIBUTING.md) to extend the catalog.
