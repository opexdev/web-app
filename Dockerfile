FROM node:lts-fermium AS build
ADD . /OPEX-Web-APP
WORKDIR /OPEX-Web-APP
RUN yarn install
RUN yarn build

FROM nginx:latest
COPY --from=build /OPEX-Web-APP/build /var/www/opex/html
ADD default.conf /etc/nginx/conf.d
EXPOSE 80