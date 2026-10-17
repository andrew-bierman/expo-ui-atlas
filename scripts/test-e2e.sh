#!/usr/bin/env bash
set -euo pipefail
: "${MAESTRO_DEVICE_ID:?Set MAESTRO_DEVICE_ID to a dedicated simulator or emulator ID}"
MAESTRO_COMMAND="${MAESTRO_COMMAND:-maestro}"
export MAESTRO_CLI_NO_ANALYTICS=1
export MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true
exec "$MAESTRO_COMMAND" --device "$MAESTRO_DEVICE_ID" test \
  --test-output-dir .expo/maestro-artifacts \
  --debug-output .expo/maestro-debug \
  -e "APP_ID=${APP_ID:-host.exp.Exponent}" \
  -e "EXPO_URL=${EXPO_URL:-exp://127.0.0.1:8087}" \
  .maestro "$@"
