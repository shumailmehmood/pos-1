#!/bin/bash

sleep 1
rm -rf /srv/node_modules
rm -rf /srv/library/node_modules
ln -s /node/cron/node_modules /srv/node_modules
ln -s /node/library/node_modules /srv/library/node_modules

cd /srv
sleep 1
while true
do
	sleep 60
done