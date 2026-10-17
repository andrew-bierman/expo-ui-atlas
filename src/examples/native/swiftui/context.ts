export const swiftuiContextNotes = {
  AccessoryWidgetBackground:
    'Widget-extension background; an Expo Go app cannot host a real widget extension. Intentionally documented rather than rendered as a misleading app specimen.',
  ArrangementView:
    'Requires iOS 27.1+. Below that version its children render without an adaptive container.',
  ConcentricRectangle:
    'Concentric corners require iOS 26+ and derive their geometry from an enclosing container shape. EdgeCornerStyle supplies fixed or concentric corner configurations.',
  withAnimation:
    'Native animation transactions require a worklet body mutating useNativeState values. Ordinary React state specimens use controlled event callbacks; worklet orchestration is not exercised here.',
  useWorkletCallback:
    'Advanced UI-thread callback helper; not required for ordinary event callbacks. See installed State types before building synchronous interactions.',
} as const;
