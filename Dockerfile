FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/

# install  dependencies
RUN npm install

# copy everything to /app directory
COPY . /app
RUN  chmod +x /app/docker/scripts/docker-entrypoint.sh

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT [ "/app/docker/scripts/docker-entrypoint.sh"]
