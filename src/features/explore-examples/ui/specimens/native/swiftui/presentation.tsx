import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';
import { useKnob } from '../../../../model/tuning';
import { SpecimenHost } from '../../../specimen-host';
import { choices, useChoice } from './controls-schema';
export function Menus() {
  const [result, setResult] = useState('Choose an action');
  const style = useChoice(
    'menuStyle',
    ['automatic', 'button'] as const,
    'automatic',
  );
  const indicator = useChoice('indicator', choices.visibility, 'automatic');
  const dismiss = useChoice(
    'dismiss',
    ['automatic', 'disabled', 'enabled'] as const,
    'automatic',
  );
  const label = useKnob('label', 'Actions');
  return (
    <SpecimenHost style={{ height: 210 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Menu
          label={label}
          systemImage="ellipsis.circle"
          modifiers={[
            M.menuStyle(style),
            M.menuIndicator(indicator),
            M.menuActionDismissBehavior(dismiss),
          ]}
        >
          <S.Button
            label="Favorite"
            systemImage="star"
            onPress={() => setResult('Favorited')}
          />
          <S.Menu label="More">
            <S.Button
              label="Duplicate"
              onPress={() => setResult('Duplicated')}
            />
          </S.Menu>
          <S.Divider />
          <S.Button
            label="Remove"
            role="destructive"
            onPress={() => setResult('Removed')}
          />
        </S.Menu>
        <S.ContextMenu>
          <S.ContextMenu.Trigger>
            <S.Label
              title="Long press for context"
              systemImage="hand.tap"
              modifiers={[
                M.padding({ all: 14 }),
                M.background('#eee8e0'),
                M.cornerRadius(12),
              ]}
            />
          </S.ContextMenu.Trigger>
          <S.ContextMenu.Items>
            <S.Button label="Pin" onPress={() => setResult('Pinned')} />
            <S.Button label="Archive" onPress={() => setResult('Archived')} />
          </S.ContextMenu.Items>
          <S.ContextMenu.Preview>
            <S.Text>Native context preview</S.Text>
          </S.ContextMenu.Preview>
        </S.ContextMenu>
        <S.Text>{result}</S.Text>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Dialogs() {
  const [result, setResult] = useState('No action yet');
  const title = useKnob('title', 'Reset specimen?');
  const message = useKnob('message', 'This changes only this example.');
  const visibility = useChoice(
    'titleVisibility',
    choices.visibility,
    'visible',
  );
  return (
    <SpecimenHost style={{ height: 200 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Alert title={title}>
          <S.Alert.Trigger>
            <S.Button label="Show alert" />
          </S.Alert.Trigger>
          <S.Alert.Message>
            <S.Text>{message}</S.Text>
          </S.Alert.Message>
          <S.Alert.Actions>
            <S.Button
              label="Reset"
              role="destructive"
              onPress={() => setResult('Reset confirmed')}
            />
            <S.Button label="Cancel" role="cancel" />
          </S.Alert.Actions>
        </S.Alert>
        <S.ConfirmationDialog
          title="Choose a destination"
          titleVisibility={visibility}
        >
          <S.ConfirmationDialog.Trigger>
            <S.Button label="Confirmation dialog" />
          </S.ConfirmationDialog.Trigger>
          <S.ConfirmationDialog.Actions>
            <S.Button
              label="Personal"
              onPress={() => setResult('Personal selected')}
            />
            <S.Button label="Team" onPress={() => setResult('Team selected')} />
            <S.Button label="Cancel" role="cancel" />
          </S.ConfirmationDialog.Actions>
        </S.ConfirmationDialog>
        <S.Text>{result}</S.Text>
      </S.VStack>
    </SpecimenHost>
  );
}
export function Sheets() {
  const [open, setOpen] = useState(false);
  const [popover, setPopover] = useState(false);
  const sheetRadius = useKnob('sheetRadius', 24);
  const sheetSizing = useChoice(
    'sheetSizing',
    ['automatic', 'fitted', 'form', 'page'] as const,
    'automatic',
  );
  const backgroundInteraction = useChoice(
    'backgroundInteraction',
    ['automatic', 'enabled', 'disabled'] as const,
    'automatic',
  );
  const detent = useChoice('detents', choices.detents, 'medium + large');
  const fraction = useKnob('fraction', 0.5);
  const height = useKnob('height', 300);
  const indicator = useChoice('dragIndicator', choices.visibility, 'visible');
  const dismissDisabled = useKnob('dismissDisabled', false);
  const arrow = useChoice('arrow', choices.edge, 'none');
  const anchor = useChoice('anchor', choices.anchor, 'center');
  const detents: M.PresentationDetent[] =
    detent === 'medium + large'
      ? ['medium', 'large']
      : detent === 'fraction'
        ? [{ fraction }]
        : detent === 'height'
          ? [{ height }]
          : [detent];
  return (
    <SpecimenHost style={{ height: 160 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.BottomSheet
          isPresented={open}
          onIsPresentedChange={setOpen}
          anchor={
            <S.Button
              label="Open resizable sheet"
              onPress={() => setOpen(true)}
            />
          }
        >
          <S.Group
            modifiers={[
              M.presentationDetents(detents),
              M.presentationCornerRadius(sheetRadius),
              M.presentationSizing(sheetSizing),
              M.presentationBackgroundInteraction(backgroundInteraction),
              M.presentationDragIndicator(indicator),
              M.interactiveDismissDisabled(dismissDisabled),
            ]}
          >
            <S.VStack spacing={24} modifiers={[M.padding({ all: 24 })]}>
              <S.Text
                modifiers={[M.font({ textStyle: 'title2', weight: 'bold' })]}
              >
                A native sheet
              </S.Text>
              <S.Text>
                Use the inspector to choose sheet heights, then drag the handle.
              </S.Text>
              <S.Button label="Done" onPress={() => setOpen(false)} />
            </S.VStack>
          </S.Group>
        </S.BottomSheet>
        <S.Popover
          isPresented={popover}
          onIsPresentedChange={setPopover}
          arrowEdge={arrow}
          attachmentAnchor={anchor}
        >
          <S.Popover.Trigger>
            <S.Button label="Open popover" onPress={() => setPopover(true)} />
          </S.Popover.Trigger>
          <S.Popover.Content>
            <S.VStack spacing={18} modifiers={[M.padding({ all: 24 })]}>
              <S.Text>Popover adapts to available space.</S.Text>
              <S.Button label="Dismiss" onPress={() => setPopover(false)} />
            </S.VStack>
          </S.Popover.Content>
        </S.Popover>
      </S.VStack>
    </SpecimenHost>
  );
}
const listItems = [
  'A recycled row',
  'Another recycled row',
  'Stable native keys',
];
const rowKey = (item: string) => item;
const renderListRow = ({ item }: { item: string }) => <S.Text>{item}</S.Text>;
export function Lists() {
  const [expanded, setExpanded] = useState(false);
  const [on, setOn] = useState(true);
  const [status, setStatus] = useState('Swipe the row');
  const style = useChoice('listStyle', choices.list, 'insetGrouped');
  const spacing = useKnob('rowSpacing', 0);
  const separator = useKnob('separator', false);
  const fullSwipe = useKnob('fullSwipe', false);
  const backgroundHidden = useKnob('backgroundHidden', false);
  return (
    <SpecimenHost style={{ height: 360 }}>
      <S.List
        modifiers={[
          M.listStyle(style),
          M.listRowSpacing(spacing),
          M.scrollContentBackground(backgroundHidden ? 'hidden' : 'visible'),
        ]}
      >
        <S.Section
          title="Settings"
          footer={
            <S.Text>
              Native grouped list with disclosure and swipe actions.
            </S.Text>
          }
        >
          <S.Toggle label="Enabled" isOn={on} onIsOnChange={setOn} />
          <S.DisclosureGroup
            label="Advanced settings"
            isExpanded={expanded}
            onIsExpandedChange={setExpanded}
          >
            <S.Text>Additional content is now visible.</S.Text>
            <S.LabeledContent label="Mode">
              <S.Text>Interactive</S.Text>
            </S.LabeledContent>
          </S.DisclosureGroup>
          <S.SwipeActions>
            <S.Text
              modifiers={[M.listRowSeparator(separator ? 'hidden' : 'visible')]}
            >
              {status}
            </S.Text>
            <S.SwipeActions.Actions allowsFullSwipe={fullSwipe}>
              <S.Button
                label="Archive"
                onPress={() => setStatus('Archived — reset to try again')}
              />
              <S.Button
                label="Delete"
                role="destructive"
                onPress={() => setStatus('Deleted — reset to try again')}
              />
            </S.SwipeActions.Actions>
          </S.SwipeActions>
        </S.Section>
        <S.Section title="Data-driven rows">
          <S.List.ForEach data={listItems} keyExtractor={rowKey}>
            {renderListRow}
          </S.List.ForEach>
        </S.Section>
      </S.List>
    </SpecimenHost>
  );
}
export function Form() {
  const [on, setOn] = useState(false);
  const placeholder = useKnob('placeholder', 'Display name');
  const disabled = useKnob('disabled', false);
  const size = useChoice('size', choices.controlSize, 'regular');
  return (
    <SpecimenHost style={{ height: 270 }}>
      <S.Form modifiers={[M.disabled(disabled), M.controlSize(size)]}>
        <S.Section title="Profile">
          <S.TextField placeholder={placeholder} />
          <S.Toggle label="Private profile" isOn={on} onIsOnChange={setOn} />
        </S.Section>
        <S.Section title="About">
          <S.LabeledContent label="Renderer">
            <S.Text>SwiftUI</S.Text>
          </S.LabeledContent>
        </S.Section>
      </S.Form>
    </SpecimenHost>
  );
}
