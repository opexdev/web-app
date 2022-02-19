FROM node:lts-fermium AS build
ADD . /OPEX-Web-APP
WORKDIR /OPEX-Web-APP
RUN yarn install
ARG API_BASE_URL=https://api.opex.dev
RUN GENERATE_SOURCEMAP=false REACT_APP_API_BASE_URL=${API_BASE_URL} yarn build

FROM nginx:latest
COPY --from=build /OPEX-Web-APP/build /var/www/opex/html
ADD default.conf /etc/nginx/conf.d
EXPOSE 80