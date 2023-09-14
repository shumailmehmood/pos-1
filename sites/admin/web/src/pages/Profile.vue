<template>
	<h1>Profile</h1>
	<button class="button is-danger" @click="logout">Logout</button>
</template>
<script>
	import lib from '!/library-web/lib';
	import utils from '@/utils';

	export default {
		methods: {
			async logout() {
				await utils.api.get('/auth/logout');
				lib.store.clearSession();
				lib.store.clear();
				lib.emitter.emit('logout');
				this.$router.push('/login');
			},
		},
	};
</script>
