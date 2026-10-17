# Feature-Sliced Design

Expo UI Atlas follows [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview). Modules are organized by responsibility and domain, with dependencies pointing down the layers. Layers are added only when the app needs them; there is no empty widgets layer.

| Layer | Responsibility in Atlas | Public API |
| --- | --- | --- |
| App | Expo Router routes, root navigation, global app composition | Router entrypoints |
| Pages | Catalog browse, catalog detail, and not-found screen composition | Each page slice's `index.ts` |
| Features | Explore live examples: native/universal specimen trees, local interactions, reset and error recovery | `features/explore-examples/index.ts` |
| Entities | Catalog entry metadata, availability, families/categories, discovery selectors, and inventory | `entities/catalog-entry/index.ts` |
| Shared | UI primitives and theme independent of catalog semantics | Each Shared segment's `index.ts` |

## Dependency rules

A module can depend on its own slice and lower layers. Different slices on the same layer cannot import one another. App and Shared have segments rather than domain slices. Cross-slice imports use the public entrypoint; private files are for their owning slice. Relative imports inside a slice avoid importing its own barrel and creating cycles.

Catalog metadata has no dependency on React components or native renderers. Example component types belong to the explore-examples feature. The detail page composes the entity and feature APIs; neither imports the other page. Browse filter state stays local to the catalog page, while pure search selectors stay with the entity model.

## Platform boundaries

`features/explore-examples/ui/specimens/native/index.ios.tsx` and `index.android.tsx` expose the same registry contract. The generic fallback exposes no native examples. Consumers import the extension-free feature API so Metro selects the correct implementation. Native imports remain behind those platform entrypoints. Asset paths, source-based registration tests, and inventory tooling must be updated together when moving files.

## Enforcement

`scripts/fsd-boundaries.test.ts` scans local static imports, re-exports, dynamic imports, and require calls. It rejects unknown source layers, upward dependencies, sibling-slice imports, and imports bypassing public entrypoints. Its negative cases verify that prohibited dependency shapes are detected. The repository currently uses relative module paths; extend the resolver before introducing path aliases.

The catalog and export-inventory tests stay colocated with the catalog model. Tooling consumes the entity's public API. Installed third-party skills under `.agents` remain outside app code and outside Biome's formatting scope.

## Native tabs and tuning

`app/(tabs)` composes Catalog and Guide using `expo-router/native-tabs`. Component details remain a root stack route over the tabs. Component-specific Customize and Docs screens are native form sheets. Page slices import the catalog entity and example feature through public APIs. Shared UI uses the universal Expo UI API; The catalog uses Expo UI List/ListItem. React Native virtualizes the larger per-component variant galleries.

The example feature owns typed control schemas, validation, live inspector UI and a per-specimen tuning provider. Schemas live beside the relevant family’s renderers and feed both UI and the generated variant matrix. `useKnob` reads supported overrides; `useTunedState` also synchronizes direct interactions back into the inspector. `SpecimenHost` supplies preview environment values to each native host. Platform entrypoints isolate direct SwiftUI and Compose imports.

## Ready-made variants

Component details use the example feature’s virtualized gallery. The gallery enumerates each schema’s finite enum cases and boolean states; numeric settings get minimum/default/maximum samples. Each preview has independent state. Reset is available in Customize. The optional per-collection Customize sheet retains combined customization and JSON editing. Off-window local interactions may reset under virtualization.

A control’s optional `previewValues` enables prerequisites for its gallery samples, such as choosing a line chart before varying line width. The varied value takes precedence over context. These values do not change the control’s playground default. Continuous combinations and arbitrary text remain playground concerns.

## Offline reference

The catalog entity owns a generated, SDK-matched reference snapshot and pure lookup functions. The Docs sheet composes its Reference panel with a generic Shared Markdown reader. Downloading and discovery are explicit tooling (`bun run docs:sync`); the runtime does not fetch reference text. See `docs/reference.md` for refresh, attribution, link behavior, and offline scope.
