# App Store listing and reviewer notes

Prepared copy for 1.0.0. Confirm naming/branding rights and name availability before using it. Do not paste instructions or unresolved fields into App Store Connect.

## Listing copy

**Name:** Expo UI Atlas

**Subtitle:** Explore native UI controls

**Primary category:** Developer Tools

**Secondary category:** Reference (optional)

**Primary language:** English (U.S.)

**Keywords:** swiftui,components,controls,interface,catalog,reference,react,native,design,developer

**Promotional text:** Explore live native controls, compare ready-made variations, and experiment with component settings. Includes bundled Expo UI reference pages.

**Description:**

Explore Expo UI through a hands-on catalog of native controls and component variations.

Browse by API family and category, search for a component or interaction, and try ready-made examples directly. Open Customize to experiment with supported props, modifiers, appearance, direction, width, and spacing. Reset an example whenever you want to start again.

On iPhone and iPad, universal Expo UI components and direct SwiftUI examples render as real native controls. Jetpack Compose collections explain their Android availability; they do not render Android controls on iOS.

The catalog includes buttons, pickers, text fields, forms, menus, sheets, navigation, charts, shapes, layouts, and more. Original version-matched Expo reference pages are bundled for offline reading, with links to the official documentation.

No account is required. Experiments stay in memory. The installed app runs on its own without Expo Go or a development server. External documentation links and remote media require an internet connection.

An independent developer reference by Andrew Bierman. Not affiliated with or endorsed by Expo or Apple. Component and OS availability vary; the catalog does not enumerate every possible native-framework modifier combination.

## App Review notes

Expo UI Atlas is an interactive reference utility for developers evaluating native UI behavior. The controls are the product: users compare ready-made variations, operate real native controls, and combine supported settings in a local playground. It is not a login-gated service, a WebView wrapper, or an app installer.

No account, purchase, subscription, special hardware, Expo Go installation, or development server is required. All executable examples ship in the binary; the JSON editor only accepts validated values for bundled controls and does not execute downloaded code. Experiments are temporary and Reset restores their starting state.

Suggested walkthrough:

1. Open Catalog. Use search for “Button” or expand Filters to choose Universal / Actions.
2. Open Button and tap Add a point. The score changes. Tap Reset example to restore it. Scroll to compare the ready-made variations.
3. Open Customize in the navigation bar. Change controls and preview settings. Apply the shown JSON unchanged or edit supported values; malformed/unsupported values produce a local validation message. Reset restores defaults.
4. Open Docs to read bundled original SDK-matched reference text in a separate sheet. Close with Done.
5. Return to Catalog and explore SwiftUI collections such as Swift Charts, menus, forms, and sheets. These are real iOS components; availability can depend on the OS version.
6. Open a Compose collection to see its explicit Android availability notice. Android-only examples are indexed for cross-platform reference and are intentionally not rendered on iOS.
7. Open Guide for scope, usage, and component context. Core examples and bundled documentation also work offline; external links/media require connectivity.

The app has no backend that reviewers need to start. iOS and Android use different platform entrypoints; Android runtime behavior is not part of the iOS submission. Documentation is attributed to Expo; include the actual bundled license notice and any requested rights documentation with the submission as applicable.

## Fields the owner must complete

- Public HTTPS Support URL and Privacy Policy URL (private GitHub links do not work).
- Copyright holder/year and any naming authorization.
- Reviewer contact name, email, phone; sign-in required: No.
- Exact processed 1.0.0 build number, screenshots, privacy/age-rating/content-rights answers, storefronts, price and release timing.
- App Store Connect numeric Apple ID in the production submit profile.

## Screenshot captions (optional)

Use actual standalone iOS captures: “Browse native controls”, “Compare ready-made variations”, “Experiment with supported settings”, “Try direct SwiftUI components”, “Read bundled reference pages”. Keep captions factual; don't imply Android controls run on iOS.
