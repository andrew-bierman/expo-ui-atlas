# Public repository and support links

The repository is still private. These materials are prepared on the feature branch; changing visibility and merging are separate actions. No App Store upload or public deployment has been performed.

## Public pages

Rendered Markdown in the public `main` branch is the proposed host, so no Pages deployment or custom domain is required:

| App Store field | Proposed URL |
| --- | --- |
| Support URL | https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/support.md |
| Privacy Policy URL | https://github.com/andrew-bierman/expo-ui-atlas/blob/main/docs/privacy.md |
| Marketing URL (optional) | https://github.com/andrew-bierman/expo-ui-atlas |
| Support contact | https://github.com/andrew-bierman/expo-ui-atlas/issues/new/choose |

These links are not public-ready until the files are merged and the repository is public. Validate each URL in a signed-out browser before entering it in App Store Connect or submitting the app. GitHub Issues is the initial support channel; a GitHub account is required to post, never to use the app. Do not post personal information in issues. If Apple requests a direct email/contact channel, supply an approved public contact address rather than an Apple login email.

The same privacy/support/notices documents are bundled for offline reading in Guide. Edit `docs/privacy.md`, `docs/support.md`, or `docs/notices.md`, then run `bun run legal:sync`. CI checks for drift. Do not maintain a separately reworded app policy. GitHub Pages can be added later if cleaner URLs are useful; it is not required by this setup.

## Before changing visibility

- Review and merge the intended source, MIT license, contribution guide, public documents and issue templates. The MIT license covers original app code/assets; third-party material retains its own notices. The package's `private: true` prevents accidental npm publication and does not prevent open-sourcing on GitHub.
- Review naming rights for the existing app name; the independent-product disclaimer does not itself grant Expo trademark permission. The new original icon replaces template-style artwork in app configuration.
- The October 17 history audit covered 18 reachable commits and 398 unique blobs before this public-preparation change. It found no credential tokens, private keys, signed artifacts, tracked environment files or private filesystem paths. A personal Apple login email appears in older `eas.json` history. Current config no longer contains it. Removing a line in a new commit does not remove historical exposure. Before visibility changes, choose explicitly whether that email may be public or sanitize the unpublished history in coordination with all collaborators. Do not force-push or rewrite history casually.
- Repeat a full-history secret scan immediately before publication, including any added branches/tags and future changes. A scan is evidence for the inspected state, not a guarantee that every future commit is safe. Do not publish local `.agents`, credentials, build artifacts, `.expo`, device captures or signing material. Gitignore excludes local tooling; Apple credentials should be supplied through EAS's managed flow/environment.
- Keep the existing bundle ID and EAS project ID. These are identifiers, not signing secrets; never copy the maintainer's signing credentials into forks. Fork contributors should link their own Expo project before cloud builds.
- Enable Issues for support and review moderation/notification settings. If private security reporting is enabled, link its verified reporting URL; do not claim a private reporting channel exists until tested.
- Once ready, change repository visibility in GitHub Settings → General → Danger Zone. Read GitHub's impact summary. Confirm that source, complete history, issues, Actions logs/artifacts and release assets are suitable for public access. This operation has not been performed by the preparation work.
- Verify all four URLs above while signed out. Confirm issue forms load, the public policy matches the bundled copy, and the repository detects the MIT license. Then finish the [Apple review runbook](app-store.md).

## Dependency notices

`docs/dependency-notices.md` records the installed production dependency tree, including reachable build tools. It is bundled for offline export from Guide → Open-source notices. The shorter notices page renders the app/Expo documentation licenses without mounting hundreds of license documents at once. Refresh the full inventory after dependency changes using the generator's recorded commands, then run `bun run legal:sync`.

An installed npm inventory is not the signed-archive dependency inventory. Before submission, inspect native library notices/privacy manifests, any vendored source and the actual archive. Unresolved entries are release-review tasks, not permission to omit notices or assume a license.
