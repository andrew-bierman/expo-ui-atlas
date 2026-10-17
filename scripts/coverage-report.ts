import { writeFileSync } from 'node:fs';
import {
  catalog,
  contextualSwiftExports,
  inventory,
  supportExports,
} from '../src/entities/catalog-entry';

const lines = [
  '# Expo UI coverage',
  '',
  `Reviewed against installed \`@expo/ui ${inventory.version}\`. The atlas contains ${catalog.length} collections.`,
  '',
  '“Live” means the API is represented in a rendered specimen; it does not imply device runtime verification. Compound slots appear through their parent components. Modifier playgrounds show representative variations, not every possible modifier combination.',
  '',
  '## Collections',
  '',
  '| Family | Collection | Category | Exports |',
  '| --- | --- | --- | --- |',
];
for (const e of catalog)
  lines.push(
    `| ${e.family} | ${e.name} | ${e.category} | ${e.exports.join(', ')} |`,
  );
lines.push(
  '',
  '## Public runtime export audit',
  '',
  '| Family | Export | Coverage |',
  '| --- | --- | --- |',
);
for (const [family, exports] of Object.entries(inventory.families))
  for (const name of exports) {
    const entries = catalog.filter(
      (e) => e.family === family && e.exports.includes(name),
    );
    const description =
      family === 'swiftui' && contextualSwiftExports.has(name)
        ? 'Context note only — widget extension, newer OS geometry, or worklet transaction. See Specialized native contexts.'
        : entries.length
          ? `Live / compound: ${entries.map((e) => e.name).join('; ')}`
          : supportExports[family]?.[name];
    if (!description) throw new Error(`Unaccounted export: ${family}/${name}`);
    lines.push(`| ${family} | ${name} | ${description} |`);
  }
lines.push(
  '',
  '## Runtime boundaries',
  '',
  '- Universal icons intentionally render only on native platforms; web Icon returns no output.',
  '- AccessoryWidgetBackground needs a real widget extension and cannot run in Expo Go app content.',
  '- ArrangementView needs iOS 27.1; ConcentricRectangle and Liquid Glass appearance need iOS 26+. Specialized geometry and worklet orchestration are explained rather than simulated. Liquid Glass has a live specimen with native fallback on older iOS.',
  '- Compose DropdownMenu Preview is an iOS-oriented compatibility slot and is not a meaningful Android preview.',
  '- Runtime helper exports and native worklet utilities are described separately. Drop-in community replacement entrypoints are outside this three-family catalog.',
  '',
  '## Device smoke checklist',
  '',
  'Automated native checks live in `.maestro/`; see its README for dedicated-device setup and test scope. Typechecks and Hermes bundles establish import/API compatibility, not native runtime correctness. Test controls and native presentation on each supported platform before release.',
  '',
  'On SDK 58 Expo Go on each platform:',
  '',
  '1. Browse all families and search for Slider. Confirm the other native family shows its availability message.',
  '2. Change controls, text fields, selections, and sliders. Check echoed state; reset each specimen.',
  '3. Open and dismiss menus, dialogs, sheets, popovers, date/time pickers, tooltips, and snackbars. Try system Back and swipe dismissal.',
  '4. Scroll nested lists/carousels; pull to refresh; navigate within native stack/split/tab specimens and return to the catalog.',
  '5. Check light/dark appearance, larger text, landscape/tablet widths, narrow phones, keyboard visibility, and accessible labels.',
  '6. On iOS 26+, inspect Liquid Glass. Confirm OS-specific examples explain unsupported behavior on older systems.',
  '',
  '## Updating this report',
  '',
  'Run `bun scripts/ui-inventory.ts` after an intentional SDK upgrade, reconcile new exports, then `bun scripts/coverage-report.ts`. `bun test` fails if installed exports drift or metadata lacks renderer registration.',
  '',
);
writeFileSync('docs/coverage.md', lines.join('\n'));
