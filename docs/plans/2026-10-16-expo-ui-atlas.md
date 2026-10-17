---
title: Expo UI Atlas
date: 2026-10-16
type: feat
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---
# Expo UI Atlas

## Goal Capsule

Let a developer explore how Expo UI looks and behaves on their device and compare its universal and native APIs.
Means: a registry-driven Expo catalog (KTD2).
Authority: user request, this plan, version-matched official docs and installed types.
Execution: autonomous implementation and PR; merging stays with the user. Do not operate existing simulators, native builds, or unrelated projects.
Stop if built-in Expo UI cannot support an agreed requirement without custom native modules.

## Product Contract

### Summary

Create a private personal repository named `expo-ui-atlas` with a polished, extensible interactive catalog.

### Problem Frame

Component names and screenshots do not tell a developer how native controls behave or which API exposes an interaction.

### Requirements

- R1. Use TypeScript, Bun, Biome, and an Expo template; keep dependencies small and use only Expo Go supported native modules.
- R2. Browse by API family and category, search by component or behavior, and open dedicated detail pages with live examples and descriptive variation labels.
- R3. Cover the installed universal UI inventory and direct SwiftUI/Compose areas: actions, input and selection, feedback, presentation, content, layout, navigation, and modifiers. Account explicitly for components requiring a particular host context or OS rather than silently omitting them.
- R4. Isolate native imports by platform. Other platforms can read metadata and availability information without loading the wrong native implementation.
- R5. Examples maintain local state, expose meaningful styles/states/modifiers, explain what to try, and can be reset. Label API family, platform, and relevant runtime limits.
- R6. Make additions require metadata and an example module, with shared navigation and surrounding UI. Include contributor instructions and an inventory audit.
- R7. Validate types, formatting/lint, catalog integrity, Expo dependency compatibility, and iOS/Android/web bundling; browser smoke-test the web-safe shell. Report native runtime verification limits honestly.

### Acceptance Examples

- AE1. Search `slider`, select Universal, open the result, change the value, see state update, then reset it.
- AE2. On Android, a SwiftUI result explains iOS availability and does not import SwiftUI code; the inverse holds on iOS.
- AE3. An unknown detail URL produces a useful not-found screen with a route back to browse.
- AE4. An empty search has a clear empty state and reset action. Long names and narrow screens remain usable.

### Scope Boundaries

No custom native modules, backend, accounts, production deployment, or simulator ownership changes. Drop-in replacement APIs and widget-only contexts may be documented as context-specific rather than rendered in an unsuitable normal app tree.

## Planning Contract

### Key Technical Decisions

- KTD1. Pin Expo SDK 58 and compatible Expo UI. Registry currently publishes Expo 58.0.14 and UI 58.0.20, and official SDK 58 docs mark UI included in Expo Go. Use matching Expo Go from expo.dev/go; stock iOS App Store Go version may lag. Do not substitute a development build.
- KTD2. Keep serializable catalog metadata separate from platform example renderers. Expo Router owns browse/detail URLs; a small shared design system provides cards, badges, empty states, example boundaries, and reset. This avoids duplicating navigation when adding components.
- KTD3. Use `.ios.tsx`, `.android.tsx`, and web fallback modules for direct native APIs. Every native tree gets its matching Host; bounded native scrolling/list examples receive explicit dimensions, and host bridges wrap React Native content.
- KTD4. Build the shell with React Native primitives for reliable navigation, accessibility, responsive web preview, and dark/light appearance. Live specimens use the actual Expo UI APIs, never imitation controls.
- KTD5. Keep examples grouped into focused modules by family and category. Prefer small component functions with local state over a single condition-heavy screen. Catalog metadata records actual covered exports and variation descriptions; tests compare it to checked-in inventory derived from the installed package.

### Sequencing

Foundation → metadata and browse/detail shell → universal examples → native examples → inventory and verification. Platform implementation can be delegated in bounded independent files after installed API inspection.

### Risks and Dependencies

