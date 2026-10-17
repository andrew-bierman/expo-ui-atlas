import * as S from '@expo/ui/swift-ui';
import type { Example, ExampleRegistry } from '../../../model/types';
import { SpecimenHost } from '../../specimen-host';
import { swiftuiContextNotes } from './swiftui/context';
import {
  Buttons,
  Feedback,
  Fields,
  Pickers,
  Ranges,
  Switches,
} from './swiftui/controls';
import { swiftuiControls } from './swiftui/controls-schema';
import { Links, Navigation, Split, Tabs } from './swiftui/navigation';
import { Dialogs, Form, Lists, Menus, Sheets } from './swiftui/presentation';
import {
  Charts,
  Empty,
  Glass,
  Interop,
  Layers,
  Layout,
  Modifiers,
  Scrolling,
  Shapes,
  Typography,
} from './swiftui/visual';

function Contexts() {
  return (
    <SpecimenHost style={{ height: 360 }}>
      <S.ScrollView>
        <S.VStack alignment="leading" spacing={18}>
          {Object.entries(swiftuiContextNotes).map(([name, note]) => (
            <S.VStack key={name} alignment="leading" spacing={6}>
              <S.Text>{name}</S.Text>
              <S.Text>{note}</S.Text>
            </S.VStack>
          ))}
        </S.VStack>
      </S.ScrollView>
    </SpecimenHost>
  );
}
const specimen = (
  id: keyof typeof swiftuiControls | 'contexts',
  title: string,
  description: string,
  component: Example['component'],
  code: string,
): Example[] => [
  {
    id,
    title,
    description,
    component,
    code,
    controls: id === 'contexts' ? undefined : swiftuiControls[id],
  },
];
export const nativeExamples: ExampleRegistry = {
  'swiftui-buttons': specimen(
    'styles',
    'Action styles',
    'Tap buttons to compare roles, prominent and bordered styles, sizes, and grouped actions.',
    Buttons,
    '<Button label="Continue" modifiers={[buttonStyle(\'borderedProminent\')]} onPress={handlePress} />',
  ),
  'swiftui-switches': specimen(
    'toggles',
    'Switching state',
    'The first two controls share React state; SyncToggle owns an observable native value.',
    Switches,
    'const state = useNativeState(false);\n<SyncToggle label="Native state" isOn={state} />',
  ),
  'swiftui-fields': specimen(
    'input',
    'Editable fields',
    'Try typing, multiline entry, and a secure field. Values remain in this specimen.',
    Fields,
    '<TextField placeholder="Name" onTextChange={setName} />\n<SecureField placeholder="Password" />',
  ),
  'swiftui-ranges': specimen(
    'ranges',
    'Continuous and discrete values',
    'Drag a stepped slider, tap the stepper, or try a restricted 25–75 range.',
    Ranges,
    '<Slider value={value} min={0} max={100} step={5} onValueChange={setValue} />',
  ),
  'swiftui-pickers': specimen(
    'pickers',
    'Native selection',
    'Change a shared period selection, choose an accent, and adjust a date.',
    Pickers,
    '<Picker selection={period} onSelectionChange={setPeriod}>\n  <Text modifiers={[tag("Day")]}>Day</Text>\n</Picker>',
  ),
  'swiftui-feedback': specimen(
    'feedback',
    'Progress you control',
    'Drag the slider to update multiple native progress representations.',
    Feedback,
    '<ProgressView value={progress} />\n<Gauge value={progress} modifiers={[gaugeStyle("circularCapacity")]} />',
  ),
  'swiftui-menus': specimen(
    'menus',
    'Tap and long press',
    'Choose menu actions and compare a nested menu to a contextual preview.',
    Menus,
    '<Menu label="Actions"><Button label="Favorite" onPress={favorite} /></Menu>',
  ),
  'swiftui-dialogs': specimen(
    'dialogs',
    'System decisions',
    'Present an alert or confirmation dialog and inspect cancellation and action roles.',
    Dialogs,
    '<Alert title="Reset?"><Alert.Trigger><Button label="Show" /></Alert.Trigger>...</Alert>',
  ),
  'swiftui-sheets': specimen(
    'presentations',
    'Adaptive presentations',
    'Open the sheet and drag its handle. A popover adapts to the device size class.',
    Sheets,
    '<BottomSheet isPresented={open} onIsPresentedChange={setOpen}>\n  <Group modifiers={[presentationDetents(["medium", "large"])]}>...</Group>\n</BottomSheet>',
  ),
  'swiftui-lists': specimen(
    'list',
    'Grouped, expandable, swipeable',
    'Expand advanced settings and swipe the last row left to reveal native actions.',
    Lists,
    '<List><Section title="Settings"><DisclosureGroup label="Advanced">...</DisclosureGroup></Section></List>',
  ),
  'swiftui-form': specimen(
    'form',
    'Profile form',
    'Observe native form grouping and edit the example fields.',
    Form,
    '<Form><Section title="Profile"><TextField placeholder="Name" /></Section></Form>',
  ),
  'swiftui-navigation': specimen(
    'stack',
    'A stack inside the specimen',
    'Push a screen, swipe back, and try the toolbar action. This stack is independent of catalog navigation.',
    Navigation,
    '<NavigationStack path={path} onPathChange={setPath}>\n  <NavigationLink value="detail">...</NavigationLink>\n  <NavigationDestination value="detail">...</NavigationDestination>\n</NavigationStack>',
  ),
  'swiftui-split': specimen(
    'split',
    'Adaptive columns',
    'Select a category from the sidebar. On compact devices, use the native sidebar control.',
    Split,
    '<NavigationSplitView><NavigationSplitView.Sidebar>...</NavigationSplitView.Sidebar><NavigationSplitView.Detail>...</NavigationSplitView.Detail></NavigationSplitView>',
  ),
  'swiftui-tabs': specimen(
    'tabs',
    'Native tab selection',
    'Tap the bottom bar or switch tabs from the example action.',
    Tabs,
    '<TabView selection={tab} onSelectionChange={setTab}><TabView.Tab value="explore" label="Explore">...</TabView.Tab></TabView>',
  ),
  'swiftui-links': specimen(
    'links',
    'Open or share',
    'The first action opens official docs; the second shows the system share sheet.',
    Links,
    '<Link label="Expo docs" destination="https://docs.expo.dev" />\n<ShareLink item="https://expo.dev"><Text>Share</Text></ShareLink>',
  ),
  'swiftui-typography': specimen(
    'text',
    'Type and symbols',
    'Compare Dynamic Type text, Markdown, SF Symbols, and a selectable monospace line.',
    Typography,
    '<Text modifiers={[font({ textStyle: "title2", weight: "bold" })]}>Title</Text>\n<Image systemName="heart.fill" />',
  ),
  'swiftui-empty': specimen(
    'empty',
    'Empty-state transition',
    'Toggle the empty library to see the native content-unavailable treatment.',
    Empty,
    '<ContentUnavailableView title="No saved examples" systemImage="bookmark" description="Save an example." />',
  ),
  'swiftui-charts': specimen(
    'chart',
    'Six native chart types',
    'Choose a chart type, change data, and toggle grid lines. Pie is shown as a donut.',
    Charts,
    '<Chart type="bar" data={[{ x: "Mon", y: 8 }]} animate showGrid />',
  ),
  'swiftui-layout': specimen(
    'layout',
    'Native layout primitives',
    'Compare stack alignment, a flexible spacer, overlapping views, and grid columns.',
    Layout,
    '<HStack><Text>Leading</Text><Spacer /><Text>Trailing</Text></HStack>\n<Grid><Grid.Row>...</Grid.Row></Grid>',
  ),
  'swiftui-scrolling': specimen(
    'scroll',
    'Two scrolling axes',
    'Swipe cards horizontally and scroll the native rows vertically inside bounded hosts.',
    Scrolling,
    '<ScrollView axes="horizontal"><LazyHStack>...</LazyHStack></ScrollView>',
  ),
  'swiftui-shapes': specimen(
    'shapes',
    'Shape geometry',
    'Adjust the radius to compare rounded and uneven corners with fixed primitive shapes.',
    Shapes,
    '<RoundedRectangle cornerRadius={radius} modifiers={[frame({ width: 65, height: 60 })]} />',
  ),
  'swiftui-layers': specimen(
    'layers',
    'Three composition slots',
    'Toggle between rectangular and capsule masks under overlay text and a native background.',
    Layers,
    '<Mask><Rectangle /><Mask.Content><Capsule /></Mask.Content></Mask>',
  ),
  'swiftui-modifiers': specimen(
    'modifiers',
    'Transform and state',
    'Drag to change geometry and opacity. Toggle disabled and placeholder presentation.',
    Modifiers,
    '<Label title="Transform me" modifiers={[rotationEffect(angle), scaleEffect(scale), opacity(alpha)]} />',
  ),
  'swiftui-glass': specimen(
    'glass',
    'Liquid Glass proximity',
    'Requires iOS 26+ for glass appearance. Drag to bring the symbol surfaces together.',
    Glass,
    '<Namespace id={id}><GlassEffectContainer><Image systemName="star.fill" modifiers={[glassEffect(), glassEffectId("star", id)]} /></GlassEffectContainer></Namespace>',
  ),
  'swiftui-interop': specimen(
    'interop',
    'An explicit native boundary',
    'React Native content is intentionally wrapped by RNHostView inside the native stack.',
    Interop,
    '<SpecimenHost><VStack><Text>SwiftUI</Text><RNHostView matchContents><View>...</View></RNHostView></VStack></SpecimenHost>',
  ),
  'swiftui-contexts': specimen(
    'contexts',
    'Specialized export notes',
    'Scroll the notes for public exports whose full context cannot be demonstrated by ordinary Expo Go app content.',
    Contexts,
    '// See src/features/explore-examples/ui/specimens/native/swiftui/context.ts for extension and OS constraints.',
  ),
};
