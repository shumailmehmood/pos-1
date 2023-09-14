<template>
	<div class="columns">
		<div class="column console-header">
			<router-link to="/users" class=""><i class="bx bx-left-arrow-alt"></i></router-link>
			<span class="console-title is-capitalized" v-if="first_name">{{ first_name }} {{ last_name }} - {{ email }}</span>
			<span class="console-title is-capitalized" v-if="!first_name">Add Organization User</span>
		</div>
	</div>
	<div class="tabs is-centered is-boxed" v-show="!is_new">
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
	import api from '../../utils/api';
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
					id: 'teams',
					text: 'Teams',
					path: '/teams',
					active: false,
				},
				{
					id: 'roles',
					text: 'Roles',
					path: '/roles',
					active: false,
				},
			];
			return {
				user_id: '',
				first_name: '',
				last_name: '',
				email: '',
				is_new: true,
				menu: menu,
			};
		},
		async created() {
			this.user_id = this.$route.params.user_id;
			if (this.user_id !== '-') {
				let user = await api.post(`/users/${this.user_id}/general`);
				this.first_name = user.first_name;
				this.last_name = user.last_name;
				this.email = user.email;
				this.is_new = false;
			} else {
				this.is_new = true;
			}
			this.makeActive();
		},
		methods: {
			async go(item) {
				await this.$router.push(`/users/${this.user_id}${item.path}`);
				this.makeActive();
			},
			makeActive() {
				_.each(this.menu, (item) => {
					if (item.path === ``) {
						item.active = this.$router.currentRoute.value.path === `/users/${this.user_id}`;
					} else {
						item.active = this.$router.currentRoute.value.path.endsWith(`${item.path}`);
					}
				});
			},
		},
	};
</script>
