#!/bin/sh

tempFile=$(mktemp)
cat > "${tempFile}" <<EOF

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header Referrer-Policy "strict-origin-when-cross-origin";
        add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'self'; connect-src 'self' http://${API_DOMAIN} https://${API_DOMAIN} ws://${API_DOMAIN} wss://${API_DOMAIN} blob:;";
EOF

if [ "${ENABLE_SECURITY_HEADERS}" = "true" ]; then
  if grep -q "#SecurityHeaders" /etc/nginx/nginx.conf.tmpl; then
    sed -i "/#SecurityHeaders/r ${tempFile}" /etc/nginx/nginx.conf.tmpl
  fi
fi

rm "${tempFile}"

cat /etc/nginx/nginx.conf.tmpl
