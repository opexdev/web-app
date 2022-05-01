FROM node:lts-fermium AS build
COPY . /OPEX-Web-APP
WORKDIR /OPEX-Web-APP
RUN yarn install --immutable
ARG GENERATE_SOURCEMAP='false'
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
RUN yarn build

FROM nginx:1.20.2
COPY --from=build /OPEX-Web-APP/build /var/www/opex/html
RUN echo 'windows.env={"REACT_APP_API_BASE_URL":"$API_BASE_URL","REACT_APP_CLIENT_ID":"$CLIENT_ID","REACT_APP_CLIENT_SECRET":"$CLIENT_SECRET"}' | tee /var/www/opex/html/env.js
COPY default.conf /etc/nginx/conf.d
EXPOSE 80