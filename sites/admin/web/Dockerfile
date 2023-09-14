FROM alpine:3.18  as build-stage

RUN apk add nodejs-current npm
RUN npm install -g yarn

COPY ./ ./

RUN yarn install --audit --non-interactive --network-timeout 100000
RUN yarn build

FROM nginx:alpine as production-stage

RUN mkdir -p /app

COPY --from=build-stage /dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8091

CMD [ "nginx" ]