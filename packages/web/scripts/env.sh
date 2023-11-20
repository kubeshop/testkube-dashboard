#!/bin/sh

if [ -z "$1" ]; then
  echo "You need to pass output path"
  exit 1
fi

rootDir="$( cd "$( dirname "$0" )/../../.." && pwd )"
if [ -f "$rootDir/.env" ]; then
  echo "exporting variables from .env file"
	export $(cat "$rootDir/.env" | grep -v "#" | xargs)
fi

OUT="$1"
VARIABLES="$(env | grep '^REACT_APP_' | sed 's/=.*//')"

set -- $VARIABLES
echo "window._env_ = {" > "$OUT"
while [ -n "$1" ]; do
  value="$(eval "echo \"\$$1\" | sed \"s/'/\\\\\\'/g\"")"
  echo "$1: '$value'," >> "$OUT"
  shift
done
echo "};" >> "$OUT"
