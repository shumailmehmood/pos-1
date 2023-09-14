<template>
	<div class="columns is-mobile">
		<div class="column">
			<div class="app-input">
				<input name="search" type="text" placeholder="search" class="" v-model="search" @change="onSearch" />
				<label for="search">Search</label>
			</div>
		</div>
		<div class="column">
			<div class="buttons is-pulled-right app-input">
				<router-link to="/users/-" class="button">Add</router-link>
			</div>
		</div>
	</div>
	<table class="table is-hoverable is-fullwidth">
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th class="is-narrow">Locked</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="user in users" :key="user" @click="go(user.user_id)">
				<td>{{ user.first_name }}</td>
				<td>{{ user.last_name }}</td>
				<td>{{ user.email }}</td>
				<td :class="{ 'has-text-danger': user.login_attempts > 3 }">
					{{ user.login_attempts > 3 ? 'Yes' : '' }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import utils from '@/utils';

export default {
	data() {
		return {
			search: '',
			users: [],
		};
	},
	async created() {
		await this.load();
	},
	methods: {
		go(id) {
			this.$router.push(`/users/${id}`);
		},
		async load() {
			let results = await utils.api.post(`/users`, {
				search: this.search,
			});
			this.users = results.users;
		},
		async onSearch() {
			await this.load();
		},
	},
};
</script>
