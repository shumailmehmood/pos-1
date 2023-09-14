#!/bin/bash

sleep 1
rm -rf /srv/node_modules
rm -rf /srv/library/node_modules
ln -s /node/admin/api/node_modules /srv/node_modules
ln -s /node/library/node_modules /srv/library/node_modules

cd /srv
sleep 1
nodemon --watch /srv --ext js,json --ignore /srv/node_modules --ignore /srv/library/node_modules --exec 'node --inspect=0.0.0.0:9092' /srv/server.js