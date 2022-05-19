FROM node:lts-fermium AS build
COPY . /web-app
WORKDIR /web-app
ENV NODE_ENV production
RUN yarn install --immutable
ARG GENERATE_SOURCEMAP='false'
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
RUN yarn build

FROM nginx:1.20.2
COPY default.conf /etc/nginx/conf.d
COPY --from=build /web-app/build /var/www/opex/html
WORKDIR /var/www/opex/html
COPY env-map.js .
CMD cat env-map.js | envsubst > env.js && nginx -g "daemon off;"
EXPOSE 80
