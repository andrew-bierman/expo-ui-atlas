# Public repository and support links

The repository is still private. These materials are prepared on the feature branch; changing visibility and merging are separate actions. No App Store upload or public deployment has been performed.

## Public pages

The company website provides support and privacy pages independently of repository visibility:

| App Store field | Proposed URL |
| --- | --- |
| Support URL | https://biermancollective.com/apps/expo-ui-atlas/support |
| Privacy Policy URL | https://biermancollective.com/apps/expo-ui-atlas/privacy |
| Marketing URL (optional) | https://github.com/andrew-bierman/expo-ui-atlas |
| Support contact | mailto:admin@biermancollective.com |

Verify the company support/privacy URLs in a signed-out browser after the website pages deploy and before submission. Support is available by business email without a GitHub account. The optional repository marketing URL remains unavailable while the repository is private; do not enter it as a public App Store destination before publication. Repository publication is a separate decision, not a requirement for company-hosted support.

The same privacy/support/notices documents are bundled for offline reading in Guide. Edit `docs/privacy.md`, `docs/support.md`, or `docs/notices.md`, then run `bun run legal:sync`. CI checks for drift. Do not maintain a separately reworded app policy. Keep the company-hosted privacy/support pages consistent with these bundled copies.

## Before changing visibility

- Review and merge the intended source, MIT license, contribution guide, public documents and issue templates. The MIT license covers original app code/assets; third-party material retains its own notices. The package's `private: true` prevents accidental npm publication and does not prevent open-sourcing on GitHub.
- Review naming rights for the existing app name; the independent-product disclaimer does not itself grant Expo trademark permission. The new original icon replaces template-style artwork in app configuration.
- The October 17 history audit covered 18 reachable commits and 398 unique blobs before this public-preparation change. It found no credential tokens, private keys, signed artifacts, tracked environment files or private filesystem paths. A personal Apple login email appears in older `eas.json` history. Current config no longer contains it. Removing a line in a new commit does not remove historical exposure. Before visibility changes, choose explicitly whether that email may be public or sanitize the unpublished history in coordination with all collaborators. Do not force-push or rewrite history casually.
- Repeat a full-history secret scan immediately before publication, including any added branches/tags and future changes. A scan is evidence for the inspected state, not a guarantee that every future commit is safe. Do not publish local `.agents`, credentials, build artifacts, `.expo`, device captures or signing material. Gitignore excludes local tooling; Apple credentials should be supplied through EAS's managed flow/environment.
- Keep the existing bundle ID and EAS project ID. These are identifiers, not signing secrets; never copy the maintainer's signing credentials into forks. Fork contributors should link their own Expo project before cloud builds.
- If enabling Issues after publication, review moderation/notification settings. Business email remains the support channel. If private security reporting is enabled, link its verified reporting URL; do not claim a private reporting channel exists until tested.
- Once ready, change repository visibility in GitHub Settings → General → Danger Zone. Read GitHub's impact summary. Confirm that source, complete history, issues, Actions logs/artifacts and release assets are suitable for public access. This operation has not been performed by the preparation work.
- After publication, verify repository links while signed out and confirm the repository detects the MIT license. Independently verify the company support/privacy pages match the bundled copies, then finish the [Apple review runbook](app-store.md).

## Dependency notices

`docs/dependency-notices.md` records the installed production dependency tree, including reachable build tools. It is bundled for offline export from Guide → Open-source notices. The shorter notices page renders the app/Expo documentation licenses without mounting hundreds of license documents at once. Refresh the full inventory after dependency changes using the generator's recorded commands, then run `bun run legal:sync`.

The export also includes seven checksum-pinned original notices for the React Native 0.88.0 prebuilt native dependency constituents, including complete Folly and glog additional terms. Their source/version mapping comes from React Native's tagged prebuild configuration; generated CocoaPods facade MIT metadata is not used as their license authority. See `scripts/legal/README.md` for the reconciliation and refresh procedure.

An installed npm inventory is not the signed-archive dependency inventory. Compare the native supplement and privacy manifests with the final archive after rebuilding. The unresolved `client-only`, `server-only` and `tr46` notices remain installed-graph gaps; the audited iOS production source map contains no executable modules from those packages. Do not assign them invented notices or describe their presence in the installed tree as proof that they ship in the native binary.