Expo UI APIs change quickly; inspect installed source/types before authoring each family. Native-only runtime issues cannot be ruled out by web testing; perform static imports and bundles for each target and document device smoke steps. Avoid the other Codex session's simulators entirely.

Sources: https://docs.expo.dev/versions/v58.0.0/sdk/ui/ ; https://docs.expo.dev/versions/v58.0.0/sdk/ui/universal/ ; https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ . No existing project architecture exists in this new checkout.

## Implementation Units

### U1. Foundation and navigation

Files: `package.json`, `app.json`, `biome.json`, `src/app/`, `src/catalog/`, `src/components/`, `src/theme/`, `.github/workflows/ci.yml`.
Covers R1, R2, R4, R6. Create minimal Expo Router template structure with registry-backed browse/detail pages and responsive themed shell. No pre-existing tests exist.
Test scenarios in `src/catalog/catalog.test.ts`: IDs unique; search includes tags; family/category intersections; empty results; platform availability; missing IDs. Browser: search, filters, detail/back, empty state, narrow width, unavailable platform.

### U2. Universal live specimens

Files: `src/examples/universal/`, shared example types and registry.
Covers R3, R5, AE1. Include every public universal component, using compound layout examples where appropriate; interactive controls and presentation own state, display changes, support reset.
Verification: typecheck against installed APIs, native and web bundle, browser interactions for controls supported by universal web implementation.

### U3. Native live specimens

Files: `src/examples/native/`, catalog inventory metadata.
Covers R3–R5, AE2. Direct SwiftUI and Compose examples organized by area, including native-only presentation, layout, modifiers, and navigation. Context-specific exports receive explicit coverage explanations.
Verification: types plus iOS/Android bundles; inspect host boundaries and wrong-platform imports. Native device checklist in docs; no simulator interaction.

### U4. Audit, documentation, and delivery checks

Files: `README.md`, `CONTRIBUTING.md`, `docs/coverage.md`, `src/catalog/catalog.test.ts`, verification scripts as needed.
Covers R6, R7, AE3, AE4. Inventory audit accounts for public component exports and documented exceptions. Document run commands, architecture, Expo Go distribution caveat, and native verification limits.
Verification: `bun run check`, `bun run typecheck`, `bun test`, Expo doctor/dependency checks, three platform exports, browser smoke. Remove unused template material and abandoned experiments.

## Verification Contract

Registry tests prove discovery/availability/inventory behavior; TypeScript checks actual imported props; Biome checks source quality. Expo doctor and `expo install --check` verify dependency alignment. `expo export` on iOS, Android, and web catches import/bundle failures. Browser checks demonstrate shell behavior and universal controls. Device-only behavior is left with an explicit manual checklist if no dedicated simulator is available.

## Definition of Done

Private repo exists on the personal account; implementation is committed and pushed on a feature branch with an open PR and CI decided. Requirements are implemented, checks are recorded, coverage/limitations are explicit, docs explain adding examples and running in matching Expo Go, and no abandoned template/experimental code remains.

## Follow-up: native tabs and richer customization

User direction: use Feature-Sliced Design, build the app with Expo UI and Expo Router native tabs, and make variants directly customizable.

Delivered Catalog / Playground / Guide native tabs; universal Expo UI shell controls; typed prop/modifier inspectors across the universal, SwiftUI and Compose families; shared Host environment controls; validated JSON configurations and independent reset. The generated `docs/variants.md` records 277 component-specific controls and remaining specialized-context limits. Component detail routes remain outside the tabs in the root stack.

Validation: Biome and TypeScript pass; 14 Bun tests pass (2,371 assertions), including schema/default/configuration validation and FSD boundaries. Expo Doctor passes 20/20; dependency alignment and all three platform exports pass. Browser checks cover tab switching, live label editing, JSON apply/disabled state, reset, synchronized pickers, and mobile heading clearance. No browser errors observed. Focused correctness review found no actionable defect. Native measurement, keyboards, nested gestures, and OS effects still require device testing; no simulators were operated.
