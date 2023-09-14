FROM alpine:3.18

RUN apk add nodejs-current npm
RUN npm install -g yarn
RUN npm install -g nodemon

RUN mkdir -p /node/database
RUN mkdir -p /node/library
RUN mkdir -p /node/admin/api
RUN mkdir -p /node/app/api
RUN mkdir -p /node/market/api
RUN mkdir -p /node/workers
RUN mkdir -p /node/pubsub
RUN mkdir -p /node/cron
RUN mkdir -p /node/helper

COPY ./database/package.json /node/database/package.json
COPY ./library/package.json /node/library/package.json
COPY ./admin/api/package.json /node/admin/api/package.json
COPY ./app/api/package.json /node/app/api/package.json
COPY ./market/api/package.json /node/market/api/package.json
COPY ./workers/package.json /node/workers/package.json
COPY ./pubsub/package.json /node/pubsub/package.json
COPY ./cron/package.json /node/cron/package.json
COPY ./helper/package.json /node/helper/package.json

WORKDIR "/node/database"
RUN yarn install --network-timeout 100000
WORKDIR "/node/library"
RUN yarn install --network-timeout 100000
WORKDIR "/node/admin/api"
RUN yarn install --network-timeout 100000
WORKDIR "/node/app/api"
RUN yarn install --network-timeout 100000
WORKDIR "/node/market/api"
RUN yarn install --network-timeout 100000
WORKDIR "/node/workers"
RUN yarn install --network-timeout 100000
WORKDIR "/node/pubsub"
RUN yarn install --network-timeout 100000
WORKDIR "/node/cron"
RUN yarn install --network-timeout 100000
WORKDIR "/node/helper"
RUN yarn install --network-timeout 100000
