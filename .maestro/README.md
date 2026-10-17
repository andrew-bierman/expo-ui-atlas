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
