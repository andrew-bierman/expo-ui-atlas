import * as C from '@expo/ui/jetpack-compose';
import * as M from '@expo/ui/jetpack-compose/modifiers';
import { type ReactNode, useState } from 'react';
import { Text as RNText } from 'react-native';
import { ControlId } from '../../../../model/control-identifiers';
import { useKnob } from '../../../../model/tuning';
import { SpecimenHost } from '../../../specimen-host';

enum CheckboxState {
  Off = 'off',
  Indeterminate = 'indeterminate',
  On = 'on',
}
const nextCheckboxState: Record<CheckboxState, CheckboxState> = {
  [CheckboxState.Off]: CheckboxState.Indeterminate,
  [CheckboxState.Indeterminate]: CheckboxState.On,
  [CheckboxState.On]: CheckboxState.Off,
};

export function Stage({
  children,
  height = 280,
}: {
  children: ReactNode;
  height?: number;
}) {
  return (
    <SpecimenHost style={{ height, width: '100%' }}>
      <C.Column
        modifiers={[M.fillMaxSize(), M.paddingAll(12)]}
        verticalArrangement={{ spacedBy: 12 }}
      >
        {children}
      </C.Column>
    </SpecimenHost>
  );
}
export function Mark() {
  return (
    <C.Icon
      source={require('./spark.xml')}
      size={24}
      contentDescription="Star"
    />
  );
}
export function Buttons() {
  const enabled = useKnob(ControlId.Enabled, true);
  const label = useKnob(ControlId.Label, 'Explore');
  const padding = useKnob(ControlId.Padding, 16);
  const custom = useKnob(ControlId.CustomColor, false);
  const radius = useKnob(ControlId.Radius, 24);
  const [count, setCount] = useState(0);
  const click = () => setCount(count + 1);
  return (
    <Stage height={340 + padding * 7}>
      <C.Text>{`Action count: ${count}`}</C.Text>
      {[
        { name: 'Button', component: C.Button },
        { name: 'FilledTonalButton', component: C.FilledTonalButton },
        { name: 'OutlinedButton', component: C.OutlinedButton },
        { name: 'ElevatedButton', component: C.ElevatedButton },
        { name: 'TextButton', component: C.TextButton },
      ].map(({ name, component: Button }, i) => (
        <Button
          key={name}
          onClick={click}
          enabled={enabled}
          contentPadding={{
            start: padding,
            end: padding,
            top: padding / 2,
            bottom: padding / 2,
          }}
          shape={C.Shape.RoundedCorner({
            cornerRadii: {
              topStart: radius,
              topEnd: radius,
              bottomStart: radius,
              bottomEnd: radius,
            },
          })}
          colors={
            custom
              ? { containerColor: '#236b55', contentColor: '#ffffff' }
              : undefined
          }
        >
          {`${['Filled', 'Tonal', 'Outlined', 'Elevated', 'Text'][i]} · ${label}`}
        </Button>
      ))}
      <C.Button enabled={false}>Disabled</C.Button>
    </Stage>
  );
}
export function IconButtons() {
  const enabled = useKnob(ControlId.Enabled, true);
  const size = useKnob(ControlId.Size, 48);
  const custom = useKnob(ControlId.CustomColor, false);
  const [n, setN] = useState(0);
  return (
    <Stage height={250}>
      <C.Text>{`Icon actions: ${n}`}</C.Text>
      <C.FlowRow horizontalArrangement={{ spacedBy: 8 }}>
        {[
          { name: 'IconButton', component: C.IconButton },
          { name: 'FilledIconButton', component: C.FilledIconButton },
          { name: 'FilledTonalIconButton', component: C.FilledTonalIconButton },
          { name: 'OutlinedIconButton', component: C.OutlinedIconButton },
        ].map(({ name, component: B }, i) => (
          <B
            key={name}
            enabled={enabled}
            modifiers={[M.size(size, size)]}
            colors={
              custom
                ? { containerColor: '#d7efe3', contentColor: '#236b55' }
                : undefined
            }
            onClick={() => setN(n + 1)}
          >
            <Mark />
          </B>
        ))}
      </C.FlowRow>
    </Stage>
  );
}
export function FloatingActions() {
  const expanded = useKnob(ControlId.Expanded, true);
  const custom = useKnob(ControlId.CustomColor, false);
  const [n, setN] = useState(0);
  return (
    <Stage height={310}>
      <C.Text>{`Created ${n} items`}</C.Text>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        {[
          {
            name: 'SmallFloatingActionButton',
            component: C.SmallFloatingActionButton,
          },
          { name: 'FloatingActionButton', component: C.FloatingActionButton },
          {
            name: 'LargeFloatingActionButton',
            component: C.LargeFloatingActionButton,
          },
        ].map(({ name, component: B }, i) => (
          <B
            key={name}
            containerColor={custom ? '#d7efe3' : undefined}
            onClick={() => setN(n + 1)}
          >
            <B.Icon>
              <Mark />
            </B.Icon>
          </B>
        ))}
      </C.Row>
      <C.ExtendedFloatingActionButton
        containerColor={custom ? '#d7efe3' : undefined}
        expanded={expanded}
        onClick={() => setN(n + 1)}
      >
        <C.ExtendedFloatingActionButton.Icon>
          <Mark />
        </C.ExtendedFloatingActionButton.Icon>
        <C.ExtendedFloatingActionButton.Text>
          <C.Text>Create item</C.Text>
        </C.ExtendedFloatingActionButton.Text>
      </C.ExtendedFloatingActionButton>
    </Stage>
  );
}
export function Selection() {
  const thumb = useKnob(ControlId.Thumb, true);
  const custom = useKnob(ControlId.CustomColor, false);
  const enabled = useKnob(ControlId.Enabled, true);
  const [on, setOn] = useState(true);
  const native = C.useNativeState(false);
  const [radio, setRadio] = useState(0);
  const [tri, setTri] = useState<CheckboxState>(CheckboxState.Off);
  return (
    <Stage height={440}>
      <C.Row verticalAlignment="center">
        <C.Checkbox enabled={enabled} value={on} onCheckedChange={setOn} />
        <C.Text>Include favorites</C.Text>
        <C.Switch
          colors={
            custom
              ? { checkedTrackColor: '#236b55', checkedThumbColor: '#ffffff' }
              : undefined
          }
          enabled={enabled}
          value={on}
          onCheckedChange={setOn}
        >
          {thumb && (
            <C.Switch.ThumbContent>
              <C.Icon
                source={require('./spark.xml')}
                size={16}
                contentDescription="Enabled"
              />
            </C.Switch.ThumbContent>
          )}
        </C.Switch>
      </C.Row>
      <C.Row verticalAlignment="center">
        <C.TriStateCheckbox
          enabled={enabled}
          state={tri}
          onClick={() => setTri(nextCheckboxState[tri])}
        />
        <C.Text>Cycle three states</C.Text>
      </C.Row>
      <C.FlowRow
        horizontalArrangement={{ spacedBy: 8 }}
        verticalArrangement={{ spacedBy: 8 }}
      >
        {[0, 1, 2].map((i) => (
          <C.RadioButton
            key={i}
            enabled={enabled}
            selected={radio === i}
            onClick={() => setRadio(i)}
          />
        ))}
        <C.RadioButton selected enabled={false} />
      </C.FlowRow>
      <C.Row>
        <C.SyncSwitch isOn={native} />
        <C.Text>Native state switch</C.Text>
      </C.Row>
      <C.FlowRow
        horizontalArrangement={{ spacedBy: 8 }}
        verticalArrangement={{ spacedBy: 8 }}
      >
        {[
          { name: 'ToggleButton', component: C.ToggleButton },
          { name: 'IconToggleButton', component: C.IconToggleButton },
          {
            name: 'FilledIconToggleButton',
            component: C.FilledIconToggleButton,
          },
          {
            name: 'OutlinedIconToggleButton',
            component: C.OutlinedIconToggleButton,
          },
        ].map(({ name, component: B }, i) => (
          <B
            key={name}
            colors={
              custom
                ? {
                    checkedContainerColor: '#236b55',
                    checkedContentColor: '#ffffff',
                  }
                : undefined
            }
            enabled={enabled}
            checked={on}
            onCheckedChange={setOn}
          >
            {i === 0 ? <C.Text>Save</C.Text> : <Mark />}
          </B>
        ))}
      </C.FlowRow>
      <C.Checkbox value enabled={false} />
    </Stage>
  );
}
export function Segments() {
  const enabled = useKnob(ControlId.Enabled, true);
  const custom = useKnob(ControlId.CustomColor, false);
  const colors = custom
    ? { activeContainerColor: '#d7efe3', activeContentColor: '#236b55' }
    : undefined;
  const [single, setSingle] = useState(0);
  const [multi, setMulti] = useState([true, false, false]);
  return (
    <Stage height={220}>
      <C.Text>Single choice</C.Text>
      <C.SingleChoiceSegmentedButtonRow>
        {['Day', 'Week', 'Month'].map((label, i) => (
          <C.SegmentedButton
            enabled={enabled}
            colors={colors}
            key={label}
            selected={single === i}
            onClick={() => setSingle(i)}
          >
            <C.SegmentedButton.Label>
              <C.Text>{label}</C.Text>
            </C.SegmentedButton.Label>
          </C.SegmentedButton>
        ))}
      </C.SingleChoiceSegmentedButtonRow>
      <C.MultiChoiceSegmentedButtonRow>
        {['Walk', 'Bike', 'Train'].map((label, i) => (
          <C.SegmentedButton
            enabled={enabled}
            colors={colors}
            key={label}
            checked={multi[i]}
            onCheckedChange={(v) =>
              setMulti(multi.map((x, j) => (i === j ? v : x)))
            }
          >
            <C.SegmentedButton.Label>
              <C.Text>{label}</C.Text>
            </C.SegmentedButton.Label>
          </C.SegmentedButton>
        ))}
      </C.MultiChoiceSegmentedButtonRow>
    </Stage>
  );
}
export function Chips() {
  const enabled = useKnob(ControlId.Enabled, true);
  const elevation = useKnob(ControlId.Elevation, 0);
  const border = useKnob(ControlId.Border, 1);
  const [selected, setSelected] = useState(false);
  const [input, setInput] = useState(true);
  const [message, setMessage] = useState('Choose an action');
  return (
    <Stage height={300}>
      <C.Text>{message}</C.Text>
      <C.FlowRow horizontalArrangement={{ spacedBy: 8 }}>
        <C.AssistChip
          enabled={enabled}
          elevation={elevation}
          border={{ width: border, color: '#6552a3' }}
          onClick={() => setMessage('Assistant opened')}
        >
          <C.AssistChip.Label>
            <C.Text>Assist</C.Text>
          </C.AssistChip.Label>
          <C.AssistChip.LeadingIcon>
            <Mark />
          </C.AssistChip.LeadingIcon>
        </C.AssistChip>
        <C.FilterChip
          enabled={enabled}
          elevation={elevation}
          border={{ width: border, color: '#6552a3' }}
          selected={selected}
          onClick={() => setSelected(!selected)}
        >
          <C.FilterChip.Label>
            <C.Text>{selected ? 'Favorites selected' : 'Favorites'}</C.Text>
          </C.FilterChip.Label>
        </C.FilterChip>
        {input && (
          <C.InputChip
            enabled={enabled}
            selected={selected}
            elevation={elevation}
            onClick={() => setInput(false)}
          >
            <C.InputChip.Label>
              <C.Text>Tap to remove</C.Text>
            </C.InputChip.Label>
          </C.InputChip>
        )}
        <C.SuggestionChip
          enabled={enabled}
          elevation={elevation}
          onClick={() => {
            setInput(true);
            setMessage('Input restored');
          }}
        >
          <C.SuggestionChip.Label>
            <C.Text>Restore input</C.Text>
          </C.SuggestionChip.Label>
        </C.SuggestionChip>
        <C.AssistChip enabled={false}>
          <C.AssistChip.Label>
            <C.Text>Disabled</C.Text>
          </C.AssistChip.Label>
        </C.AssistChip>
      </C.FlowRow>
    </Stage>
  );
}
export function Sliders() {
  const enabled = useKnob(ControlId.Enabled, true);
  const steps = useKnob(ControlId.Steps, 4);
  const max = useKnob(ControlId.Maximum, 1);
  const reverse = useKnob(ControlId.Reverse, true);
  const limited = useKnob(ControlId.Limited, false);
  const [value, setValue] = useState(0.4);
  return (
    <Stage height={400}>
      <C.Text>{`Value: ${Math.min(value, max).toFixed(2)} / ${max}`}</C.Text>
      <C.Slider
        value={Math.min(value, max)}
        enabled={enabled}
        max={max}
        onValueChange={setValue}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.Slider
        value={Math.min(value, max)}
        steps={steps}
        enabled={enabled}
        max={max}
        lowerLimit={limited ? max * 0.2 : undefined}
        upperLimit={limited ? max * 0.8 : undefined}
        onValueChange={setValue}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.Slider value={0.65} enabled={false} modifiers={[M.fillMaxWidth()]} />
      <C.VerticalSlider
        value={Math.min(value, max)}
        enabled={enabled}
        max={max}
        onValueChange={setValue}
        reverseDirection={reverse}
        modifiers={[M.height(150)]}
      />
    </Stage>
  );
}
export function Fields() {
  const enabled = useKnob(ControlId.Enabled, true);
  const readOnly = useKnob(ControlId.ReadOnly, false);
  const singleLine = useKnob(ControlId.SingleLine, true);
  const lines = useKnob(ControlId.Lines, 3);
  const isError = useKnob(ControlId.Error, false);
  const password = useKnob(ControlId.Password, false);
  const keyboard = useKnob<'text' | 'number' | 'email' | 'phone' | 'uri'>(
    ControlId.Keyboard,
    'text',
  );
  const props = {
    enabled,
    readOnly,
    singleLine,
    minLines: singleLine ? 1 : lines,
    maxLines: singleLine ? 1 : lines,
    visualTransformation: password ? ('password' as const) : ('none' as const),
    keyboardOptions: { keyboardType: keyboard },
  };
  const [text, setText] = useState('');
  return (
    <Stage height={singleLine ? 350 : 400 + lines * 75}>
      <C.TextField
        {...props}
        isError={isError}
        onValueChange={setText}
        modifiers={[M.fillMaxWidth()]}
      >
        <C.TextField.Label>
          <C.Text>Filled field</C.Text>
        </C.TextField.Label>
        <C.TextField.SupportingText>
          <C.Text>{`${text.length} characters`}</C.Text>
        </C.TextField.SupportingText>
      </C.TextField>
      <C.OutlinedTextField
        {...props}
        isError={isError || (text.length > 0 && text.length < 3)}
        onValueChange={setText}
        modifiers={[M.fillMaxWidth()]}
      >
        <C.OutlinedTextField.Label>
          <C.Text>At least 3 characters</C.Text>
        </C.OutlinedTextField.Label>
      </C.OutlinedTextField>
      <C.BasicTextField
        {...props}
        onValueChange={setText}
        modifiers={[M.border(1, '#6552a3'), M.paddingAll(16), M.fillMaxWidth()]}
      />
      <C.TextField enabled={false}>
        <C.TextField.Label>
          <C.Text>Disabled field</C.Text>
        </C.TextField.Label>
      </C.TextField>
    </Stage>
  );
}
export function Progress() {
  const determinate = useKnob(ControlId.Determinate, true);
  const width = useKnob(ControlId.StrokeWidth, 4);
  const gap = useKnob(ControlId.Gap, 4);
  const cap = useKnob<'round' | 'butt' | 'square'>(ControlId.Cap, 'round');
  const amplitude = useKnob(ControlId.Amplitude, 1);
  const wavelength = useKnob(ControlId.Wavelength, 24);
  const speed = useKnob(ControlId.Speed, 24);
  const [p, setP] = useState(0.35);
  return (
    <Stage height={390}>
      <C.Slider value={p} onValueChange={setP} modifiers={[M.fillMaxWidth()]} />
      <C.LinearProgressIndicator
        gapSize={gap}
        strokeCap={cap}
        progress={determinate ? p : undefined}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.LinearWavyProgressIndicator
        amplitude={amplitude}
        wavelength={wavelength}
        waveSpeed={speed}
        progress={determinate ? p : undefined}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.FlowRow
        horizontalArrangement={{ spacedBy: 12 }}
        verticalArrangement={{ spacedBy: 12 }}
      >
        <C.CircularProgressIndicator
          strokeWidth={width}
          gapSize={gap}
          strokeCap={cap}
          progress={determinate ? p : undefined}
        />
        <C.CircularWavyProgressIndicator
          amplitude={amplitude}
          wavelength={wavelength}
          waveSpeed={speed}
          progress={determinate ? p : undefined}
        />
        <C.CircularProgressIndicator />
        <C.LoadingIndicator />
        <C.ContainedLoadingIndicator />
      </C.FlowRow>
      <C.Text>{`${Math.round(p * 100)}% · drag to compare determinate indicators`}</C.Text>
    </Stage>
  );
}
export function Content() {
  const fontSize = useKnob(ControlId.FontSize, 24);
  const family = useKnob<'serif' | 'sans-serif' | 'monospace'>(
    ControlId.Family,
    'serif',
  );
  const italic = useKnob(ControlId.Italic, true);
  const elevation = useKnob(ControlId.Elevation, 6);
  const text = useKnob(ControlId.Text, 'Material typography');
  const [selected, setSelected] = useState(false);
  return (
    <Stage height={460}>
      <C.Text style={{ fontSize }}>{text}</C.Text>
      <C.Text
        style={{ fontFamily: family, fontStyle: italic ? 'italic' : 'normal' }}
      >
        Serif, italic, native text
      </C.Text>
      <C.Card>
        <C.Text modifiers={[M.paddingAll(12)]}>Filled card</C.Text>
      </C.Card>
      <C.ElevatedCard elevation={elevation}>
        <C.Text
          modifiers={[M.paddingAll(12)]}
        >{`Elevated card · ${elevation} dp`}</C.Text>
      </C.ElevatedCard>
      <C.OutlinedCard>
        <C.Text modifiers={[M.paddingAll(12)]}>Outlined card</C.Text>
      </C.OutlinedCard>
      <C.Surface
        checked={selected}
        onCheckedChange={setSelected}
        color={selected ? '#ddd4f3' : '#f2edf8'}
        shape={C.Shape.RoundedCorner({
          cornerRadii: { topStart: 24, bottomEnd: 24 },
        })}
      >
        <C.Text modifiers={[M.paddingAll(18)]}>
          {selected ? 'Selected surface' : 'Tap this toggleable surface'}
        </C.Text>
      </C.Surface>
      <C.ListItem>
        <C.ListItem.LeadingContent>
          <Mark />
        </C.ListItem.LeadingContent>
        <C.ListItem.HeadlineContent>
          <C.Text>Three-slot list item</C.Text>
        </C.ListItem.HeadlineContent>
        <C.ListItem.SupportingContent>
          <C.Text>Supporting context</C.Text>
        </C.ListItem.SupportingContent>
        <C.ListItem.TrailingContent>
          <C.Switch value={selected} onCheckedChange={setSelected} />
        </C.ListItem.TrailingContent>
      </C.ListItem>
    </Stage>
  );
}
export function Artwork() {
  const size = useKnob(ControlId.Size, 64);
  const scale = useKnob<
    | 'fit'
    | 'crop'
    | 'fillBounds'
    | 'inside'
    | 'none'
    | 'fillWidth'
    | 'fillHeight'
  >(ControlId.Scale, 'fit');
  const vertices = useKnob(ControlId.Vertices, 6);
  const rounding = useKnob(ControlId.Rounding, 0);
  const smoothing = useKnob(ControlId.Smoothing, 0);
  const inner = useKnob(ControlId.Inner, 0.5);
  const badge = useKnob(ControlId.Badge, '8');
  const [large, setLarge] = useState(false);
  return (
    <Stage height={400}>
      <C.Button onClick={() => setLarge(!large)}>Change size</C.Button>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        <C.Icon
          source={require('./spark.xml')}
          size={large ? size : size / 2}
          tint="#a5482c"
          contentDescription="Star vector"
        />
        <C.Image
          source={require('../../../../../../../assets/icon-atlas.png')}
          contentScale={scale}
          contentDescription="Expo app icon"
          modifiers={[M.size(size, size * 0.7)]}
        />
        <C.BadgedBox>
          <C.BadgedBox.Badge>
            <C.Badge>
              <C.Text>{badge}</C.Text>
            </C.Badge>
          </C.BadgedBox.Badge>
          <C.IconButton onClick={() => setLarge(!large)}>
            <Mark />
          </C.IconButton>
        </C.BadgedBox>
      </C.Row>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        <C.Shape.Star
          verticesCount={vertices}
          innerRadius={inner}
          cornerRounding={rounding}
          smoothing={smoothing}
          color="#6552a3"
          modifiers={[M.size(60, 60)]}
        />
        <C.Shape.PillStar
          verticesCount={vertices}
          innerRadius={inner}
          cornerRounding={rounding}
          smoothing={smoothing}
          color="#ae4f32"
          modifiers={[M.size(60, 60)]}
        />
        <C.Shape.Polygon
          verticesCount={vertices}
          cornerRounding={rounding}
          smoothing={smoothing}
          color="#33775d"
          modifiers={[M.size(60, 60)]}
        />
      </C.Row>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        <C.Shape.Circle color="#6552a3" modifiers={[M.size(60, 60)]} />
        <C.Shape.Pill color="#ae4f32" modifiers={[M.size(90, 60)]} />
        <C.Shape.Rectangle color="#33775d" modifiers={[M.size(60, 60)]} />
      </C.Row>
    </Stage>
  );
}
export function Layout() {
  const spacing = useKnob(ControlId.Spacing, 8);
  const alignment = useKnob<'topStart' | 'center' | 'bottomEnd'>(
    ControlId.Alignment,
    'center',
  );
  const height = useKnob(ControlId.Height, 80);
  const [visible, setVisible] = useState(true);
  return (
    <Stage height={490}>
      <C.Button onClick={() => setVisible(!visible)}>
        Toggle animated panel
      </C.Button>
      <C.AnimatedVisibility
        visible={visible}
        enterTransition={C.EnterTransition.fadeIn().plus(
          C.EnterTransition.expandVertically(),
        )}
        exitTransition={C.ExitTransition.fadeOut().plus(
          C.ExitTransition.shrinkVertically(),
        )}
      >
        <C.Box
          contentAlignment={alignment}
          modifiers={[
            M.fillMaxWidth(),
            M.height(height),
            M.background('#e8def8'),
          ]}
        >
          <C.Text>Box · centered</C.Text>
        </C.Box>
      </C.AnimatedVisibility>
      <C.Row modifiers={[M.fillMaxWidth()]}>
        <C.Text>Start</C.Text>
        <C.Spacer modifiers={[M.weight(1)]} />
        <C.VerticalDivider modifiers={[M.height(24)]} />
        <C.Text>End</C.Text>
      </C.Row>
      <C.HorizontalDivider />
      <C.FlowRow
        horizontalArrangement={{ spacedBy: spacing }}
        verticalArrangement={{ spacedBy: spacing }}
      >
        {['Flow', 'wraps', 'native', 'children', 'with', 'spacing'].map((s) => (
          <C.Text
            key={s}
            modifiers={[M.background('#e8def8'), M.paddingAll(8)]}
          >
            {s}
          </C.Text>
        ))}
      </C.FlowRow>
      <C.RNHostView matchContents>
        <RNText style={{ color: '#6552a3', padding: 8 }}>
          React Native island inside Compose
        </RNText>
      </C.RNHostView>
    </Stage>
  );
}
export function Modifiers() {
  const padding = useKnob(ControlId.Padding, 24);
  const radius = useKnob(ControlId.Radius, 16);
  const border = useKnob(ControlId.Border, 1);
  const rotation = useKnob(ControlId.Rotation, 6);
  const alpha = useKnob(ControlId.Alpha, 1);
  const [amount, setAmount] = useState(0.3);
  const [first, setFirst] = useState(true);
  return (
    <Stage height={440}>
      <C.Text>Modifier order changes the painted area.</C.Text>
      <C.Button onClick={() => setFirst(!first)}>
        Swap padding / background
      </C.Button>
      <C.Text
        color="#fff"
        modifiers={
          first
            ? [M.background('#6552a3'), M.paddingAll(padding)]
            : [M.paddingAll(padding), M.background('#6552a3')]
        }
      >
        Inspect my background
      </C.Text>
      <C.Slider
        value={amount}
        onValueChange={setAmount}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.Text
        modifiers={[
          M.clip(M.Shapes.RoundedCorner(radius)),
          M.background('#e8def8'),
          M.border(border, '#6552a3'),
          M.paddingAll(padding),
          M.rotate(rotation),
          M.alpha(alpha * (0.4 + amount * 0.6)),
        ]}
      >
        Clip · border · rotate · alpha
      </C.Text>
    </Stage>
  );
}

