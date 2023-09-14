<template>
	<div class="columns">
		<div class="column console-header">
			<router-link to="/admins" class=""><i class="bx bx-left-arrow-alt"></i></router-link>
			<span class="console-title is-capitalized">{{ first_name }} {{ last_name }}</span>
		</div>
	</div>
	<div class="tabs is-centered is-boxed" :class="{ 'is-hidden': is_new }">
		<ul>
			<li v-for="item in menu" :key="item" @click="go(item)" :class="{ 'is-active': item.active }">
				<a>{{ item.text }}</a>
			</li>
		</ul>
	</div>
	<router-view />
</template>

<script>
	import _ from 'lodash';
	// import lib from "!/library-web/lib";
	import utils from '@/utils';

	export default {
		name: 'org',
		data() {
			let menu = [
				{
					id: 'general',
					text: 'General',
					path: '',
					active: true,
				},
				{
					id: 'roles',
					text: 'Roles',
					path: '/roles',
					active: false,
				},
			];
			return {
				first_name: '',
				last_name: '',
				admin_id: '',
				is_new: false,
				menu: menu,
			};
		},
		async created() {
			this.admin_id = this.$route.params.admin_id;
			if (this.admin_id !== '-') {
				let data = await utils.api.post(`/admins/${this.admin_id}/general`);
				this.first_name = data.admin.first_name;
				this.last_name = data.admin.last_name;
				this.is_new = false;
			} else {
				this.is_new = true;
			}
			this.makeActive();
		},
		methods: {
			async go(item) {
				await this.$router.push(`/admins/${this.admin_id}${item.path}`);
				this.makeActive();
			},
			makeActive() {
				_.each(this.menu, (item) => {
					if (item.path === ``) {
						item.active = this.$router.currentRoute.value.path === `/admins/${this.admin_id}`;
					} else {
						item.active = this.$router.currentRoute.value.path.endsWith(`${item.path}`);
					}
				});
			},
		},
	};
</script>
