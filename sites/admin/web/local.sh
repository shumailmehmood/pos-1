#!/bin/bash

sleep 1
rm -rf /srv/node_modules
ln -s /node/admin/web/node_modules /srv/node_modules

cd /srv
sleep 1
yarn serve
