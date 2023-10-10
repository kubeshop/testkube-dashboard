#!/bin/sh

OUT=env-config.js
VARIABLES="
  REACT_APP_API_SERVER_ENDPOINT
  REACT_APP_ROOT_ROUTE
  REACT_APP_DISABLE_TELEMETRY
  REACT_APP_CRD_OPERATOR_REVISION
"

set -- $VARIABLES
echo "window._env_ = {" > "$OUT"
while [ -n "$1" ]; do
  value="$(eval "echo \"\$$1\"")"
  echo "$1: '$value'," >> "$OUT"
  shift
done
echo "};" >> "$OUT"
