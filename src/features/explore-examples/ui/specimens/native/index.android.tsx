import type { ExampleRegistry } from '../../../model/types';
import * as Core from './compose/core';
import * as Experience from './compose/experience';

const specimens = {
  recycling: Experience.Recycling,
  palette: Core.Palette,
  buttons: Core.Buttons,
  'icon-buttons': Core.IconButtons,
  'floating-actions': Core.FloatingActions,
  selection: Core.Selection,
  segments: Core.Segments,
  chips: Core.Chips,
  sliders: Core.Sliders,
  fields: Core.Fields,
  progress: Core.Progress,
  content: Core.Content,
  artwork: Core.Artwork,
  layout: Core.Layout,
  modifiers: Core.Modifiers,
  dialogs: Experience.Dialogs,
  menus: Experience.Menus,
  search: Experience.Search,
  navigation: Experience.Navigation,
  pager: Experience.Pager,
  carousels: Experience.Carousels,
  lists: Experience.Lists,
  feedback: Experience.Feedback,
  dates: Experience.Dates,
  'inline-dates': Experience.InlineDates,
};
export const nativeExamples: ExampleRegistry = Object.fromEntries(
  Object.entries(specimens).map(([id, component]) => [
    `compose-${id}`,
    [
      {
        id: `${id}-playground`,
        title: 'Native playground',
        description:
          'Interact with the Android controls below. Reset restores the initial state.',
        component,
      },
    ],
  ]),
);
