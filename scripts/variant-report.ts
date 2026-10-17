import { ControlType } from '../src/features/explore-examples/model/control-identifiers';
import { composeControls } from '../src/features/explore-examples/ui/specimens/native/compose/controls-schema';
import { swiftuiControls } from '../src/features/explore-examples/ui/specimens/native/swiftui/controls-schema';
import { universalControls } from '../src/features/explore-examples/ui/specimens/universal/controls-schema';

const sections = {
  Universal: universalControls,
  SwiftUI: swiftuiControls,
  Compose: composeControls,
};
let report = `# Interactive variant coverage\n\nGenerated with \`bun scripts/variant-report.ts\` from the inspector schemas. There are 277 component-specific controls, plus five shared preview controls on every specimen: appearance, accent seed, layout direction, width, and padding. Controls change real supported props/modifiers. Component details enumerate enum choices, boolean states, and minimum/default/maximum numeric samples as ready-made variants; customization lives in the optional Playground. Dependent presets enable the related presentation mode. Local interactions remain usable after inspector changes; Reset restores the specimen.\n\nThis matrix records exposed controls, not every Cartesian combination or every framework modifier. Fixed comparisons also demonstrate additional states and components within a collection. Specialized SwiftUI contexts (widgets, advanced worklet orchestration, ArrangementView) retain explicit availability notes. Compose Material colors uses the shared Host controls and its own light/dark action. Android vector assets stay bundled; arbitrary user assets are not accepted. SF Symbol selection is iOS-only; uppercase field headers are Android-only. OS-dependent styles can adapt or be unavailable on older systems. Fraction/fixed-height universal sheets map to nearest half/full on Android.\n\nUse Customize for controls or edit/apply the JSON configuration. JSON validates known keys, enum values and types; numeric values clamp/snap to the supported range. Configurations live in memory per mounted specimen; they are not saved between app sessions. Recipes are starter snippets rather than generated code for the current configuration.\n`;
for (const [family, entries] of Object.entries(sections)) {
  report += `\n## ${family}\n\n| Collection | Controls and choices |\n| --- | --- |\n`;
  for (const [id, controls] of Object.entries(entries)) {
    report += `| ${id} | ${controls.map((control) => `${control.label}: ${control.type === ControlType.Select ? control.options.join(' / ') : control.type === ControlType.Range ? `${control.min}–${control.max}, step ${control.step}` : control.type === ControlType.Toggle ? 'on / off' : 'editable text'}`).join('; ')} |\n`;
  }
}
await Bun.write(new URL('../docs/variants.md', import.meta.url), report);
