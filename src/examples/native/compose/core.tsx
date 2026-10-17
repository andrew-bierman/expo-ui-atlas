import * as C from '@expo/ui/jetpack-compose';
import * as M from '@expo/ui/jetpack-compose/modifiers';
import { type ReactNode, useState } from 'react';
import { Text as RNText } from 'react-native';

export function Stage({
  children,
  height = 280,
}: {
  children: ReactNode;
  height?: number;
}) {
  return (
    <C.Host seedColor="#6552a3" style={{ height, width: '100%' }}>
      <C.Column
        modifiers={[M.fillMaxSize(), M.paddingAll(12)]}
        verticalArrangement={{ spacedBy: 12 }}
      >
        {children}
      </C.Column>
    </C.Host>
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
  const [count, setCount] = useState(0);
  const click = () => setCount(count + 1);
  return (
    <Stage height={440}>
      <C.Text>{`Action count: ${count}`}</C.Text>
      {[
        C.Button,
        C.FilledTonalButton,
        C.OutlinedButton,
        C.ElevatedButton,
        C.TextButton,
      ].map((Button, i) => (
        <Button key={i} onClick={click}>
          {['Filled', 'Tonal', 'Outlined', 'Elevated', 'Text'][i]}
        </Button>
      ))}
      <C.Button enabled={false}>Disabled</C.Button>
    </Stage>
  );
}
export function IconButtons() {
  const [n, setN] = useState(0);
  return (
    <Stage height={170}>
      <C.Text>{`Icon actions: ${n}`}</C.Text>
      <C.Row horizontalArrangement={{ spacedBy: 8 }}>
        {[
          C.IconButton,
          C.FilledIconButton,
          C.FilledTonalIconButton,
          C.OutlinedIconButton,
        ].map((B, i) => (
          <B key={i} onClick={() => setN(n + 1)}>
            <Mark />
          </B>
        ))}
      </C.Row>
    </Stage>
  );
}
export function FloatingActions() {
  const [n, setN] = useState(0);
  return (
    <Stage height={310}>
      <C.Text>{`Created ${n} items`}</C.Text>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        {[
          C.SmallFloatingActionButton,
          C.FloatingActionButton,
          C.LargeFloatingActionButton,
        ].map((B, i) => (
          <B key={i} onClick={() => setN(n + 1)}>
            <B.Icon>
              <Mark />
            </B.Icon>
          </B>
        ))}
      </C.Row>
      <C.ExtendedFloatingActionButton
        expanded={n % 2 === 0}
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
  const [on, setOn] = useState(true);
  const native = C.useNativeState(false);
  const [radio, setRadio] = useState(0);
  const [tri, setTri] = useState(0);
  return (
    <Stage height={440}>
      <C.Row verticalAlignment="center">
        <C.Checkbox value={on} onCheckedChange={setOn} />
        <C.Text>Include favorites</C.Text>
        <C.Switch value={on} onCheckedChange={setOn}>
          <C.Switch.ThumbContent>
            <C.Icon
              source={require('./spark.xml')}
              size={16}
              contentDescription="Enabled"
            />
          </C.Switch.ThumbContent>
        </C.Switch>
      </C.Row>
      <C.Row verticalAlignment="center">
        <C.TriStateCheckbox
          state={(['off', 'indeterminate', 'on'] as const)[tri]}
          onClick={() => setTri((tri + 1) % 3)}
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
          C.ToggleButton,
          C.IconToggleButton,
          C.FilledIconToggleButton,
          C.OutlinedIconToggleButton,
        ].map((B, i) => (
          <B key={i} checked={on} onCheckedChange={setOn}>
            {i === 0 ? <C.Text>Save</C.Text> : <Mark />}
          </B>
        ))}
      </C.FlowRow>
      <C.Checkbox value enabled={false} />
    </Stage>
  );
}
export function Segments() {
  const [single, setSingle] = useState(0);
  const [multi, setMulti] = useState([true, false, false]);
  return (
    <Stage height={220}>
      <C.Text>Single choice</C.Text>
      <C.SingleChoiceSegmentedButtonRow>
        {['Day', 'Week', 'Month'].map((label, i) => (
          <C.SegmentedButton
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
  const [selected, setSelected] = useState(false);
  const [input, setInput] = useState(true);
  const [message, setMessage] = useState('Choose an action');
  return (
    <Stage height={300}>
      <C.Text>{message}</C.Text>
      <C.FlowRow horizontalArrangement={{ spacedBy: 8 }}>
        <C.AssistChip onClick={() => setMessage('Assistant opened')}>
          <C.AssistChip.Label>
            <C.Text>Assist</C.Text>
          </C.AssistChip.Label>
          <C.AssistChip.LeadingIcon>
            <Mark />
          </C.AssistChip.LeadingIcon>
        </C.AssistChip>
        <C.FilterChip
          selected={selected}
          onClick={() => setSelected(!selected)}
        >
          <C.FilterChip.Label>
            <C.Text>{selected ? 'Favorites selected' : 'Favorites'}</C.Text>
          </C.FilterChip.Label>
        </C.FilterChip>
        {input && (
          <C.InputChip onClick={() => setInput(false)}>
            <C.InputChip.Label>
              <C.Text>Tap to remove</C.Text>
            </C.InputChip.Label>
          </C.InputChip>
        )}
        <C.SuggestionChip
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
  const [value, setValue] = useState(0.4);
  return (
    <Stage height={400}>
      <C.Text>{`Value: ${Math.round(value * 100)}%`}</C.Text>
      <C.Slider
        value={value}
        onValueChange={setValue}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.Slider
        value={value}
        steps={4}
        onValueChange={setValue}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.Slider value={0.65} enabled={false} modifiers={[M.fillMaxWidth()]} />
      <C.VerticalSlider
        value={value}
        onValueChange={setValue}
        reverseDirection
        modifiers={[M.height(150)]}
      />
    </Stage>
  );
}
export function Fields() {
  const [text, setText] = useState('');
  return (
    <Stage height={350}>
      <C.TextField
        onValueChange={setText}
        singleLine
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
        singleLine
        isError={text.length > 0 && text.length < 3}
        onValueChange={setText}
        modifiers={[M.fillMaxWidth()]}
      >
        <C.OutlinedTextField.Label>
          <C.Text>At least 3 characters</C.Text>
        </C.OutlinedTextField.Label>
      </C.OutlinedTextField>
      <C.BasicTextField
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
  const [p, setP] = useState(0.35);
  return (
    <Stage height={390}>
      <C.Slider value={p} onValueChange={setP} modifiers={[M.fillMaxWidth()]} />
      <C.LinearProgressIndicator progress={p} modifiers={[M.fillMaxWidth()]} />
      <C.LinearWavyProgressIndicator
        progress={p}
        modifiers={[M.fillMaxWidth()]}
      />
      <C.FlowRow
        horizontalArrangement={{ spacedBy: 12 }}
        verticalArrangement={{ spacedBy: 12 }}
      >
        <C.CircularProgressIndicator progress={p} />
        <C.CircularWavyProgressIndicator progress={p} />
        <C.CircularProgressIndicator />
        <C.LoadingIndicator />
        <C.ContainedLoadingIndicator />
      </C.FlowRow>
      <C.Text>{`${Math.round(p * 100)}% · drag to compare determinate indicators`}</C.Text>
    </Stage>
  );
}
export function Content() {
  const [selected, setSelected] = useState(false);
  return (
    <Stage height={460}>
      <C.Text style={{ typography: 'headlineSmall' }}>
        Material typography
      </C.Text>
      <C.Text style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
        Serif, italic, native text
      </C.Text>
      <C.Card>
        <C.Text modifiers={[M.paddingAll(12)]}>Filled card</C.Text>
      </C.Card>
      <C.ElevatedCard elevation={6}>
        <C.Text modifiers={[M.paddingAll(12)]}>Elevated card · 6 dp</C.Text>
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
  const [large, setLarge] = useState(false);
  return (
    <Stage height={300}>
      <C.Button onClick={() => setLarge(!large)}>Change size</C.Button>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        <C.Icon
          source={require('./spark.xml')}
          size={large ? 56 : 32}
          tint="#a5482c"
          contentDescription="Star vector"
        />
        <C.Image
          source={require('../../../../assets/icon.png')}
          contentScale="fit"
          contentDescription="Expo app icon"
          modifiers={[M.size(large ? 100 : 64, large ? 100 : 64)]}
        />
        <C.BadgedBox>
          <C.BadgedBox.Badge>
            <C.Badge>
              <C.Text>8</C.Text>
            </C.Badge>
          </C.BadgedBox.Badge>
          <C.IconButton onClick={() => setLarge(!large)}>
            <Mark />
          </C.IconButton>
        </C.BadgedBox>
      </C.Row>
      <C.Row horizontalArrangement={{ spacedBy: 12 }}>
        <C.Shape.Star color="#6552a3" modifiers={[M.size(60, 60)]} />
        <C.Shape.PillStar color="#ae4f32" modifiers={[M.size(60, 60)]} />
        <C.Shape.Polygon
          verticesCount={6}
          color="#33775d"
          modifiers={[M.size(60, 60)]}
        />
      </C.Row>
    </Stage>
  );
}
export function Layout() {
  const [visible, setVisible] = useState(true);
  return (
    <Stage height={370}>
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
          contentAlignment="center"
          modifiers={[M.fillMaxWidth(), M.height(80), M.background('#e8def8')]}
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
      <C.FlowRow horizontalArrangement={{ spacedBy: 8 }}>
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
  const [amount, setAmount] = useState(0.3);
  const [first, setFirst] = useState(true);
  return (
    <Stage height={330}>
      <C.Text>Modifier order changes the painted area.</C.Text>
      <C.Button onClick={() => setFirst(!first)}>
        Swap padding / background
      </C.Button>
      <C.Text
        color="#fff"
        modifiers={
          first
            ? [M.background('#6552a3'), M.paddingAll(24)]
            : [M.paddingAll(24), M.background('#6552a3')]
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
          M.clip(M.Shapes.RoundedCorner(16)),
          M.background('#e8def8'),
          M.border(1, '#6552a3'),
          M.paddingAll(16),
          M.rotate(amount * 20),
          M.alpha(0.4 + amount * 0.6),
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
      {(['primary', 'secondary', 'tertiary'] as const).map((role) => (
        <C.Text
          key={role}
          color={colors.onPrimary}
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
        · this Host uses a purple seed
      </C.Text>
    </C.Column>
  );
}
export function Palette() {
  const [dark, setDark] = useState(false);
  return (
    <C.Host
      seedColor="#6552a3"
      colorScheme={dark ? 'dark' : 'light'}
      style={{ height: 360, width: '100%' }}
    >
      <PaletteContent dark={dark} onToggle={() => setDark(!dark)} />
    </C.Host>
  );
}
