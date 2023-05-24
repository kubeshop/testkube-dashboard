#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" >./env-config.js
echo "REACT_APP_API_SERVER_ENDPOINT: '${REACT_APP_API_SERVER_ENDPOINT}'," >>./env-config.js
echo "REACT_APP_ROOT_ROUTE: '${REACT_APP_ROOT_ROUTE}'," >>./env-config.js
echo "REACT_APP_DISABLE_TELEMETRY: '${REACT_APP_DISABLE_TELEMETRY}'," >>./env-config.js
echo "};" >>./env-config.js
