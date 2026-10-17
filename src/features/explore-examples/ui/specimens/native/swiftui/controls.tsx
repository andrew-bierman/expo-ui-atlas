import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';
import { useKnob } from '../../../../model/tuning';
import { SpecimenHost } from '../../../specimen-host';
import { choices, useChoice } from './controls-schema';

export function Buttons() {
  const [count, setCount] = useState(0);
  const borderShape = useChoice(
    'borderShape',
    choices.borderShape,
    'automatic',
  );
  const borderRadius = useKnob('borderRadius', 12);
  const style = useChoice(
    'buttonStyle',
    choices.buttonStyle,
    'borderedProminent',
  );
  const size = useChoice('size', choices.controlSize, 'regular');
  const role = useChoice('role', choices.role, 'default');
  const labelStyle = useChoice('labelStyle', choices.label, 'automatic');
  const label = useKnob('label', 'Try this action');
  const disabled = useKnob('disabled', false);
  return (
    <SpecimenHost style={{ height: 260 }}>
      <S.VStack spacing={16} modifiers={[M.padding({ all: 12 })]}>
        <S.Text>{`Pressed ${count} times`}</S.Text>
        <S.HStack spacing={12}>
          <S.Button label="Plain" onPress={() => setCount(count + 1)} />
          <S.Button
            label="Bordered"
            modifiers={[M.buttonStyle('bordered')]}
            onPress={() => setCount(count + 1)}
          />
        </S.HStack>
        <S.Button
          label={label}
          role={role}
          systemImage="sparkles"
          modifiers={[
            M.buttonStyle(style),
            M.buttonBorderShape(borderShape, borderRadius),
            M.controlSize(size),
            M.labelStyle(labelStyle),
            M.disabled(disabled),
          ]}
          onPress={() => setCount(count + 1)}
        />
        <S.HStack spacing={16}>
          <S.Button
            role="destructive"
            label="Destructive"
            onPress={() => setCount(0)}
          />
          <S.Button label="Disabled" modifiers={[M.disabled(true)]} />
        </S.HStack>
        <S.ControlGroup>
          <S.Button label="−" onPress={() => setCount(count - 1)} />
          <S.Button label="+" onPress={() => setCount(count + 1)} />
        </S.ControlGroup>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Switches() {
  const [on, setOn] = useState(true);
  const native = S.useNativeState(false);
  const style = useChoice('toggleStyle', choices.toggleStyle, 'switch');
  const size = useChoice('size', choices.controlSize, 'regular');
  const label = useKnob('label', 'Notifications');
  const disabled = useKnob('disabled', false);
  return (
    <SpecimenHost style={{ height: 210 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Toggle
          label={label}
          modifiers={[
            M.toggleStyle(style),
            M.controlSize(size),
            M.disabled(disabled),
          ]}
          systemImage="bell"
          isOn={on}
          onIsOnChange={setOn}
        />
        <S.Toggle
          label="Button toggle"
          isOn={on}
          onIsOnChange={setOn}
          modifiers={[M.toggleStyle('button')]}
        />
        <S.Toggle
          label="Unavailable"
          isOn={false}
          modifiers={[M.disabled(true)]}
        />
        <S.SyncToggle label="Native observable state" isOn={native} />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Fields() {
  const [value, setValue] = useState('');
  const [secret, setSecret] = useState(0);
  const style = useChoice('fieldStyle', choices.fieldStyle, 'roundedBorder');
  const keyboard = useChoice('keyboard', choices.keyboard, 'default');
  const submit = useChoice('submit', choices.submit, 'done');
  const axis = useChoice('axis', choices.axis, 'horizontal');
  const maxLength = useKnob('maxLength', 40);
  const autocorrection = useKnob('autocorrection', false);
  const disabled = useKnob('disabled', false);
  const placeholder = useKnob('placeholder', 'Your name');
  const modifiers = [
    M.textFieldStyle(style),
    M.keyboardType(keyboard),
    M.submitLabel(submit),
    M.autocorrectionDisabled(autocorrection),
    M.disabled(disabled),
  ];
  return (
    <SpecimenHost style={{ height: 280 }}>
      <S.VStack spacing={16} modifiers={[M.padding({ all: 12 })]}>
        <S.TextField
          placeholder={placeholder}
          axis={axis}
          maxLength={maxLength}
          onTextChange={setValue}
          modifiers={modifiers}
        />
        <S.TextField
          placeholder="Multiline notes"
          axis="vertical"
          modifiers={[...modifiers, M.lineLimit(3)]}
        />
        <S.SecureField
          placeholder="Password (demo only)"
          onTextChange={(v) => setSecret(v.length)}
          modifiers={modifiers}
        />
        <S.Text>
          {value ? `Hello, ${value}` : 'Type above to see a live response'}
        </S.Text>
        <S.Text>{`${secret} secure characters entered`}</S.Text>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Ranges() {
  const [value, setValue] = useState(40);
  const [editing, setEditing] = useState(false);
  const step = useKnob('step', 5);
  const disabled = useKnob('disabled', false);
  const labelsHidden = useKnob('labelsHidden', false);
  return (
    <SpecimenHost style={{ height: 230 }}>
      <S.VStack
        spacing={20}
        modifiers={[
          M.padding({ all: 12 }),
          M.disabled(disabled),
          ...(labelsHidden ? [M.labelsHidden()] : []),
        ]}
      >
        <S.Text>{`${Math.round(value)}% · ${editing ? 'Dragging' : 'At rest'}`}</S.Text>
        <S.Slider
          value={value}
          min={0}
          max={100}
          step={step}
          onValueChange={setValue}
          onEditingChanged={setEditing}
        />
        <S.Stepper
          label={`Quantity: ${value}`}
          min={0}
          max={100}
          step={step}
          value={value}
          onValueChange={setValue}
        />
        <S.Slider
          value={value}
          min={0}
          max={100}
          lowerLimit={25}
          upperLimit={75}
          onValueChange={setValue}
          label={<S.Text>Restricted to 25–75</S.Text>}
        />
      </S.VStack>
    </SpecimenHost>
  );
}
export function Pickers() {
  const [choice, setChoice] = useState('Day');
  const [color, setColor] = useState('#AD4B2C');
  const [date, setDate] = useState(new Date());
  const pickerStyle = useChoice('pickerStyle', choices.picker, 'segmented');
  const dateStyle = useChoice('dateStyle', choices.dateStyle, 'compact');
  const parts = useChoice('dateParts', choices.dateParts, 'both');
  const size = useChoice('size', choices.controlSize, 'regular');
  const opacity = useKnob('opacity', true);
  const bounded = useKnob('dateRange', false);
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 86400000);
  return (
    <SpecimenHost style={{ height: 640 }}>
      <S.NavigationStack>
        <S.ScrollView>
          <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
            <S.Picker
              label="Tunable period"
              selection={choice}
              onSelectionChange={setChoice}
              modifiers={[M.pickerStyle(pickerStyle), M.controlSize(size)]}
            >
              {['Day', 'Week', 'Month'].map((v) => (
                <S.Text key={v} modifiers={[M.tag(v)]}>
                  {v}
                </S.Text>
              ))}
            </S.Picker>
            <S.Picker
              label="Period"
              selection={choice}
              onSelectionChange={setChoice}
            >
              {['Day', 'Week', 'Month'].map((v) => (
                <S.Text key={v} modifiers={[M.tag(v)]}>
                  {v}
                </S.Text>
              ))}
            </S.Picker>
            <S.ColorPicker
              label="Accent color"
              supportsOpacity={opacity}
              selection={color}
              onSelectionChange={setColor}
            />
            <S.DatePicker
              title="Date & time"
              selection={date}
              onDateChange={setDate}
              displayedComponents={
                parts === 'both' ? ['date', 'hourAndMinute'] : [parts]
              }
              range={bounded ? { start: today, end: nextWeek } : undefined}
              modifiers={[M.datePickerStyle(dateStyle)]}
            />
            <S.Text
              modifiers={[M.foregroundStyle(color)]}
            >{`${choice} · ${color}`}</S.Text>
          </S.VStack>
        </S.ScrollView>
      </S.NavigationStack>
    </SpecimenHost>
  );
}
export function Feedback() {
  const [value, setValue] = useState(0.55);
  const progress = useChoice('progressStyle', choices.progress, 'linear');
  const gauge = useChoice('gaugeStyle', choices.gauge, 'circularCapacity');
  const size = useChoice('size', choices.controlSize, 'regular');
  const indeterminate = useKnob('indeterminate', false);
  return (
    <SpecimenHost style={{ height: 290 }}>
      <S.VStack spacing={22} modifiers={[M.padding({ all: 12 })]}>
        <S.ProgressView
          value={indeterminate ? undefined : value}
          modifiers={[M.progressViewStyle(progress), M.controlSize(size)]}
        >
          <S.Text>
            {indeterminate ? 'Indeterminate progress' : 'Determinate progress'}
          </S.Text>
        </S.ProgressView>
        <S.ProgressView>
          <S.Text>Loading</S.Text>
        </S.ProgressView>
        <S.HStack spacing={30}>
          <S.Gauge
            value={value}
            modifiers={[M.gaugeStyle(gauge), M.controlSize(size)]}
            currentValueLabel={<S.Text>{`${Math.round(value * 100)}`}</S.Text>}
          >
            <S.Text>Capacity</S.Text>
          </S.Gauge>
          <S.Gauge value={value} modifiers={[M.gaugeStyle('linear')]}>
            <S.Text>Level</S.Text>
          </S.Gauge>
        </S.HStack>
        <S.Slider value={value} onValueChange={setValue} />
      </S.VStack>
    </SpecimenHost>
  );
}
