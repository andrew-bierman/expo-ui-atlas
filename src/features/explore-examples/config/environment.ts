import { appConfig } from '../../../shared/config';
import { ControlId, ControlType } from '../model/control-identifiers';
import { nativeDefault } from '../model/host-environment';
import type { TuningControl } from '../model/tuning';
export const environmentControls: TuningControl[] = [
  {
    id: ControlId.Appearance,
    label: appConfig.messages.environment.appearance,
    labelKey: 'environment.appearance',
    type: ControlType.Select,
    options: [...appConfig.preview.appearanceOptions],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.Accent,
    label: appConfig.messages.environment.accent,
    labelKey: 'environment.accent',
    type: ControlType.Select,
    options: [...appConfig.preview.accentOptions],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.Direction,
    label: appConfig.messages.environment.direction,
    labelKey: 'environment.direction',
    type: ControlType.Select,
    options: [...appConfig.preview.directionOptions],
    defaultValue: nativeDefault,
  },
  {
    id: ControlId.PreviewWidth,
    label: appConfig.messages.environment.width,
    labelKey: 'environment.width',
    type: ControlType.Range,
    ...appConfig.preview.width,
  },
  {
    id: ControlId.PreviewPadding,
    label: appConfig.messages.environment.padding,
    labelKey: 'environment.padding',
    type: ControlType.Range,
    ...appConfig.preview.padding,
  },
];
