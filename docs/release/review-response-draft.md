# App Review response draft — 2.3.10

Draft only. Do not send until the rebuilt replacement binary and screenshots have been verified. Replacement build number is not assigned.

## Proposed response after verification

Thank you for the review. We removed unsupported-platform collections and references from the iOS experience, including the Cards & surfaces screen shown in your screenshot. Catalog discovery and direct component, documentation and customization routes now filter unsupported collections. We verified the correction on iPhone and iPad simulators.

The replacement build is 1.0.0 ([VERIFIED PROCESSED BUILD NUMBER]). Please review it with the updated screenshots and notes.

## Evidence required before sending

- Rebuilt source revision and replacement binary identity recorded.
- iPhone and iPad discovery/search/Guide/API filters verified.
- Exact rejected Cards & surfaces collection (`compose-content`) absent from discovery; direct component, reference and playground routes safely rejected.
- Supported universal and SwiftUI controls exercised, fresh screenshots inspected.
- Reciprocal source guards reviewed; Android runtime evidence identified separately if unavailable.

The received October 19 rejection is 2.3.10 Accurate Metadata for iOS 1.0.0 (7), with the instruction “Revise the app’s binary to remove Android references.” The original screenshot and authenticated review evidence are retained locally; this draft does not establish that Apple has accepted a correction.

## Proposed replacement build and upload plan

Propose iOS 1.0.0 (8), subject to checking the highest remote build number immediately before building. Build 7 remains the rejected submission; the local simulator build number 1 is not a store build number. `eas.json` uses remote app versions and automatic incrementing.

After native acceptance and owner authorization for the next release actions: build the verified source with `bunx eas-cli@23.2.0 build --platform ios --profile production`; audit the exact signed archive, then upload that explicit build ID with `bunx eas-cli@23.2.0 submit --platform ios --profile production --id <VERIFIED_EAS_BUILD_ID>`. Do not use `--latest`. After Apple processing, select the matching replacement build and refreshed screenshots, apply the reviewed listing/notes, and send the response only with the verified build number. Upload and App Review resubmission are separate actions and have not been performed by this correction task.
