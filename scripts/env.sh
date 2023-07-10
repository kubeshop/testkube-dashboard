#!/bin/sh

OUT=env-config.js
VARIABLES=(
  REACT_APP_API_SERVER_ENDPOINT
  REACT_APP_ROOT_ROUTE
  REACT_APP_DISABLE_TELEMETRY
  REACT_APP_CRD_OPERATOR_REVISION
)

echo "window._env_ = {" > "${OUT}"
for name in ${VARIABLES[@]}; do
  value="$(eval "echo \"\$${name}\"")"
  echo "${name}: '${value}'," >> "${OUT}"
done
echo "};" >> "${OUT}"
