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
				<router-link to="/admins/-" class="button">Add Admin User</router-link>
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
			<tr v-for="admin in admins" :key="admin" @click="go(admin.admin_id)">
				<td>{{ admin.first_name }}</td>
				<td>{{ admin.last_name }}</td>
				<td>{{ admin.email }}</td>
				<td :class="{ 'has-text-danger': admin.login_attempts > 3 }">
					{{ admin.login_attempts > 3 ? 'Yes' : '' }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	// import lib from "../../../../library-web/lib";
	import utils from '@/utils';

	export default {
		data() {
			return {
				search: '',
				partners: [],
				admins: [],
			};
		},
		async created() {
			await this.load();
		},
		methods: {
			go(id) {
				this.$router.push(`/admins/${id}`);
			},
			async load() {
				this.admins = await utils.api.post(`/admins`, {
					search: this.search,
					partners: this.partners,
				});
			},
			async onSearch() {
				await this.load();
			},
			async onChange(selected) {
				this.partners = selected;
				await this.load();
			},
		},
	};
</script>
