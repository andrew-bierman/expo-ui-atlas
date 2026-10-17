import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useId, useRef, useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { ControlId } from '../../../../model/control-identifiers';
import { useKnob, useTunedState } from '../../../../model/tuning';
import { SpecimenHost } from '../../../specimen-host';
import { choices, useChoice } from './controls-schema';
export function Typography() {
  const [large, setLarge] = useState(false);
  const text = useKnob(ControlId.Text, 'Native typography');
  const dateText = useChoice(
    ControlId.DateText,
    ['timer', 'relative', 'offset', 'date', 'time'] as const,
    'date',
  );
  const truncation = useChoice(
    ControlId.Truncation,
    ['head', 'middle', 'tail'] as const,
    'tail',
  );
  const lines = useKnob(ControlId.Lines, 3);
  const textAlignment = useChoice(
    ControlId.TextAlignment,
    choices.alignment,
    'leading',
  );
  const [referenceDate] = useState(() => new Date());
  const effect = useChoice(ControlId.Effect, choices.effect, 'none');
  const effectSpeed = useKnob(ControlId.EffectSpeed, 1);
  const trigger = S.useNativeState<number | string | boolean>(0);
  const animationCount = useRef(0);
  const symbolModifiers =
    effect === 'none'
      ? []
      : [
          M.symbolEffect(
            { effect },
            { value: trigger, options: { speed: effectSpeed } },
          ),
        ];
  const textStyle = useChoice(ControlId.TextStyle, choices.textStyle, 'title2');
  const weight = useChoice(ControlId.Weight, choices.weight, 'bold');
  const design = useChoice(ControlId.Design, choices.design, 'serif');
  const italic = useKnob(ControlId.Italic, false);
  const selectable = useKnob(ControlId.Selectable, true);
  const labelStyle = useChoice(
    ControlId.LabelStyle,
    choices.label,
    'automatic',
  );
  const symbol = useChoice(ControlId.Symbol, choices.symbol, 'heart.fill');
  const symbolSize = useKnob(ControlId.SymbolSize, 32);
  const variable = useKnob(ControlId.Variable, 0.5);
  const kerning = useKnob(ControlId.Kerning, 0);
  return (
    <SpecimenHost style={{ height: 370 }}>
      <S.VStack
        alignment="leading"
        spacing={16}
        modifiers={[M.padding({ all: 12 })]}
      >
        <S.Text
          modifiers={[
            M.font({
              textStyle: large ? 'largeTitle' : textStyle,
              weight,
              design,
            }),
            M.kerning(kerning),
            M.truncationMode(truncation),
            M.lineLimit(lines),
            M.multilineTextAlignment(textAlignment),
            M.textSelection(selectable),
            ...(italic ? [M.italic()] : []),
          ]}
        >
          {text}
        </S.Text>
        <S.Text markdownEnabled>
          **Bold**, *italic*, and [links](https://expo.dev) in Markdown.
        </S.Text>
        <S.Label
          title="SF Symbols + text"
          systemImage="sparkles"
          modifiers={[M.labelStyle(labelStyle)]}
        />
        <S.HStack spacing={20}>
          <S.Image
            systemName={symbol}
            modifiers={symbolModifiers}
            color="#ad4b2c"
            size={symbolSize}
            variableValue={variable}
          />
          <S.Image
            systemName="wifi"
            variableValue={variable}
            size={symbolSize}
          />
          <S.Text date={referenceDate} dateStyle={dateText} />
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
        <S.Button
          label="Replay symbol effect"
          onPress={() => {
            const next = ++animationCount.current;
            trigger.set(next);
          }}
        />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Empty() {
  const [empty, setEmpty] = useState(true);
  const title = useKnob(ControlId.Title, 'No saved examples');
  const description = useKnob(
    ControlId.Description,
    'Save an example to find it here.',
  );
  return (
    <SpecimenHost style={{ height: 300 }}>
      <S.VStack spacing={10}>
        {empty ? (
          <S.ContentUnavailableView
            title={title}
            systemImage="bookmark"
            description={description}
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
  const type = useChoice(ControlId.ChartType, choices.chart, 'bar');
  const point = useChoice(ControlId.Point, choices.point, 'circle');
  const lineWidth = useKnob(ControlId.LineWidth, 3);
  const pointSize = useKnob(ControlId.PointSize, 30);
  const dashed = useKnob(ControlId.Dashed, false);
  const barRadius = useKnob(ControlId.BarRadius, 5);
  const barWidth = useKnob(ControlId.BarWidth, 24);
  const innerRadius = useKnob(ControlId.InnerRadius, 0.55);
  const angularInset = useKnob(ControlId.AngularInset, 3);
  const pieOpacity = useKnob(ControlId.PieOpacity, 0.8);
  const legend = useKnob(ControlId.Legend, true);
  const animate = useKnob(ControlId.Animate, true);
  const reference = useKnob(ControlId.Reference, false);
  const [grid, setGrid] = useState(true);
  const [boost, setBoost] = useState(false);
  const sampleData = [
    { x: 'Mon', y: 8 },
    { x: 'Tue', y: 13 },
    { x: 'Wed', y: 10 },
    { x: 'Thu', y: 18 },
    { x: 'Fri', y: 14 },
  ];
  const data = sampleData.map((point) => ({
    ...point,
    y: point.y + (boost ? 5 : 0),
  }));
  return (
    <SpecimenHost style={{ height: 400 }}>
      <S.VStack spacing={16} modifiers={[M.padding({ all: 12 })]}>
        <S.Text>{`Chart: ${type} · tune its native styling below`}</S.Text>
        <S.Chart
          type={type}
          data={data}
          showGrid={grid}
          showLegend={legend}
          animate={animate}
          barStyle={{ cornerRadius: barRadius, width: barWidth }}
          pieStyle={{
            innerRadius,
            angularInset,
            opacity: pieOpacity,
            cornerRadius: barRadius,
          }}
          lineStyle={{
            width: lineWidth,
            pointStyle: point,
            pointSize,
            dashArray: dashed ? [6, 4] : [],
          }}
          pointStyle={{ pointStyle: point, pointSize }}
          areaStyle={{ color: '#ad4b2c' }}
          rectangleStyle={{ color: '#ad4b2c', cornerRadius: barRadius }}
          referenceLines={reference ? [{ x: 'Mon', y: 12 }] : []}
          ruleStyle={{ lineWidth, dashArray: dashed ? [6, 4] : [] }}
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
  const alignment = useChoice(
    ControlId.Alignment,
    choices.alignment,
    'leading',
  );
  const spacing = useKnob(ControlId.Spacing, 20);
  const horizontal = useKnob(ControlId.GridHorizontal, 24);
  const vertical = useKnob(ControlId.GridVertical, 12);
  return (
    <SpecimenHost style={{ height: 280 }}>
      <S.VStack
        alignment={alignment}
        spacing={spacing}
        modifiers={[M.padding({ all: 12 })]}
      >
        <S.HStack spacing={spacing}>
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
        <S.Grid horizontalSpacing={horizontal} verticalSpacing={vertical}>
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
  const spacing = useKnob(ControlId.Spacing, 12);
  const indicators = useChoice(
    ControlId.Indicators,
    choices.scrollVisibility,
    'automatic',
  );
  const disabled = useKnob(ControlId.Disabled, false);
  const scrollModifiers = [
    M.scrollIndicators(indicators),
    M.scrollDisabled(disabled),
  ];
  return (
    <SpecimenHost style={{ height: 310 }}>
      <S.VStack spacing={16}>
        <S.ScrollView
          axes="horizontal"
          modifiers={[...scrollModifiers, M.frame({ height: 100 })]}
        >
          <S.LazyHStack spacing={spacing}>
            <S.LazyHStack.ForEach
              data={scrollItems}
              keyExtractor={itemKey}
              estimatedItemSize={110}
            >
              {renderCard}
            </S.LazyHStack.ForEach>
          </S.LazyHStack>
        </S.ScrollView>
        <S.ScrollView
          modifiers={[...scrollModifiers, M.frame({ height: 190 })]}
        >
          <S.LazyVStack spacing={spacing}>
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
  const [radius, setRadius] = useTunedState<number>(ControlId.Radius, 18);
  const width = useKnob(ControlId.Width, 60);
  const height = useKnob(ControlId.Height, 60);
  const capsuleStyle = useChoice(
    ControlId.CapsuleStyle,
    ['continuous', 'circular'] as const,
    'continuous',
  );
  const topTrailing = useKnob(ControlId.TopTrailing, 0);
  const bottomLeading = useKnob(ControlId.BottomLeading, 0);
  return (
    <SpecimenHost style={{ height: 480 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.HStack spacing={16}>
          <S.Rectangle
            modifiers={[
              M.frame({ width, height }),
              M.foregroundStyle('#ad4b2c'),
            ]}
          />
          <S.RoundedRectangle
            cornerRadius={radius}
            modifiers={[
              M.frame({ width, height }),
              M.foregroundStyle('#246b4d'),
            ]}
          />
          <S.Circle
            modifiers={[
              M.frame({ width, height }),
              M.foregroundStyle('#6552a3'),
            ]}
          />
        </S.HStack>
        <S.HStack spacing={16}>
          <S.Ellipse
            modifiers={[
              M.frame({ width: width + 10, height: height * 0.67 }),
              M.foregroundStyle('#6552a3'),
            ]}
          />
          <S.Capsule
            cornerStyle={capsuleStyle}
            modifiers={[
              M.frame({ width: width + 10, height: height * 0.67 }),
              M.foregroundStyle('#246b4d'),
            ]}
          />
          <S.UnevenRoundedRectangle
            topLeadingRadius={radius}
            topTrailingRadius={topTrailing}
            bottomLeadingRadius={bottomLeading}
            bottomTrailingRadius={radius}
            modifiers={[
              M.frame({ width, height }),
              M.foregroundStyle('#ad4b2c'),
            ]}
          />
        </S.HStack>
        <S.ZStack
          modifiers={[
            M.padding({ all: 10 }),
            M.background(
              '#ead7ca',
              M.shapes.roundedRectangle({ cornerRadius: radius + 10 }),
            ),
            M.containerShape(
              M.shapes.roundedRectangle({ cornerRadius: radius + 10 }),
            ),
          ]}
        >
          <S.ConcentricRectangle
            corners={{
              topLeadingCorner: S.EdgeCornerStyle.concentric(radius),
              topTrailingCorner: S.EdgeCornerStyle.fixed(topTrailing),
              bottomLeadingCorner: S.EdgeCornerStyle.fixed(bottomLeading),
              bottomTrailingCorner: S.EdgeCornerStyle.concentric(radius),
            }}
            modifiers={[
              M.frame({ width: width * 2, height }),
              M.foregroundStyle('#246b4d'),
            ]}
          />
        </S.ZStack>
        <S.Text>{`Corner radius: ${Math.round(radius)} · concentric shape requires iOS 26+`}</S.Text>
        <S.Slider value={radius} min={0} max={40} onValueChange={setRadius} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Layers() {
  const [masked, setMasked] = useState(true);
  const width = useKnob(ControlId.Width, 220);
  const height = useKnob(ControlId.Height, 100);
  const overlay = useKnob(ControlId.Overlay, 'Overlay content');
  return (
    <SpecimenHost style={{ height: 230 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Background>
          <S.Overlay>
            <S.Mask>
              <S.Rectangle
                modifiers={[
                  M.frame({ width, height }),
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
                {overlay}
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
  const rotation = useKnob(ControlId.Rotation, 0);
  const scale = useKnob(ControlId.Scale, 1);
  const opacity = useKnob(ControlId.Opacity, 1);
  const blur = useKnob(ControlId.Blur, 0);
  const shadow = useKnob(ControlId.Shadow, 6);
  const padding = useKnob(ControlId.Padding, 14);
  const corner = useKnob(ControlId.Corner, 16);
  const [disabled, setDisabled] = useState(false);
  return (
    <SpecimenHost style={{ height: 310 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Label
          title="Transform me"
          systemImage="sparkles"
          modifiers={[
            M.font({ size: 24, weight: 'bold' }),
            M.padding({ all: padding }),
            M.background('#ead7ca'),
            M.cornerRadius(corner),
            M.rotationEffect(rotation),
            M.scaleEffect(scale),
            M.opacity(opacity),
            M.blur(blur),
            M.shadow({ radius: shadow, y: 3, color: '#00000025' }),
            M.accessibilityLabel('Interactive modifier specimen'),
          ]}
        />
        <S.Text>
          Adjust rotation, scale, opacity, blur and shadow in the inspector.
        </S.Text>
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
  const variant = useChoice(ControlId.GlassStyle, choices.glass, 'regular');
  const interactive = useKnob(ControlId.Interactive, false);
  const threshold = useKnob(ControlId.Threshold, 30);
  const padding = useKnob(ControlId.Padding, 20);
  return (
    <SpecimenHost style={{ height: 240 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Namespace id={id}>
          <S.GlassEffectContainer spacing={threshold}>
            <S.HStack spacing={spacing}>
              {(['star.fill', 'heart.fill'] as const).map((symbol, i) => (
                <S.Image
                  key={symbol}
                  systemName={symbol}
                  size={26}
                  modifiers={[
                    M.padding({ all: padding }),
                    M.glassEffect({ glass: { variant, interactive } }),
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
  const padding = useKnob(ControlId.Padding, 16);
  const radius = useKnob(ControlId.Radius, 12);
  return (
    <SpecimenHost style={{ height: 170 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Text>SwiftUI surrounding an explicit React Native island</S.Text>
        <S.RNHostView matchContents>
          <View
            style={{
              padding,
              backgroundColor: '#ead7ca',
              borderRadius: radius,
            }}
          >
            <RNText>React Native content via RNHostView</RNText>
          </View>
        </S.RNHostView>
      </S.VStack>
    </SpecimenHost>
  );
}