function PaletteContent({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const colors = C.useMaterialColors();
  return (
    <C.Column
      verticalArrangement={{ spacedBy: 12 }}
      modifiers={[
        M.fillMaxSize(),
        M.paddingAll(16),
        M.background(colors.surface),
      ]}
    >
      <C.Text color={colors.onSurface}>
        Host theme · {dark ? 'dark' : 'light'}
      </C.Text>
      <C.Button onClick={onToggle}>Switch theme</C.Button>
      {(
        [
          'primary',
          'secondary',
          'tertiary',
          'primaryContainer',
          'secondaryContainer',
          'tertiaryContainer',
          'error',
          'surfaceVariant',
        ] as const
      ).map((role) => (
        <C.Text
          key={role}
          color={
            role === 'secondary'
              ? colors.onSecondary
              : role === 'tertiary'
                ? colors.onTertiary
                : role === 'primaryContainer'
                  ? colors.onPrimaryContainer
                  : role === 'secondaryContainer'
                    ? colors.onSecondaryContainer
                    : role === 'tertiaryContainer'
                      ? colors.onTertiaryContainer
                      : role === 'error'
                        ? colors.onError
                        : role === 'surfaceVariant'
                          ? colors.onSurfaceVariant
                          : colors.onPrimary
          }
          modifiers={[
            M.fillMaxWidth(),
            M.background(colors[role]),
            M.paddingAll(12),
          ]}
        >
          {role}
        </C.Text>
      ))}
      <C.Text color={colors.onSurface}>
        {C.isDynamicColorAvailable
          ? 'Device supports dynamic colors'
          : 'Static baseline on this device'}{' '}
        · use Customize to change the Host seed
      </C.Text>
    </C.Column>
  );
}
export function Palette() {
  const [dark, setDark] = useState(false);
  return (
    <SpecimenHost
      seedColor="#6552a3"
      colorScheme={dark ? 'dark' : 'light'}
      style={{ height: 740, width: '100%' }}
    >
      <PaletteContent dark={dark} onToggle={() => setDark(!dark)} />
    </SpecimenHost>
  );
}
