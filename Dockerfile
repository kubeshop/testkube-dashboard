ARG TARGET=nginx:alpine

FROM node:20 as build
WORKDIR /app

ARG REACT_APP_GTM_ID
ENV REACT_APP_GTM_ID=$REACT_APP_GTM_ID
ARG REACT_APP_VERSION
ENV REACT_APP_VERSION=$REACT_APP_VERSION

ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
# install  dependencies
RUN npm install --legacy-peer-deps
# copy everything to /app directory
COPY . /app
RUN npm run build

FROM $TARGET
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf.tmpl
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
WORKDIR /usr/share/nginx/html
COPY ./scripts/env.sh .
COPY ./scripts/inject-base-href.sh .
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
