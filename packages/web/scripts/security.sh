#!/bin/sh

API_HOST=$(echo $REACT_APP_API_SERVER_ENDPOINT | sed -e 's|http://||g' -e 's|https://||g')

tempFile=$(mktemp /etc/nginx/tempfile.XXXXXXXX)

cat > "${tempFile}" <<EOF

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header Referrer-Policy "strict-origin-when-cross-origin";
        add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://${API_HOST} https://${API_HOST} ws://${API_HOST} wss://${API_HOST} blob:;";
EOF

if [ "${ENABLE_SECURITY_HEADERS}" = "true" ]; then
  sed -i "/#SecurityHeaders/r ${tempFile}" /etc/nginx/nginx.conf.tmpl
fi

rm "${tempFile}"

cat /etc/nginx/nginx.conf.tmpl
