# Platform correction validation — October 19, 2026

App runtime source: `da118082195b1e37b70605a5d3d6e3df42a33939`. Subsequent release-copy/receipt changes do not change app code. This corrects rejection 2.3.10 for 1.0.0 (7); it does not establish approval or a replacement store upload.

## Verified

- 53 Bun tests, 3,708 assertions; lint and TypeScript passed for the corrected source.
- Standalone Release simulator binary built from that exact revision. Version 1.0.0, local build 1, iphonesimulator; not a signed store build. JS bundle SHA-256 `76a71fa8822f2f6c9d0c32b821fc87b29bfdc5c143fdb02c29573d71a56bb866`.
- iPhone 17 / iOS 26.5: all four flows passed in 2m31s: scenes 40s, ordinary search dismissal/reopen 18s, final-row reachability 25s, platform/search/Guide/direct-route guards 69s.
- iPad Pro 13-inch M5 / iOS 26.5: platform/search/direct-route guards passed in 80.521s; scenes and reachability passed 2/2 in 1m7s.
- Each iOS device exposes 40 collections (14 universal, 26 SwiftUI), without the Compose family. Exact rejected `compose-content` route is blocked in component, reference and playground contexts.
- Independent source and rendered-screen review found no remaining findings in the inspected flows. All seven native upstream notices and full bundled legal text verified in the simulator bundle.
- Six unmodified candidate screenshots per device, with original paths, dimensions and SHA-256 hashes in the artifact manifest. These have not been uploaded.

## Search behavior and limits

Explicit Clear filters resets native search and restores tabs. Ordinary iPhone dismissal/reopen works without terminating the app. Backspace-to-empty followed by replacement input without refocus passed. On the tested iPad, the native Clear button ended search; reopening and typing passed. An earlier test requiring continued editing without reopening failed. Its underlying cause is unproven; no claim of a UIKit defect is made.

Android reciprocal source guards are tested, but runtime acceptance is incomplete. Official Expo Go 58.0.5 installed on an owned read-only headless emulator; testing was paused and that emulator and Metro stopped during the Mac crash diagnosis. This is not Android production validation. Earlier all-platform exports and React Doctor results precede the final search callback change; final exports/React Doctor remain to run after the storage safety hold. Focused simulator flows do not exhaust every specimen or establish physical-device behavior.

## Evidence location

External worktree artifacts: `/Volumes/CrucialX10/andrewbierman/Worktrees/expo-ui-atlas-asc-screenshots-3076996/artifacts/platform-scope-da11808/`.

Key receipts: `binary-identity.json`, `bundle-notice-audit.json`, `screenshot-manifest.json`, `ipad-guards-native-clear.log`, `ipad-scenes.log`, `phone.log`, and `candidate-screenshots/`.

## Next release gates

Owner approved the Atlas-only push, support FAQ update, existing-signing replacement build/upload, screenshots/metadata update and resubmission. Heavy local work and release execution remain paused pending practical safety confirmation from the crash diagnostic owner. No new credentials, purchases or other apps are included.

Recheck remote highest build immediately before building. Last read-only EAS listing showed build 7 as newest; propose 1.0.0 (8), conditional on the remote counter. Reuse existing production profile and managed credentials; their current usability is not established until EAS checks them. Do not create or replace credentials if a gate appears. Verify the exact signed archive/source, then upload by explicit build ID. Wait for Apple processing before selecting it, replacing screenshots and submitting the reviewed notes/response. Keep manual release and repository privacy unchanged.
