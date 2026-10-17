# Types and constants

Atlas treats catalog definitions as contracts. The compiler checks app code, scripts, tests and compile-time fixtures with strict mode, checked indexed access, explicit overrides and switch fallthrough checks. Biome rejects explicit `any` and unused imports/variables. Use `unknown` for external input and narrow it before use.

## Stable identities

Use `CatalogEntryId`, `Family`, `Category`, `CatalogPlatform` and `CatalogFilter` from the catalog entity’s public API. `ExampleRegistry` accepts only known catalog IDs. Route parameters arrive as strings and must pass through `findEntry`; a string from a URL is not automatically a valid catalog ID.

The example feature owns `ControlId` and `ControlType`. Use these in schema definitions, native bindings and preview prerequisites. `TuningValues` is a partial map of registered control IDs, not an arbitrary string dictionary. JSON input remains unknown until parsing checks its object shape, keys, value types and allowed choices. Do not cast incoming JSON into app types.

Some registry keys stay literal to keep registration inventories statically readable. They are checked against `CatalogEntryId` with `ExampleRegistry` or `satisfies`; they are declarations of stable serialized IDs, not ad hoc identifiers at call sites.

## Defining a control

Use the shared builders inside the example feature. A selection must have at least one option; its default must belong to the declared options. Range settings use named fields so argument order cannot silently exchange a step and a default.

```tsx
import { range, select, toggle } from '../model/control-builders';
import { ControlId } from '../model/control-identifiers';

const appearance = select(
  ControlId.Variant,
  'Button variant',
  ['filled', 'outlined', 'text'],
  'filled',
);
const opacity = range(ControlId.Opacity, 'Opacity', {
  min: 0.2,
  max: 1,
  step: 0.1,
  defaultValue: 1,
});
const enabled = toggle(ControlId.Enabled, 'Enabled', true);
```

Keep SDK-specific choices in a named, readonly list when the schema and native renderer share them. Pass values to the installed Expo UI prop/modifier types so SDK upgrades expose incompatible cases. Do not use assertions to conceal an incompatible API value. `useTunedState` still needs an explicit primitive type when its state can change, such as `useTunedState<number>(ControlId.Value, 35)`.

## Numbers and visual values

Shared layout spacing, Markdown typography and system appearance helpers belong to `shared/theme`. Native UI owns control geometry and typography. Meaningful list-window and layout settings have named configuration fields. Use named constants for behavior thresholds, repeated layout values and protocol values.

A catalog also needs intentional demonstration data: a slider’s bounds, a chart point, an animation duration being demonstrated, or a specimen color. Declare these where their purpose is visible—in a control’s `min`/`max`/`step`/`defaultValue`, a named sample object, or a component’s local demo configuration. Do not move each sample number into a global enum or replace it with a meaningless name such as `VALUE_24`. These values are examples, not hidden application rules.

## Verification

`bun run typecheck` checks negative compile-time fixtures as well as the app. Those fixtures must continue rejecting empty choice lists, invalid defaults, unknown control IDs and unknown catalog IDs. `bun test` checks runtime parsing, preset generation, schema consistency, catalog discovery, registrations and FSD boundaries. `bun run check` enforces formatting and the configured lint rules. Bundle all platforms after touching native bindings; types alone do not verify native rendering.

## Native fidelity

Specimens inherit native theme and locale direction unless the example explicitly demonstrates a different configuration. This applies to the catalog chrome as well: use Expo Router’s default light/dark navigation themes unchanged, leave native tab styling unset, and do not seed shared-control Hosts. Non-interactive labels use ordinary text rather than the accent color. Playground appearance, accent and direction start at `system`; explicit overrides remain available. A seeded palette or modifier example can declare its own settings because those settings are the subject being demonstrated. Keep surrounding presentation quiet and controls recognizable.

Catalog screens use Expo UI native components and Expo Router native navigation titles. React Native containers use Router `Color` semantic system colors. Keep styling limited to layout, Markdown readability, and explicit component/modifier demonstrations; native controls and text inherit their platform appearance.
