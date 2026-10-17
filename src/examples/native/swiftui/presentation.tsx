import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';
export function Menus() {
  const [result, setResult] = useState('Choose an action');
  return (
    <S.Host style={{ height: 210 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Menu label="Actions" systemImage="ellipsis.circle">
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
    </S.Host>
  );
}
export function Dialogs() {
  const [result, setResult] = useState('No action yet');
  return (
    <S.Host style={{ height: 200 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Alert title="Reset specimen?">
          <S.Alert.Trigger>
            <S.Button label="Show alert" />
          </S.Alert.Trigger>
          <S.Alert.Message>
            <S.Text>This changes only this example.</S.Text>
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
          titleVisibility="visible"
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
    </S.Host>
  );
}
export function Sheets() {
  const [open, setOpen] = useState(false);
  const [popover, setPopover] = useState(false);
  return (
    <S.Host style={{ height: 160 }}>
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
              M.presentationDetents(['medium', 'large']),
              M.presentationDragIndicator('visible'),
            ]}
          >
            <S.VStack spacing={24} modifiers={[M.padding({ all: 24 })]}>
              <S.Text
                modifiers={[M.font({ textStyle: 'title2', weight: 'bold' })]}
              >
                A native sheet
              </S.Text>
              <S.Text>
                Drag the handle to switch between medium and large.
              </S.Text>
              <S.Button label="Done" onPress={() => setOpen(false)} />
            </S.VStack>
          </S.Group>
        </S.BottomSheet>
        <S.Popover isPresented={popover} onIsPresentedChange={setPopover}>
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
    </S.Host>
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
  return (
    <S.Host style={{ height: 360 }}>
      <S.List modifiers={[M.listStyle('insetGrouped')]}>
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
            <S.Text>{status}</S.Text>
            <S.SwipeActions.Actions allowsFullSwipe={false}>
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
    </S.Host>
  );
}
export function Form() {
  const [on, setOn] = useState(false);
  return (
    <S.Host style={{ height: 270 }}>
      <S.Form>
        <S.Section title="Profile">
          <S.TextField placeholder="Display name" />
          <S.Toggle label="Private profile" isOn={on} onIsOnChange={setOn} />
        </S.Section>
        <S.Section title="About">
          <S.LabeledContent label="Renderer">
            <S.Text>SwiftUI</S.Text>
          </S.LabeledContent>
        </S.Section>
      </S.Form>
    </S.Host>
  );
}
