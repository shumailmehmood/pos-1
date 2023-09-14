#!/bin/bash

# file system syncing in mac is killing cpu
# workaround: build npm modules in non-mounted directory, then link

# mkdir -p /node/helper
# cp /srv/package.json /node/helper/
# cd /node/helper
# yarn install

sleep 1
rm -rf /srv/node_modules
ln -s /node/helper/node_modules /srv/node_modules

cd /srv
sleep 1
nodemon --watch /srv --ext js,json --ignore /srv/node_modules --ignore /srv/library/node_modules --exec 'node --inspect=0.0.0.0:9070' /srv/server.js