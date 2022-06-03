FROM node:16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN apt update && apt install -y chromium
# install  dependencies
RUN npm install

# copy everything to /app directory
COPY . /app
RUN npm run build

FROM nginx:alpine as ngnix
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html

FROM arm64v8/nginx
COPY --from=nginx /etc/nginx/conf.d /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY ./scripts/env.sh .
COPY .env .
RUN chmod +x env.gssh
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
