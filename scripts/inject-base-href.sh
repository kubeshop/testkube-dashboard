#!/bin/sh

# Fail fast
set -e

# Include the proper <base href> based on the root route
BASE_URL="$(echo "${REACT_APP_ROOT_ROUTE:-""}" | sed 's|\/*$||')"
RENDERED="$(sed -e "s|<base href[^>]*>|<base href=\"${BASE_URL}/\">|" index.html)"
echo "$RENDERED" > index.html
