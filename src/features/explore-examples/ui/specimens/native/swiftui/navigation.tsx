import * as S from '@expo/ui/swift-ui';
import * as M from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';
import { SpecimenHost } from '../../../specimen-host';
export function Navigation() {
  const [path, setPath] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  return (
    <SpecimenHost style={{ height: 380 }}>
      <S.NavigationStack path={path} onPathChange={setPath}>
        <S.Toolbar>
          <S.List
            modifiers={[
              M.navigationTitle('Mini catalog'),
              M.navigationBarTitleDisplayMode('inline'),
            ]}
          >
            <S.NavigationLink value="detail">
              <S.Label
                title="Open a native destination"
                systemImage="square.stack"
              />
            </S.NavigationLink>
            <S.Text>{`Toolbar tapped ${count} times`}</S.Text>
          </S.List>
          <S.Toolbar.Content>
            <S.ToolbarItem placement="topBarTrailing">
              <S.Button
                label="Add"
                systemImage="plus"
                onPress={() => setCount(count + 1)}
              />
            </S.ToolbarItem>
          </S.Toolbar.Content>
        </S.Toolbar>
        <S.NavigationDestination value="detail">
          <S.VStack
            spacing={24}
            modifiers={[
              M.navigationTitle('Destination'),
              M.padding({ all: 20 }),
            ]}
          >
            <S.Text>Swipe from the left edge or use Back.</S.Text>
            <S.Button
              label="Pop programmatically"
              onPress={() => setPath([])}
            />
          </S.VStack>
        </S.NavigationDestination>
      </S.NavigationStack>
    </SpecimenHost>
  );
}
export function Split() {
  const [selection, setSelection] = useState('Colors');
  const [compactColumn, setCompactColumn] =
    useState<S.NavigationSplitViewColumn>('sidebar');
  return (
    <SpecimenHost style={{ height: 380 }}>
      <S.NavigationSplitView
        preferredCompactColumn={compactColumn}
        onPreferredCompactColumnChange={setCompactColumn}
      >
        <S.NavigationSplitView.Sidebar>
          <S.List modifiers={[M.navigationTitle('Library')]}>
            {['Colors', 'Shapes', 'Controls'].map((item) => (
              <S.Button
                key={item}
                label={item}
                onPress={() => {
                  setSelection(item);
                  setCompactColumn('detail');
                }}
              />
            ))}
          </S.List>
        </S.NavigationSplitView.Sidebar>
        <S.NavigationSplitView.Detail>
          <S.VStack spacing={20}>
            <S.Text modifiers={[M.font({ textStyle: 'title' })]}>
              {selection}
            </S.Text>
            <S.Text>
              Columns expand on iPad; use the sidebar control on iPhone.
            </S.Text>
          </S.VStack>
        </S.NavigationSplitView.Detail>
      </S.NavigationSplitView>
    </SpecimenHost>
  );
}
export function Tabs() {
  const [tab, setTab] = useState('one');
  return (
    <SpecimenHost style={{ height: 290 }}>
      <S.TabView selection={tab} onSelectionChange={setTab}>
        <S.TabView.Tab
          value="one"
          label="Explore"
          systemImage="square.grid.2x2"
        >
          <S.VStack spacing={20}>
            <S.Text>Explore tab</S.Text>
            <S.Button label="Switch to Saved" onPress={() => setTab('two')} />
          </S.VStack>
        </S.TabView.Tab>
        <S.TabView.Tab value="two" label="Saved" systemImage="bookmark">
          <S.Text>Saved tab · switch using the native bar</S.Text>
        </S.TabView.Tab>
      </S.TabView>
    </SpecimenHost>
  );
}
export function Links() {
  return (
    <SpecimenHost style={{ height: 150 }}>
      <S.VStack spacing={24} modifiers={[M.padding({ all: 12 })]}>
        <S.Link
          label="Open Expo UI documentation"
          destination="https://docs.expo.dev/versions/v58.0.0/sdk/ui/"
        />
        <S.ShareLink
          item="https://docs.expo.dev/versions/v58.0.0/sdk/ui/"
          subject="Expo UI"
        >
          <S.Label
            title="Share documentation"
            systemImage="square.and.arrow.up"
          />
        </S.ShareLink>
      </S.VStack>
    </SpecimenHost>
  );
}
