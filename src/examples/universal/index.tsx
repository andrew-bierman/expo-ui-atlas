import type { ExampleRegistry } from '../../catalog/types';
import { Buttons, Pickers, Sliders, TextFields, Toggles } from './controls';
import { Icons } from './icon';
import { Sheet } from './presentation';
import {
  Disclosure,
  Interop,
  Layouts,
  Lists,
  Scrolling,
  SettingsForm,
  Typography,
} from './structure';
export const universalExamples: ExampleRegistry = {
  'u-button': [
    {
      id: 'variants',
      title: 'An action in four forms',
      description:
        'Add or remove points, reset the score, and compare a disabled button.',
      component: Buttons,
      code: '<Host matchContents>\n  <Button label="Add a point" variant="filled"\n    onPress={() => setScore(v => v + 1)} />\n</Host>',
    },
  ],
  'u-slider': [
    {
      id: 'ranges',
      title: 'Find your range',
      description:
        'Drag both sliders. The second moves in increments of 25; the last stays disabled.',
      component: Sliders,
      code: '<Slider value={value} onValueChange={setValue}\n  min={0} max={100} step={25} />',
    },
  ],
  'u-toggles': [
    {
      id: 'states',
      title: 'Small switches, clear choices',
      description:
        'Tap the active controls to change preferences. Compare disabled off and checked states.',
      component: Toggles,
    },
  ],
  'u-picker': [
    {
      id: 'appearance',
      title: 'One selection, two appearances',
      description:
        'Both pickers share state. Choose in one and watch the other follow.',
      component: Pickers,
    },
  ],
  'u-input': [
    {
      id: 'fields',
      title: 'Put it into words',
      description:
        'Type a name and submit with the keyboard. Try notes, secure input, or a JavaScript-driven update.',
      component: TextFields,
      code: "const text = useNativeState('');\n<TextInput value={text} onChangeText={setEcho} />\n// Update the native field without re-rendering React:\ntext.set('Hello from Atlas');",
    },
  ],
  'u-text': [
    {
      id: 'type',
      title: 'Type with character',
      description: 'Switch the title size and inspect the truncated line.',
      component: Typography,
    },
  ],
  'u-icon': [
    {
      id: 'symbols',
      title: 'Symbols across platforms',
      description:
        'Compare native symbols with size and color variations. These are native assets, not emoji.',
      component: Icons,
    },
  ],
  'u-layout': [
    {
      id: 'spacing',
      title: 'Give the layout room',
      description:
        'Toggle the gap between blocks. The second row uses a flexible spacer; a fixed spacer adds vertical room.',
      component: Layouts,
    },
  ],
  'u-collapsible': [
    {
      id: 'disclosure',
      title: 'Reveal a little more',
      description:
        'Tap the header to expand, then close the disclosure from inside its content.',
      component: Disclosure,
    },
  ],
  'u-fields': [
    {
      id: 'form',
      title: 'Preferences, grouped',
      description:
        'Change preferences inside the form. Scroll within the bounded native container.',
      component: SettingsForm,
    },
  ],
  'u-list': [
    {
      id: 'rows',
      title: 'Pick a route',
      description:
        'Tap any row; its trailing marker changes and the selection is echoed above.',
      component: Lists,
    },
  ],
  'u-scroll': [
    {
      id: 'horizontal',
      title: 'A wider world',
      description:
        'Swipe horizontally inside this bounded viewport to reveal more cards.',
      component: Scrolling,
    },
  ],
  'u-interop': [
    {
      id: 'bridge',
      title: 'Across the host boundary',
      description:
        'Inspect the React Native card nestled between two native text elements.',
      component: Interop,
      code: '<Host matchContents>\n  <Column>\n    <Text>Native UI</Text>\n    <RNHostView matchContents>\n      <View><RNText>React Native</RNText></View>\n    </RNHostView>\n  </Column>\n</Host>',
    },
  ],
  'u-sheet': [
    {
      id: 'detents',
      title: 'Room to unfold',
      description:
        'Open either configuration. Drag, dismiss, and reopen to compare sheet behavior.',
      component: Sheet,
    },
  ],
};
