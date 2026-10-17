export const swiftuiContextNotes = {
  AccessoryWidgetBackground:
    'Widget-extension background; an Expo Go app cannot host a real widget extension. Intentionally documented rather than rendered as a misleading app specimen.',
  ArrangementView:
    'Requires iOS 27.1+. Below that version its children render without an adaptive container.',
  ConcentricRectangle:
    'Live in Shape geometry: iOS 26+ concentric corners derive from a container shape; EdgeCornerStyle switches between fixed and concentric corner configurations. The concentric shape is empty on older OS versions, while the other shapes remain live.',
  withAnimation:
    'Native animation transactions require a worklet body mutating useNativeState values. Ordinary React state specimens use controlled event callbacks; worklet orchestration is not exercised here.',
  useWorkletCallback:
    'Advanced UI-thread callback helper; not required for ordinary event callbacks. See installed State types before building synchronous interactions.',
} as const;
