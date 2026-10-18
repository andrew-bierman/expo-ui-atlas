# Dependency notice generation

Run the input-generation command in `build-notices.py` after installing the frozen
lockfile, then run `python3 scripts/legal/build-notices.py`. The raw JSON stays in
ignored `.expo/qa-receipts`; never publish its publisher, email, or machine paths.
The public Markdown preserves the full supplied license text and top-level
additional NOTICE files. Only identical complete text/NOTICE combinations are
deduplicated. Copyright-holder contact details inside legal notices are retained.

The production dependency graph includes build tools. It does not identify the
contents of a compiled archive or replace a native SDK notice audit.

## Pinned upstream supplements

Some published packages omit license files. These exact upstream files supplement
the installed package report; they are not synthesized license boilerplate:

- `upstream/metro-v0.87.1-LICENSE.txt`:
  <https://raw.githubusercontent.com/react/metro/v0.87.1/LICENSE>, matching the
  installed Metro package release tag.
- `upstream/hermes-LICENSE.txt`:
  <https://raw.githubusercontent.com/facebook/hermes/d412d3bd851278712c20cca25d094e32641a0465/LICENSE>.
  The published registry metadata for `hermes-compiler@260318099.0.4` supplies that
  exact `gitHead` commit.

`client-only@0.0.1` and `server-only@0.0.1` publish neither a full license file nor
repository/gitHead provenance in their installed manifests or registry metadata.
`tr46@0.0.3` has no complete installed license; its registry gitHead is
`a8009f9ce80ff5dbe71dd71e203afe4e4c878d28`. The GitHub recursive tree for that
commit in both the declared repository and successor jsdom repository contains
neither a license nor README. A later commit,
`3a6f29721e7063b9ffd421e461a54beae6170001`, adds `LICENSE.md`; that later notice
has not been assigned retroactively to this older package. These remain explicitly
unresolved in the generated output. Do not
substitute the current upstream license without establishing version provenance.

## Native prebuilt dependencies

`native-notices.json` pins seven original upstream files under `upstream/native/`
for React Native 0.88.0's `ReactNativeDependencies.framework`. Its source/version
mapping is the tagged React Native prebuild configuration, not the generated
CocoaPods facade license fields. The generator checks the installed React Native
version and each local file's SHA-256 before writing the combined notice export.
An SDK/RN upgrade must reconcile this manifest before regeneration.

The matching standalone Podfile.lock and prebuilt header namespaces identify
Boost 1.84.0, DoubleConversion 1.1.6, fast_float 8.0.0, fmt 12.1.0, glog 0.3.5,
Folly v2024.11.18.00, and SocketRocket 0.7.1. All eleven package notices generated
by CocoaPods are already included verbatim in the npm-derived inventory; these
seven upstream texts fill the prebuilt-constituent gap. Folly's complete LICENSE
includes additional FarmHash terms; glog's complete COPYING is preserved.

On October 17, 2026 (America/Denver), the exact tagged upstream root listings
were checked for LICENSE/COPYING/NOTICE files: Boost `v1.84.0` has
`LICENSE_1_0.txt`; double-conversion `v1.1.6` has `LICENSE` and `COPYING`;
fast_float `v8.0.0` has `LICENSE-MIT`, `LICENSE-APACHE`, `LICENSE-BOOST`;
fmt `12.1.0` has `LICENSE`; glog `v0.3.5` has `COPYING`; Folly
`v2024.11.18.00` has `LICENSE`; SocketRocket `0.7.1` has `LICENSE` and
`LICENSE-examples`. None supplies a root NOTICE file. Folly's exact-tag
`NOTICE` URL also returned 404; its full LICENSE includes the extra terms.
DoubleConversion COPYING repeats its LICENSE terms; fast_float permits the MIT
alternative; SocketRocket's separate examples license does not cover source
selected by this prebuild. The manifest records this review and provenance hash.
Recheck the actual signed archive frameworks after rebuilding. The three
unresolved npm entries remain honest inventory gaps; an iOS production source-map
audit found none of those packages as executable modules, so they are not proven
shipped native dependencies.
