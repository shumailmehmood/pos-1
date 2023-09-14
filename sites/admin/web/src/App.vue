<template>
	<router-view />
</template>
<script>
	import lib from '!/library-web/lib';
	import utils from '@/utils';

	export default {
		name: 'App',
		async created() {
			// check browser
			if (!lib.browser.checkBrowser()) {
				this.$router.push(`/not_supported`);
			}

			// start pubsub
			let conf = lib.config.get();
			utils.pubsub.init(conf.pubsub.host);
			utils.pubsub.subscribe();

			// start/stop pubsub based on login events
			lib.emitter.on('login', () => {
				utils.pubsub.init(conf.pubsub.host);
			});
			lib.emitter.on('logout', () => {
				utils.pubsub.stop();
			});

			// pubsub messages
			lib.emitter.on('pubsub', (message) => {
				console.log(message);
			});

			// validate current token
			if (lib.store.get('token')) {
				await utils.api.post('/auth/validate');
			}
		},
		errorCaptured(err, vm, info) {
			console.error(err, vm, info);
		},
	};
</script>
<style></style>
