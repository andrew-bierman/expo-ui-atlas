# Native UI checks

Uses the Maestro CLI against SDK 58 Expo Go. No native test dependency or development build is added to the app.

Start Metro with `bun start --port 8087`. Choose a dedicated simulator/emulator, install the matching Expo Go, then run:

```sh
MAESTRO_DEVICE_ID=YOUR_DEVICE_UUID bun run test:e2e
```

The runner requires an explicit device ID so it cannot select another session's booted simulator. It does not create, erase, or reset devices. Override `MAESTRO_COMMAND` if Maestro is not on PATH. On Android set `APP_ID=host.exp.exponent` and `EXPO_URL=exp://10.0.2.2:8087`; iOS defaults are `host.exp.Exponent` and `exp://127.0.0.1:8087`.

Flows cover final catalog-row reachability, search empty/recovery, component interaction, documentation sheets, customization configuration with the software keyboard open, reset recovery, and Guide top/bottom reachability. They capture screenshots for safe-area review. The configuration flow focuses the native multiline editor, then swipes in the outer scroll view’s side padding so the editor’s own text scrolling cannot consume the gesture. It checks Apply while the software keyboard remains open. Text visibility alone cannot prove that every native view is free of clipping; inspect the captured screenshots as well. Native scroll component specimens intentionally own bounded scroll surfaces; the catalog and customization UI do not add nested inspector scrollers.

Artifacts and logs go to ignored `.expo/maestro-artifacts` and `.expo/maestro-debug` beside the repo on the external drive. Keep the Maestro installation/downloads external where practical; Xcode's driver staging may require its normal macOS temporary directory.

On the dedicated test device, turn off the Expo Go developer menu’s **Tools button** before running the flows. Its floating gear can cover the app’s right-hand navigation actions; this is Expo Go chrome, not part of the catalog. The first Expo Go developer-menu tutorial is dismissed when it appears. No account credentials, app data reset, or cloud upload are part of these tests.

References: [Maestro CLI](https://docs.maestro.dev/maestro-cli/), [Expo Go support](https://docs.maestro.dev/get-started/supported-platform/react-native), [scrollUntilVisible](https://docs.maestro.dev/reference/commands-available/scrolluntilvisible.md).

Validated October 16, 2026 on the dedicated `Maestro_IOS_iPhone-17_26` simulator (iOS 26.5, Expo Go 58.0.4). The original three flows passed in one light-mode run: navigation/sheets/keyboard/reset/Guide (52s), final catalog row (45s), and search/recovery (18s). A separate dark-mode smoke passed catalog → component → docs → catalog, and both dark screenshots were visually inspected. Light artifacts: `.expo/maestro-artifacts/2026-10-16_222413`; dark artifacts: `.expo/maestro-artifacts/2026-10-16_222628`. This validates these iOS flows and screenshots; Android, physical-device E2E, and every individual component interaction were not exercised by this run.

Later that evening, both added state regressions passed as complete focused flows on the same iOS simulator: `customization-state.yaml` verifies untouched Apply keeps optional native defaults, explicit override on/off, dirty JSON preservation across an inspector picker change, malformed JSON rejection without overwriting live settings, and Reset clearing the draft; `bottom-sheet-state.yaml` verifies inspector detents, repeated open/close, shortcut-to-inspector synchronization, interactive drag dismissal/reopening inside Customize, and Reset. Native artifacts: `.expo/maestro-artifacts/2026-10-16_225058` (customization) and `.expo/maestro-artifacts/2026-10-16_225243` (sheet). These are iOS results; the five-flow suite was not rerun together, and Android state behavior has not been validated.

On October 17, the added `legal-documents.yaml` flow passed on the same dedicated iOS simulator after Guide actions were made full-width native ListItem rows. It opens the bundled privacy/support/notices sheets and returns with Done. Resource scrolling uses `centerElement: true` because accessibility visibility alone does not account for the floating native tab bar. The final Guide rows and notices toolbar were visually inspected clear of the tab bar/header. Artifacts: `.expo/maestro-artifacts/2026-10-17_081642`. This focused run does not replace standalone iPhone/iPad release testing.

The October 17 standalone Release validation uses source `5f140926`, whose tree matches merged `394113c`, on dedicated iPhone 17 and iPad Pro 13-inch M5 simulators running iOS 26.5. These runs launch the installed app with `stopApp` / `launchApp` instead of the Expo Go `support/open.yaml` helper. The compiled Hermes bundle contains the complete dependency notice document and all seven original native notices. Artifacts are preserved in the release-validation worktree under `artifacts/final-source-validation/`.

All six iPhone flow families passed across the initial suite and focused replays. The initial Customize test tapped the header before navigation settled; the saved flow now waits for the transition and asserts the destination sheet title before scrolling. All six iPad flow families also have passing complete executions. Its focused Customize replay uses sheet-contained gestures because phone gestures at 95% of screen width fall outside the centered form sheet, and it scrolls Reset into the visible sheet before tapping rather than selecting a clipped accessibility element. Device-specific test copies preserve the same state assertions and record these adaptations alongside the original failures. Simulator results do not establish signed physical-device, Android, exhaustive component or accessibility coverage.
