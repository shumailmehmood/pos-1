FROM alpine:3.18

RUN apk add nodejs-current npm
RUN npm install -g yarn

ENV NODE_ENV production

RUN mkdir -p /srv
WORKDIR /srv

COPY ./current/ ./current/
COPY ./library/ ./library/

WORKDIR /srv/library
RUN yarn install --no-lockfile --production --audit --non-interactive 

WORKDIR /srv
COPY ./package*.json ./*.js ./
RUN yarn install --no-lockfile --production --audit --non-interactive
