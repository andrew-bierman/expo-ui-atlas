import * as C from '@expo/ui/jetpack-compose';
import * as M from '@expo/ui/jetpack-compose/modifiers';
import { useEffect, useRef, useState } from 'react';
import { useKnob } from '../../../../model/tuning';
import { Mark, Stage } from './core';
export function Dialogs() {
  const outside = useKnob('outside', true);
  const back = useKnob('back', true);
  const handle = useKnob('handle', true);
  const gestures = useKnob('gestures', true);
  const skip = useKnob('skipPartial', false);
  const [open, setOpen] = useState('');
  const [result, setResult] = useState('No choice yet');
  return (
    <Stage height={300}>
      <C.Text>{result}</C.Text>
      {['Alert', 'Basic', 'Sheet'].map((name) => (
        <C.Button
          key={name}
          onClick={() => setOpen(name)}
        >{`Open ${name.toLowerCase()}`}</C.Button>
      ))}
      {open === 'Alert' && (
        <C.AlertDialog
          properties={{
            dismissOnBackPress: back,
            dismissOnClickOutside: outside,
          }}
          onDismissRequest={() => setOpen('')}
        >
          <C.AlertDialog.Title>
            <C.Text>Save this exploration?</C.Text>
          </C.AlertDialog.Title>
          <C.AlertDialog.Text>
            <C.Text>
              Dialogs provide focused decisions and support Android back
              dismissal.
            </C.Text>
          </C.AlertDialog.Text>
          <C.AlertDialog.ConfirmButton>
            <C.TextButton
              onClick={() => {
                setResult('Saved');
                setOpen('');
              }}
            >
              Save
            </C.TextButton>
          </C.AlertDialog.ConfirmButton>
          <C.AlertDialog.DismissButton>
            <C.TextButton onClick={() => setOpen('')}>Cancel</C.TextButton>
          </C.AlertDialog.DismissButton>
        </C.AlertDialog>
      )}
      {open === 'Basic' && (
        <C.BasicAlertDialog
          properties={{
            dismissOnBackPress: back,
            dismissOnClickOutside: outside,
          }}
          onDismissRequest={() => setOpen('')}
        >
          <C.Surface
            shape={C.Shape.RoundedCorner({
              cornerRadii: {
                topStart: 24,
                topEnd: 24,
                bottomStart: 24,
                bottomEnd: 24,
              },
            })}
          >
            <C.Column modifiers={[M.paddingAll(24)]}>
              <C.Text>Custom dialog content</C.Text>
              <C.Button onClick={() => setOpen('')}>Done</C.Button>
            </C.Column>
          </C.Surface>
        </C.BasicAlertDialog>
      )}
      {open === 'Sheet' && (
        <C.ModalBottomSheet
          showDragHandle={handle}
          sheetGesturesEnabled={gestures}
          skipPartiallyExpanded={skip}
          properties={{
            shouldDismissOnBackPress: back,
            shouldDismissOnClickOutside: outside,
          }}
          onDismissRequest={() => setOpen('')}
        >
          <C.Column
            modifiers={[M.paddingAll(24)]}
            verticalArrangement={{ spacedBy: 16 }}
          >
            <C.Text style={{ typography: 'headlineSmall' }}>
              A native bottom sheet
            </C.Text>
            <C.Text>Drag the handle or tap outside to dismiss.</C.Text>
            <C.Button onClick={() => setOpen('')}>Done</C.Button>
          </C.Column>
        </C.ModalBottomSheet>
      )}
    </Stage>
  );
}
export function Menus() {
  const enabled = useKnob('enabled', true);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState('Comfort');
  return (
    <Stage height={280}>
      <C.DropdownMenu>
        <C.DropdownMenu.Trigger>
          <C.Button>Open anchored menu</C.Button>
        </C.DropdownMenu.Trigger>
        <C.DropdownMenu.Items>
          {['Compact', 'Comfort', 'Spacious'].map((s) => (
            <C.DropdownMenuItem
              enabled={enabled}
              key={s}
              onClick={() => setSelected(s)}
            >
              <C.DropdownMenuItem.Text>
                <C.Text>{s}</C.Text>
              </C.DropdownMenuItem.Text>
            </C.DropdownMenuItem>
          ))}
        </C.DropdownMenu.Items>
      </C.DropdownMenu>
      <C.Text>{`Density: ${selected}`}</C.Text>
      <C.ExposedDropdownMenuBox
        expanded={expanded}
        onExpandedChange={setExpanded}
      >
        <C.Text
          modifiers={[
            M.menuAnchor(),
            M.border(1, '#6552a3'),
            M.paddingAll(18),
            M.fillMaxWidth(),
          ]}
        >{`${selected} ▾`}</C.Text>
        <C.ExposedDropdownMenu
          expanded={expanded}
          onDismissRequest={() => setExpanded(false)}
        >
          {['Compact', 'Comfort', 'Spacious'].map((s) => (
            <C.DropdownMenuItem
              enabled={enabled}
              key={s}
              onClick={() => {
                setSelected(s);
                setExpanded(false);
              }}
            >
              <C.DropdownMenuItem.Text>
                <C.Text>{s}</C.Text>
              </C.DropdownMenuItem.Text>
            </C.DropdownMenuItem>
          ))}
        </C.ExposedDropdownMenu>
      </C.ExposedDropdownMenuBox>
    </Stage>
  );
}
export function Search() {
  const placeholder = useKnob('placeholder', 'Search the catalog');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  return (
    <Stage height={310}>
      <C.SearchBar onSearch={setSubmitted} modifiers={[M.fillMaxWidth()]}>
        <C.SearchBar.Placeholder>
          <C.Text>{placeholder}</C.Text>
        </C.SearchBar.Placeholder>
        <C.SearchBar.ExpandedFullScreenSearchBar>
          <C.Text modifiers={[M.paddingAll(20)]}>
            Try a query, then submit with the keyboard.
          </C.Text>
        </C.SearchBar.ExpandedFullScreenSearchBar>
      </C.SearchBar>
      <C.Text>
        {submitted
          ? `Submitted: ${submitted}`
          : 'Submit to inspect the search event'}
      </C.Text>
      <C.DockedSearchBar
        onQueryChange={setQuery}
        modifiers={[M.fillMaxWidth()]}
      >
        <C.DockedSearchBar.Placeholder>
          <C.Text>{placeholder}</C.Text>
        </C.DockedSearchBar.Placeholder>
        <C.DockedSearchBar.LeadingIcon>
          <Mark />
        </C.DockedSearchBar.LeadingIcon>
        {['Buttons', 'Cards', 'Chips']
          .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
          .map((s) => (
            <C.Text key={s} modifiers={[M.paddingAll(12)]}>
              {s}
            </C.Text>
          ))}
      </C.DockedSearchBar>
    </Stage>
  );
}
export function Navigation() {
  const labels = useKnob('labels', true);
  const enabled = useKnob('enabled', true);
  const variant = useKnob<'standard' | 'vibrant'>('variant', 'vibrant');
  const elevation = useKnob('elevation', 3);
  const [tab, setTab] = useState(0);
  const [action, setAction] = useState('Ready');
  return (
    <Stage height={280}>
      <C.Text>{`${['Explore', 'Saved', 'Settings'][tab]} destination · ${action}`}</C.Text>
      <C.NavigationBar tonalElevation={elevation}>
        {['Explore', 'Saved', 'Settings'].map((s, i) => (
          <C.NavigationBarItem
            alwaysShowLabel={labels}
            enabled={enabled}
            key={s}
            selected={tab === i}
            onClick={() => setTab(i)}
          >
            <C.NavigationBarItem.Icon>
              <Mark />
            </C.NavigationBarItem.Icon>
            <C.NavigationBarItem.Label>
              <C.Text>{s}</C.Text>
            </C.NavigationBarItem.Label>
          </C.NavigationBarItem>
        ))}
      </C.NavigationBar>
      <C.HorizontalFloatingToolbar variant={variant}>
        <C.IconButton onClick={() => setAction('Editing')}>
          <Mark />
        </C.IconButton>
        <C.IconButton onClick={() => setAction('Sharing')}>
          <Mark />
        </C.IconButton>
        <C.HorizontalFloatingToolbar.FloatingActionButton
          onPress={() => setAction('Created')}
        >
          <Mark />
        </C.HorizontalFloatingToolbar.FloatingActionButton>
      </C.HorizontalFloatingToolbar>
    </Stage>
  );
}
export function Pager() {
  const spacing = useKnob('spacing', 12);
  const padding = useKnob('padding', 0);
  const scroll = useKnob('scroll', true);
  const reverse = useKnob('reverse', false);
  const [page, setPage] = useState(0);
  const ref = useRef<C.HorizontalPagerHandle>(null);
  return (
    <Stage height={270}>
      <C.Text>{`Page ${page + 1} of 4 · swipe horizontally`}</C.Text>
      <C.HorizontalPager
        ref={ref}
        pageSpacing={spacing}
        contentPadding={padding}
        userScrollEnabled={scroll}
        reverseLayout={reverse}
        onSettledPageChange={setPage}
        modifiers={[M.fillMaxWidth(), M.height(140)]}
      >
        {['Discover', 'Experiment', 'Compare', 'Build'].map((s, i) => (
          <C.Box
            key={s}
            contentAlignment="center"
            modifiers={[
              M.fillMaxSize(),
              M.clip(M.Shapes.RoundedCorner(20)),
              M.background(i % 2 ? '#dcebe3' : '#e8def8'),
            ]}
          >
            <C.Text style={{ typography: 'headlineSmall' }}>{s}</C.Text>
          </C.Box>
        ))}
      </C.HorizontalPager>
      <C.Button
        onClick={() => {
          void ref.current?.animateScrollToPage((page + 1) % 4);
        }}
      >
        Next page
      </C.Button>
    </Stage>
  );
}
export function Carousels() {
  const spacing = useKnob('spacing', 8);
  const width = useKnob('width', 200);
  const scroll = useKnob('scroll', true);
  const padding = useKnob('padding', 0);
  const [selected, setSelected] = useState('Tap a card');
  const items = Array.from({ length: 6 }, (_, i) => (
    <C.Box
      key={i}
      contentAlignment="center"
      modifiers={[
        M.size(240, 110),
        M.maskClip(M.Shapes.RoundedCorner(20)),
        M.background(i % 2 ? '#dcebe3' : '#e8def8'),
        M.clickable(() => setSelected(`Selected card ${i + 1}`)),
      ]}
    >
      <C.Text>{`Card ${i + 1}`}</C.Text>
    </C.Box>
  ));
  return (
    <Stage height={470}>
      <C.Text>{selected}</C.Text>
      <C.HorizontalCenteredHeroCarousel
        preferredItemWidth={width}
        itemSpacing={spacing}
        contentPadding={padding}
        userScrollEnabled={scroll}
        modifiers={[M.height(110), M.fillMaxWidth()]}
      >
        {items}
      </C.HorizontalCenteredHeroCarousel>
      <C.HorizontalMultiBrowseCarousel
        preferredItemWidth={width}
        itemSpacing={spacing}
        contentPadding={padding}
        userScrollEnabled={scroll}
        modifiers={[M.height(110), M.fillMaxWidth()]}
      >
        {items}
      </C.HorizontalMultiBrowseCarousel>
      <C.HorizontalUncontainedCarousel
        itemWidth={width}
        itemSpacing={spacing}
        contentPadding={padding}
        userScrollEnabled={scroll}
        modifiers={[M.height(110), M.fillMaxWidth()]}
      >
        {items}
      </C.HorizontalUncontainedCarousel>
    </Stage>
  );
}
export function Lists() {
  const spacing = useKnob('spacing', 0);
  const padding = useKnob('padding', 0);
  const rows = useKnob('rows', 12);
  const [refreshing, setRefreshing] = useState(false);
  const [revision, setRevision] = useState(1);
  useEffect(() => {
    if (!refreshing) return;
    const timer = setTimeout(() => {
      setRevision((x) => x + 1);
      setRefreshing(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [refreshing]);
  return (
    <Stage height={380}>
      <C.Text>{`Pull the list to refresh · revision ${revision}`}</C.Text>
      <C.PullToRefreshBox
        isRefreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        modifiers={[M.height(210), M.fillMaxWidth()]}
      >
        <C.LazyColumn
          verticalArrangement={{ spacedBy: spacing }}
          contentPadding={{
            top: padding,
            bottom: padding,
            start: padding,
            end: padding,
          }}
          modifiers={[M.fillMaxSize()]}
        >
          {Array.from({ length: rows }, (_, i) => (
            <C.ListItem key={i}>
              <C.ListItem.HeadlineContent>
                <C.Text>{`Native row ${i + 1}`}</C.Text>
              </C.ListItem.HeadlineContent>
              <C.ListItem.SupportingContent>
                <C.Text>{`Revision ${revision}`}</C.Text>
              </C.ListItem.SupportingContent>
            </C.ListItem>
          ))}
        </C.LazyColumn>
      </C.PullToRefreshBox>
      <C.LazyRow modifiers={[M.fillMaxWidth(), M.height(60)]}>
        {Array.from({ length: rows }, (_, i) => (
          <C.Text
            key={i}
            modifiers={[M.paddingAll(18), M.background('#e8def8')]}
          >{`Item ${i + 1}`}</C.Text>
        ))}
      </C.LazyRow>
    </Stage>
  );
}
export function Feedback() {
  const duration = useKnob<'short' | 'long' | 'indefinite'>(
    'duration',
    'short',
  );
  const dismiss = useKnob('dismiss', true);
  const message = useKnob('message', 'Item archived');
  const action = useKnob('action', 'Undo');
  const rich = useKnob('rich', false);
  const persistent = useKnob('persistent', false);
  const ref = useRef<C.SnackbarHostRef>(null);
  const tooltip = useRef<C.TooltipBoxRef>(null);
  const [result, setResult] = useState('No snackbar result');
  return (
    <Stage height={290}>
      <C.Button
        onClick={() => {
          void ref.current
            ?.showSnackbar({
              message,
              actionLabel: action,
              withDismissAction: dismiss,
              duration,
            })
            .then(setResult);
        }}
      >
        Show snackbar with undo
      </C.Button>
      <C.Text>{result}</C.Text>
      <C.TooltipBox ref={tooltip} isPersistent={persistent}>
        {rich ? (
          <C.TooltipBox.RichTooltip>
            <C.TooltipBox.RichTooltip.Title>
              <C.Text>Explore tooltips</C.Text>
            </C.TooltipBox.RichTooltip.Title>
            <C.TooltipBox.RichTooltip.Text>
              <C.Text>
                A rich tooltip adds title, body, and action slots.
              </C.Text>
            </C.TooltipBox.RichTooltip.Text>
            <C.TooltipBox.RichTooltip.Action>
              <C.TextButton
                onClick={() => {
                  void tooltip.current?.dismiss();
                }}
              >
                Got it
              </C.TextButton>
            </C.TooltipBox.RichTooltip.Action>
          </C.TooltipBox.RichTooltip>
        ) : (
          <C.TooltipBox.PlainTooltip>
            <C.Text>Native tooltip · long press the star</C.Text>
          </C.TooltipBox.PlainTooltip>
        )}
        <C.IconButton
          onClick={() => {
            void tooltip.current?.show();
          }}
        >
          <Mark />
        </C.IconButton>
      </C.TooltipBox>
      <C.SnackbarHost ref={ref}>
        <C.Snackbar />
      </C.SnackbarHost>
    </Stage>
  );
}
export function Dates() {
  const is24Hour = useKnob('is24Hour', true);
  const [open, setOpen] = useState('');
  const [value, setValue] = useState('Nothing selected');
  return (
    <Stage height={340}>
      <C.Text>{value}</C.Text>
      {['Date', 'Range', 'Time'].map((s) => (
        <C.Button
          key={s}
          onClick={() => setOpen(s)}
        >{`Choose ${s.toLowerCase()}`}</C.Button>
      ))}
      {open === 'Date' && (
        <C.DatePickerDialog
          onDismissRequest={() => setOpen('')}
          onDateSelected={(d) => {
            setValue(d.toLocaleDateString());
            setOpen('');
          }}
        />
      )}
      {open === 'Range' && (
        <C.DateRangePickerDialog
          onDismissRequest={() => setOpen('')}
          onDateRangeSelected={(r) => {
            setValue(
              `${r.start?.toLocaleDateString() ?? 'Start'} → ${r.end?.toLocaleDateString() ?? 'End'}`,
            );
            setOpen('');
          }}
        />
      )}
      {open === 'Time' && (
        <C.TimePickerDialog
          is24Hour={is24Hour}
          onDismissRequest={() => setOpen('')}
          onDateSelected={(d) => {
            setValue(d.toLocaleTimeString());
            setOpen('');
          }}
        />
      )}
    </Stage>
  );
}
export function InlineDates() {
  const title = useKnob('title', true);
  const headline = useKnob('headline', true);
  const variantToggle = useKnob('variantToggle', true);
  const [kind, setKind] = useState(false);
  const [value, setValue] = useState('Select a date');
  return (
    <Stage height={570}>
      <C.Button onClick={() => setKind(!kind)}>
        {kind ? 'Show date picker' : 'Show range picker'}
      </C.Button>
      <C.Text>{value}</C.Text>
      {kind ? (
        <C.DateRangePicker
          showTitle={title}
          showHeadline={headline}
          showVariantToggle={variantToggle}
          modifiers={[M.height(440), M.fillMaxWidth()]}
          onDateRangeSelected={(r) =>
            setValue(
              `${r.start?.toLocaleDateString() ?? 'Start'} → ${r.end?.toLocaleDateString() ?? 'End'}`,
            )
          }
        />
      ) : (
        <C.DateTimePicker
          showTitle={title}
          showHeadline={headline}
          showVariantToggle={variantToggle}
          initialDate="2026-10-16T12:00:00Z"
          onDateSelected={(d) => setValue(d.toLocaleDateString())}
          modifiers={[M.height(440), M.fillMaxWidth()]}
        />
      )}
    </Stage>
  );
}

const recycledRows = Array.from({ length: 500 }, (_, index) => ({
  id: String(index),
  name: `Recycled row ${index + 1}`,
}));
function RecycledRow({ item }: { item: { id: string; name: string } }) {
  return (
    <C.ListItem>
      <C.ListItem.HeadlineContent>
        <C.Text>{item.name}</C.Text>
      </C.ListItem.HeadlineContent>
      <C.ListItem.SupportingContent>
        <C.Text>Only nearby rows mount · stable item keys</C.Text>
      </C.ListItem.SupportingContent>
    </C.ListItem>
  );
}
const renderRecycledRow = ({
  item,
}: {
  item: { id: string; name: string };
}) => <RecycledRow item={item} />;
export function Recycling() {
  const estimate = useKnob('estimate', 72);
  return (
    <Stage height={350}>
      <C.Text>500 rows · scroll to explore native recycling</C.Text>
      <C.LazyColumn modifiers={[M.height(280), M.fillMaxWidth()]}>
        <C.LazyItems
          data={recycledRows}
          keyExtractor={(item) => item.id}
          estimatedItemSize={estimate}
        >
          {renderRecycledRow}
        </C.LazyItems>
      </C.LazyColumn>
    </Stage>
  );
}
