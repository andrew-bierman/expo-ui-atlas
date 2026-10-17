import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useId, useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { SpecimenHost } from '../../../specimen-host';
export function Typography() {
  const [large, setLarge] = useState(false);
  return (
    <SpecimenHost style={{ height: 310 }}>
      <S.VStack
        alignment="leading"
        spacing={16}
        modifiers={[M.padding({ all: 12 })]}
      >
        <S.Text
          modifiers={[
            M.font({
              textStyle: large ? 'largeTitle' : 'title2',
              weight: 'bold',
              design: 'serif',
            }),
          ]}
        >
          Native typography
        </S.Text>
        <S.Text markdownEnabled>
          **Bold**, *italic*, and [links](https://expo.dev) in Markdown.
        </S.Text>
        <S.Label title="SF Symbols + text" systemImage="sparkles" />
        <S.HStack spacing={20}>
          <S.Image systemName="heart.fill" color="#ad4b2c" size={32} />
          <S.Image systemName="wifi" variableValue={0.5} size={32} />
          <S.Text date={new Date()} dateStyle="date" />
        </S.HStack>
        <S.Text
          modifiers={[
            M.font({ design: 'monospaced', size: 18 }),
            M.textSelection(true),
          ]}
        >
          Selectable monospaced text
        </S.Text>
        <S.Toggle label="Larger title" isOn={large} onIsOnChange={setLarge} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Empty() {
  const [empty, setEmpty] = useState(true);
  return (
    <SpecimenHost style={{ height: 300 }}>
      <S.VStack spacing={10}>
        {empty ? (
          <S.ContentUnavailableView
            title="No saved examples"
            systemImage="bookmark"
            description="Save an example to find it here."
          />
        ) : (
          <S.Label
            title="Your library is ready"
            systemImage="checkmark.circle.fill"
          />
        )}
        <S.Button
          label={empty ? 'Populate library' : 'Show empty state'}
          onPress={() => setEmpty(!empty)}
        />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Charts() {
  const [type, setType] = useState<S.ChartType>('bar');
  const [grid, setGrid] = useState(true);
  const [boost, setBoost] = useState(false);
  const data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((x, i) => ({
    x,
    y: [8, 13, 10, 18, 14][i] + (boost ? 5 : 0),
  }));
  return (
    <SpecimenHost style={{ height: 400 }}>
      <S.VStack spacing={16} modifiers={[M.padding({ all: 12 })]}>
        <S.Picker
          label="Chart type"
          selection={type}
          onSelectionChange={setType}
        >
          {(['bar', 'line', 'area', 'point', 'pie', 'rectangle'] as const).map(
            (v) => (
              <S.Text key={v} modifiers={[M.tag(v)]}>
                {v}
              </S.Text>
            ),
          )}
        </S.Picker>
        <S.Chart
          type={type}
          data={data}
          showGrid={grid}
          showLegend={type === 'pie'}
          animate
          barStyle={{ cornerRadius: 5 }}
          pieStyle={{ innerRadius: 0.55, angularInset: 3 }}
          lineStyle={{ width: 3, pointStyle: 'circle' }}
          modifiers={[M.frame({ height: 210 })]}
        />
        <S.HStack spacing={20}>
          <S.Toggle label="Grid" isOn={grid} onIsOnChange={setGrid} />
          <S.Button label="Change data" onPress={() => setBoost(!boost)} />
        </S.HStack>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Layout() {
  const [wide, setWide] = useState(false);
  return (
    <SpecimenHost style={{ height: 280 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.HStack spacing={12}>
          <S.Label title="Leading" systemImage="circle" />
          <S.Spacer />
          <S.Text>Trailing</S.Text>
        </S.HStack>
        <S.Divider />
        <S.ZStack>
          <S.RoundedRectangle
            cornerRadius={16}
            modifiers={[
              M.foregroundStyle('#ead7ca'),
              M.frame({ width: wide ? 260 : 180, height: 70 }),
            ]}
          />
          <S.Text>Overlapping ZStack</S.Text>
        </S.ZStack>
        <S.Grid horizontalSpacing={24} verticalSpacing={12}>
          <S.Grid.Row>
            <S.Text>Renderer</S.Text>
            <S.Text>SwiftUI</S.Text>
          </S.Grid.Row>
          <S.Grid.Row>
            <S.Text>Layout</S.Text>
            <S.Text>Grid.Row</S.Text>
          </S.Grid.Row>
        </S.Grid>
        <S.Button label="Change width" onPress={() => setWide(!wide)} />
      </S.VStack>
    </SpecimenHost>
  );
}
const scrollItems = Array.from({ length: 100 }, (_, index) => index + 1);
const itemKey = (item: number) => String(item);
const renderCard = ({ item }: { item: number }) => (
  <S.Text
    modifiers={[
      M.padding({ all: 18 }),
      M.background('#ead7ca'),
      M.cornerRadius(12),
    ]}
  >{`Card ${item}`}</S.Text>
);
const renderRow = ({ item }: { item: number }) => (
  <S.Label title={`Native row ${item}`} systemImage="square.stack" />
);
export function Scrolling() {
  return (
    <SpecimenHost style={{ height: 310 }}>
      <S.VStack spacing={16}>
        <S.ScrollView axes="horizontal" modifiers={[M.frame({ height: 100 })]}>
          <S.LazyHStack spacing={12}>
            <S.LazyHStack.ForEach
              data={scrollItems}
              keyExtractor={itemKey}
              estimatedItemSize={110}
            >
              {renderCard}
            </S.LazyHStack.ForEach>
          </S.LazyHStack>
        </S.ScrollView>
        <S.ScrollView modifiers={[M.frame({ height: 190 })]}>
          <S.LazyVStack spacing={16}>
            <S.LazyVStack.ForEach
              data={scrollItems}
              keyExtractor={itemKey}
              estimatedItemSize={40}
            >
              {renderRow}
            </S.LazyVStack.ForEach>
          </S.LazyVStack>
        </S.ScrollView>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Shapes() {
  const [round, setRound] = useState(18);
  return (
    <SpecimenHost style={{ height: 300 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.HStack spacing={16}>
          <S.Rectangle
            modifiers={[
              M.frame({ width: 60, height: 60 }),
              M.foregroundStyle('#ad4b2c'),
            ]}
          />
          <S.RoundedRectangle
            cornerRadius={round}
            modifiers={[
              M.frame({ width: 65, height: 60 }),
              M.foregroundStyle('#246b4d'),
            ]}
          />
          <S.Circle
            modifiers={[
              M.frame({ width: 60, height: 60 }),
              M.foregroundStyle('#6552a3'),
            ]}
          />
        </S.HStack>
        <S.HStack spacing={16}>
          <S.Ellipse
            modifiers={[
              M.frame({ width: 70, height: 40 }),
              M.foregroundStyle('#6552a3'),
            ]}
          />
          <S.Capsule
            modifiers={[
              M.frame({ width: 70, height: 40 }),
              M.foregroundStyle('#246b4d'),
            ]}
          />
          <S.UnevenRoundedRectangle
            topLeadingRadius={round}
            bottomTrailingRadius={round}
            modifiers={[
              M.frame({ width: 60, height: 60 }),
              M.foregroundStyle('#ad4b2c'),
            ]}
          />
        </S.HStack>
        <S.Text>{`Corner radius: ${Math.round(round)}`}</S.Text>
        <S.Slider value={round} min={0} max={30} onValueChange={setRound} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Layers() {
  const [masked, setMasked] = useState(true);
  return (
    <SpecimenHost style={{ height: 230 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Background>
          <S.Overlay>
            <S.Mask>
              <S.Rectangle
                modifiers={[
                  M.frame({ width: 220, height: 100 }),
                  M.foregroundStyle('#ad4b2c'),
                ]}
              />
              <S.Mask.Content>
                {masked ? <S.Capsule /> : <S.Rectangle />}
              </S.Mask.Content>
            </S.Mask>
            <S.Overlay.Content>
              <S.Text
                modifiers={[
                  M.foregroundStyle('white'),
                  M.font({ weight: 'bold', size: 20 }),
                ]}
              >
                Overlay content
              </S.Text>
            </S.Overlay.Content>
          </S.Overlay>
          <S.Background.Content>
            <S.RoundedRectangle
              cornerRadius={18}
              modifiers={[M.foregroundStyle('#ead7ca')]}
            />
          </S.Background.Content>
        </S.Background>
        <S.Toggle label="Capsule mask" isOn={masked} onIsOnChange={setMasked} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Modifiers() {
  const [amount, setAmount] = useState(0.8);
  const [disabled, setDisabled] = useState(false);
  return (
    <SpecimenHost style={{ height: 310 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Label
          title="Transform me"
          systemImage="sparkles"
          modifiers={[
            M.font({ size: 24, weight: 'bold' }),
            M.padding({ all: 14 }),
            M.background('#ead7ca'),
            M.cornerRadius(16),
            M.rotationEffect((amount - 0.5) * 30),
            M.scaleEffect(0.7 + amount * 0.3),
            M.opacity(0.3 + amount * 0.7),
            M.shadow({ radius: 6, y: 3, color: '#00000025' }),
            M.accessibilityLabel('Interactive modifier specimen'),
          ]}
        />
        <S.Slider value={amount} onValueChange={setAmount} />
        <S.Toggle
          label="Disable action"
          isOn={disabled}
          onIsOnChange={setDisabled}
        />
        <S.Button
          label="Try disabled state"
          modifiers={[M.disabled(disabled), M.buttonStyle('borderedProminent')]}
        />
        <S.Text modifiers={disabled ? [M.redacted('placeholder')] : []}>
          Redacted placeholder follows toggle
        </S.Text>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Glass() {
  const id = useId();
  const [spacing, setSpacing] = useState(20);
  return (
    <SpecimenHost style={{ height: 240 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Namespace id={id}>
          <S.GlassEffectContainer spacing={30}>
            <S.HStack spacing={spacing}>
              {(['star.fill', 'heart.fill'] as const).map((symbol, i) => (
                <S.Image
                  key={symbol}
                  systemName={symbol}
                  size={26}
                  modifiers={[
                    M.padding({ all: 20 }),
                    M.glassEffect(),
                    M.glassEffectId(`symbol-${i}`, id),
                  ]}
                />
              ))}
            </S.HStack>
          </S.GlassEffectContainer>
        </S.Namespace>
        <S.Text>Liquid Glass blends nearby surfaces on iOS 26+.</S.Text>
        <S.Slider min={0} max={60} value={spacing} onValueChange={setSpacing} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Interop() {
  return (
    <SpecimenHost style={{ height: 170 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Text>SwiftUI surrounding an explicit React Native island</S.Text>
        <S.RNHostView matchContents>
          <View
            style={{
              padding: 16,
              backgroundColor: '#ead7ca',
              borderRadius: 12,
            }}
          >
            <RNText>React Native content via RNHostView</RNText>
          </View>
        </S.RNHostView>
      </S.VStack>
    </SpecimenHost>
  );
}
