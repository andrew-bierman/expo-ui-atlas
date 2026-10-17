# Project conventions

- Use Feature-Sliced Design. Read `docs/architecture.md` before introducing or moving modules.
- Keep `src/app` limited to Expo Router routes and app composition; put screen implementations in page slices.
- Import other slices through their public entrypoint. Dependencies point downward: app → pages → features → entities → shared. No sibling-slice imports.
- Keep native specimen dependencies platform-isolated and compatible with Expo Go. Do not add custom native modules.
- Keep specimen state local, metadata serializable, and coverage notes honest about live versus context-only examples.
- Use Bun and Biome. Verify with `bun run check`, `bun run typecheck`, `bun test`, and relevant platform exports.
- Do not operate simulators owned by another session. If using XcodeBuildMCP, read its installed skill first.
