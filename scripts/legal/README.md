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
