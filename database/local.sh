#!/bin/bash

if [ "$1" == "setup" ]; then
	sleep 1
	rm -rf /srv/node_modules
	rm -rf /srv/library/node_modules
	ln -s /node/database/node_modules /srv/node_modules
	ln -s /node/library/node_modules /srv/library/node_modules

	cd /srv
    node setup.js
	node data.js
	node seed.js local.sql
	while true; do sleep 10000; done
elif [ "$1" == "update" ]; then
	cd /srv
	node update.js
	node data.js;
elif [ "$1" == "refresh" ]; then
	cd /srv
	node delete.js
	node setup.js
	node data.js
	node seed.js local.sql
else
    echo "invalid run command"
fi
