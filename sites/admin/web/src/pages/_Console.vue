<template>
	<LeftNav @leftNavCollapse="leftNavCollapse" />
	<div class="console-main" :class="{ 'console-main-not-collapsed': !collapse }">
		<router-view />
	</div>
</template>

<script>
import lib from '!/library-web/lib';
// import utils from '@/utils';
import LeftNav from '@/components/LeftNav.vue';

export default {
	name: 'home',
	components: {
		LeftNav,
	},
	created() {
		this.leftNavCollapse();
	},
	data: () => ({
		collapse: true,
	}),
	methods: {
		leftNavCollapse() {
			this.collapse = lib.store.get('left-nav-collapse');
		},
	},
};
</script>
<style>

</style>
