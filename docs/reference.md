# Bundled reference

Atlas owns interactive examples. Expo owns the API reference. Component details offer an offline Reference view rendered from the original versioned Markdown, with an Open official page action.

Run `bun run docs:sync` after installing the target SDK and Expo UI package. The script reads the installed versions, starts at the three versioned Expo UI family indexes, and follows Markdown links inside each family. It does not crawl the rest of Expo docs. Downloads have bounded concurrency and timeouts; an unsuccessful refresh leaves the previous bundle untouched.

The generated `src/entities/catalog-entry/data/reference/bundle.json` retains each original Markdown response, SHA-256 checksum, source and Markdown URLs, title, family, indexed API symbols, installed package version, SDK version, and fetch timestamp. Commit this generated snapshot with SDK upgrades. Tests check that the snapshot matches installed dependencies, that checksums match, and that every collection has a reference. CI does not download docs.

Collection matching uses official page titles and API headings against the collection's exported names. The family overview is always included. Some public exports have no dedicated page in the pinned documentation; those collections explicitly show the overview. Nothing is inferred or rewritten as API documentation.

The generic Shared Markdown reader handles headings, lists, code, tables and links using a JavaScript-only renderer, compatible with Expo Go. Display preparation removes frontmatter and agent-only instruction blocks while preserving the stored source and code examples. Bundled page links open locally; external and precise fragment links open their official URL and require connectivity. Images or media referenced remotely are not downloaded for offline use. Expo's Markdown often describes illustrations as text.

To integrate another Markdown source later, provide source URLs and Markdown content to the reader; it has no dependency on Expo's HTML layout. Avoid adding an alternate documentation database, rewritten API descriptions, background sync or runtime scraping.

Source: Expo documentation, https://docs.expo.dev/ (Expo's open-source documentation is maintained in https://github.com/expo/expo/tree/main/docs).
