import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';
import { SpecimenHost } from '../../../specimen-host';

export function Buttons() {
  const [count, setCount] = useState(0);
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
          label="Prominent action"
          systemImage="sparkles"
          modifiers={[
            M.buttonStyle('borderedProminent'),
            M.controlSize('large'),
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
  return (
    <SpecimenHost style={{ height: 210 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Toggle
          label="Notifications"
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
  return (
    <SpecimenHost style={{ height: 250 }}>
      <S.VStack spacing={16} modifiers={[M.padding({ all: 12 })]}>
        <S.TextField
          placeholder="Your name"
          maxLength={40}
          onTextChange={setValue}
          modifiers={[M.textFieldStyle('roundedBorder'), M.submitLabel('done')]}
        />
        <S.TextField
          placeholder="Multiline notes"
          axis="vertical"
          modifiers={[M.textFieldStyle('roundedBorder'), M.lineLimit(3)]}
        />
        <S.SecureField
          placeholder="Password (demo only)"
          onTextChange={(v) => setSecret(v.length)}
          modifiers={[M.textFieldStyle('roundedBorder')]}
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
  return (
    <SpecimenHost style={{ height: 230 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Text>{`${Math.round(value)}% · ${editing ? 'Dragging' : 'At rest'}`}</S.Text>
        <S.Slider
          value={value}
          min={0}
          max={100}
          step={5}
          onValueChange={setValue}
          onEditingChanged={setEditing}
        />
        <S.Stepper
          label={`Quantity: ${value}`}
          min={0}
          max={100}
          step={5}
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
  return (
    <SpecimenHost style={{ height: 290 }}>
      <S.VStack spacing={20} modifiers={[M.padding({ all: 12 })]}>
        <S.Picker
          selection={choice}
          onSelectionChange={setChoice}
          modifiers={[M.pickerStyle('segmented')]}
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
          selection={color}
          onSelectionChange={setColor}
        />
        <S.DatePicker
          title="Date & time"
          selection={date}
          onDateChange={setDate}
          displayedComponents={['date', 'hourAndMinute']}
        />
        <S.Text
          modifiers={[M.foregroundStyle(color)]}
        >{`${choice} · ${color}`}</S.Text>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Feedback() {
  const [value, setValue] = useState(0.55);
  return (
    <SpecimenHost style={{ height: 290 }}>
      <S.VStack spacing={22} modifiers={[M.padding({ all: 12 })]}>
        <S.ProgressView value={value}>
          <S.Text>Determinate progress</S.Text>
        </S.ProgressView>
        <S.ProgressView>
          <S.Text>Loading</S.Text>
        </S.ProgressView>
        <S.HStack spacing={30}>
          <S.Gauge
            value={value}
            modifiers={[M.gaugeStyle('circularCapacity')]}
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
