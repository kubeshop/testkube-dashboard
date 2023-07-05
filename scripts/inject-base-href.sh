#!/bin/sh

# Fail fast
set -e

# Include the proper <base href> based on the root route
RENDERED="$(sed -e "s|<base href[^>]*>|<base href=\"${REACT_APP_ROOT_ROUTE:-"/"}\">|" index.html)"
echo "$RENDERED" > index.html
