ARG TARGET=nginx:alpine

FROM node:20 as deps-reader

COPY . /app
RUN find /app -type f ! \( -name 'package*.json' -o -name '.npmrc' \) -delete && find /app -type d | xargs rmdir -p 2>/dev/null || true

FROM node:20 as build

ARG SENTRY_AUTH_TOKEN
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_GTM_ID
ARG REACT_APP_VERSION

WORKDIR /app

COPY --from=deps-reader /app /app
RUN npm install --no-audit

COPY . /app
RUN npm run -w @testkube/web build

FROM $TARGET
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf.tmpl
COPY --from=build /app/packages/web/build /usr/share/nginx/html
EXPOSE 8080
WORKDIR /usr/share/nginx/html
COPY ./packages/web/scripts/env.sh .
COPY ./packages/web/scripts/inject-base-href.sh .
RUN chmod +x env.sh inject-base-href.sh && chmod ugo+w /etc/nginx/nginx.conf index.html

RUN touch ./env-config.js
RUN chmod a+w ./env-config.js



CMD [ \
  "/bin/sh", \
  "-c", \
  "/usr/share/nginx/html/env.sh && \
   /usr/share/nginx/html/inject-base-href.sh && \
  export DISABLE_IPV6=\"$([[ \"$ENABLE_IPV6\" = \"true\" ]] && echo \"false\" || echo \"true\")\" && \
   envsubst '$DISABLE_IPV6' < /etc/nginx/nginx.conf.tmpl | sed -e '1h;2,$H;$!d;g' -e 's/# cut true.*# end//g' > /etc/nginx/nginx.conf && \
   nginx -g \"daemon off;\"" ]
