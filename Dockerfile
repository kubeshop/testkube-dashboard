ARG TARGET=nginx:alpine

FROM node:16 as build
WORKDIR /app

ARG REACT_APP_GOOGLE_ANALYTICS_ID
ENV REACT_APP_GOOGLE_ANALYTICS_ID=$REACT_APP_GOOGLE_ANALYTICS_ID
ARG REACT_APP_SEGMENT_WRITE_KEY
ENV REACT_APP_SEGMENT_WRITE_KEY=$REACT_APP_SEGMENT_WRITE_KEY

ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN apt update && apt install -y chromium
# install  dependencies
RUN npm install --legacy-peer-deps
# copy everything to /app directory
COPY . /app
RUN npm run build

FROM $TARGET
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
WORKDIR /usr/share/nginx/html
COPY ./scripts/env.sh .
COPY .env .
RUN chmod +x env.sh

RUN touch ./env-config.js
RUN chmod a+w ./env-config.js



CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
