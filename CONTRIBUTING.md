# Adding a specimen

1. Inspect the installed `@expo/ui` types and [SDK 58 documentation](https://docs.expo.dev/versions/v58.0.0/sdk/ui/). Old SDK examples may use different prop names.
2. Add serializable metadata in `src/entities/catalog-entry/data/universal.ts`, `swiftui.ts`, or `compose.ts`. Use a stable, family-prefixed ID; specify platform, category, exports, searchable tags, and meaningful availability notes.
3. Add a small component in the relevant folder under `src/features/explore-examples/ui/specimens/`. Keep state local; a shared card remounts it for reset. Show meaningful visual states and interactions, with visible feedback. Every native subtree needs its corresponding Host; use explicit sizes for native scrolling/navigation containers. Wrap RN content in RNHostView, and reintroduce Host when returning to Expo UI.
4. Register the component under the same ID in the universal or native platform registry. Add a title explaining the variation, an instruction describing what to try, and an optional short recipe. Group related components when that helps compare them.
5. Keep native imports inside their platform-specific entrypoint dependency graph. Metadata is safe to import everywhere. Never import direct native UI into the generic fallback.
6. Add actual exports to the metadata. A compound slot or utility may instead belong in `src/entities/catalog-entry/data/coverage.ts`, with a concrete explanation. Do not label a documented-only context as a live specimen.
7. Run the README checks. Test on the supported device/OS, including dismissal/back and reset. Do not commandeer another session's simulator.

## Updating Expo

Use `bunx expo install --fix` after intentionally choosing a new SDK. Inspect changed Expo UI APIs, regenerate the inventory with `bun scripts/ui-inventory.ts`, then reconcile every added or removed public value export. The test deliberately fails on unreviewed inventory drift. The modifier namespaces are demonstrated through representative playgrounds rather than enumerating every possible combination.

Avoid `any`, suppression comments, custom native modules, and broad app-level state for specimen-local concerns. Bun owns the lockfile; Biome owns formatting and lint. Keep assets bundled so examples do not depend on network images.

## Feature-Sliced Design

Follow [the architecture contract](docs/architecture.md). Keep route files thin, compose screens in page slices, and keep catalog data in the catalog-entry entity. Consumers import a slice's `index.ts` public API; use relative private imports within the owning slice. A layer can import only lower layers; slices cannot import sibling slices. Shared code cannot know about the catalog or specimens. Add a layer or slice only when an actual responsibility needs it.

`bun test` checks these boundaries. Update renderer-registration source paths when moving a platform entrypoint, and preserve native filename suffixes so Metro continues selecting the supported platform implementation.
