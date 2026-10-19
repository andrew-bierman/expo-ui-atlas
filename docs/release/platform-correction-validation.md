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

## Authorized cloud build/upload receipt

After coordinated clearance for bounded cloud CLI work, EAS production build `c0a60b44-d815-4f48-be4b-2076f1a0ac9f` finished as **1.0.0 (9)** from exact source `9808282b1f0e8bdf1fc09d5474f118b36d455d32`. Existing certificate/profile were confirmed ready with frozen credentials; no credentials were created. Remote counter was 7 before starting. The first attempt consumed 8 but failed before upload because its staging folder was inside the repository. Retrying with external sibling staging succeeded; no source change or counter rollback occurred.

The exact signed archive passed store identity, source/version/build, signature, App Store profile/entitlements, opaque iPhone/iPad icons, privacy manifest and complete legal/native-notice checks. Audit: `.expo/platform-scope-validation/production-build-9-archive-audit.json`. Explicit-ID EAS Submit job `cd413640-be4b-46da-89a7-0a96d80dc721` finished successfully. Apple processing is not established by that job result; its separate status is checked before selection or resubmission.

Local native UI/accessibility and heavy-build hold remains active. No iOS simulators were closed in this release turn. The owned Android emulator `emulator-5580` and Metro 8089 had already been stopped. No shared simulator shutdown, GUI metadata/screenshot change, website deployment, reviewer response or resubmission occurred in this cloud step.

Apple subsequently reports build 9 `VALID`, `READY_FOR_BETA_TESTING`, `READY_FOR_BETA_SUBMISSION`, matched to the exact EAS build and submission IDs above. Receipt: `.expo/platform-scope-validation/replacement-apple-status.json`. This establishes successful processing, not owner group assignment, physical-device acceptance, App Review submission or public release. Remaining: publish prepared support FAQ changes; update listing/screenshots and select exact processed build; send reviewed response and resubmit when the GUI hold is released. Keep manual release.

## Replacement submission receipt — October 19, 2026

Version **1.0.0 (9)** is **Waiting for Review**, submitted October 19 at 5:02 PM MDT in submission `fd7e090f-8894-440b-83fe-7dc6cf8b64ae`. Exact build source is `9808282b1f0e8bdf1fc09d5474f118b36d455d32`; EAS build `c0a60b44-d815-4f48-be4b-2076f1a0ac9f`. Manual release remains selected. Description and reviewer notes were read back exactly; six new iPhone and six new iPad original screenshot filenames were read back, with Save disabled after saving. Corrected support FAQ is published and verified.

The response was sent once: message count increased from one to two and the sender timestamp was observed at 5:02 PM. The sent-message accordion did not expand through accessibility, so exact sent-body readback remains unverified; no duplicate response was sent. Private local text, screenshot and hash evidence are retained in `.expo/platform-scope-validation/browser-submission-20261019/receipt.json` and its siblings. Approval and public availability are not claimed. The GUI lane is released; no further tests, builds or submissions are part of this receipt reconciliation.
