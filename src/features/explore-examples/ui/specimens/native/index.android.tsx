import type { ComponentType } from 'react';
import type { Example, ExampleRegistry } from '../../../model/types';
import {
  composeControls,
  composeDescriptions,
} from './compose/controls-schema';
import * as Core from './compose/core';
import * as Experience from './compose/experience';

const specimens: Record<keyof typeof composeDescriptions, ComponentType> = {
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
const descriptionDefinitions = new Map(Object.entries(composeDescriptions));
const controlDefinitions = new Map(Object.entries(composeControls));
export const nativeExamples: ExampleRegistry = Object.fromEntries<Example[]>(
  Object.entries(specimens).map(([id, component]) => {
    const description = descriptionDefinitions.get(id);
    if (!description) throw new Error(`Missing Compose description: ${id}`);
    return [
      `compose-${id}`,
      [
        {
          id: `${id}-playground`,
          title: description[0],
          description: description[1],
          controls: controlDefinitions.get(`compose-${id}`),
          component,
        },
      ],
    ];
  }),
);
