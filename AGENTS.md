# Project conventions

- Use Feature-Sliced Design. Read `docs/architecture.md` before introducing or moving modules.
- Keep `src/app` limited to Expo Router routes and app composition; put screen implementations in page slices.
- Import other slices through their public entrypoint. Dependencies point downward: app → pages → features → entities → shared. No sibling-slice imports.
- Keep native specimen dependencies platform-isolated and compatible with Expo Go. Do not add custom native modules.
- Keep specimen state local, metadata serializable, and coverage notes honest about live versus context-only examples.
- Use Bun and Biome. Verify with `bun run check`, `bun run typecheck`, `bun test`, and relevant platform exports.
- Do not operate simulators owned by another session. If using XcodeBuildMCP, read its installed skill first.

- Follow `docs/code-conventions.md`: use catalog/control enums, validate unknown external input, and use shared theme tokens or named demo configuration instead of unexplained repeated values. No explicit `any`.
- Keep select controls nonempty with defaults from their declared options; use named range options. Preserve strict and checked-index compiler flags and lint enforcement.

- Show native defaults first. Do not apply the catalog brand’s tint, seed palette, direction or decorative modifiers to every specimen. Keep customization and explicit themed/modifier demonstrations clearly separate. Prefer simple native compositions over extra wrappers or decorative UI.

- Native defaults apply to catalog chrome too: use the framework navigation themes unchanged, leave NativeTabs styling unset, and do not seed shared-control Hosts with a brand color.
