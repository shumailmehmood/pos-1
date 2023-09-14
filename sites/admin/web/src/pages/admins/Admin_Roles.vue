<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<article class="tile is-child box">
				<div class="columns is-mobile">
					<div class="column">
						<AdminRoles v-model="selected" />
					</div>
					<div class="buttons">
						<div class="column"><button class="button" @click="add">Add</button></div>
					</div>
				</div>
			</article>
		</div>
	</div>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<article class="tile is-child box">
				<table class="table is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Name</th>
							<th class="is-narrow"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="role in roles" :key="role">
							<td>{{ role.name }}</td>
							<td><a class="button" @click="del(role.role_id)">Remove</a></td>
						</tr>
					</tbody>
				</table>
			</article>
		</div>
	</div>
</template>

<script>
	import lib from '!/library-web/lib';
	import utils from '@/utils';
	import AdminRoles from '@/components/AdminRoles.vue';

	export default {
		name: 'role',
		components: {
			AdminRoles,
		},
		data() {
			return {
				admin_id: '',
				selected: [],
				roles: [],
			};
		},
		async created() {
			await this.load();
		},
		methods: {
			async load() {
				this.admin_id = this.$route.params.admin_id;
				let data = await utils.api.post(`/admins/${this.admin_id}/roles`);
				this.roles = data.roles;
			},
			async add() {
				let data = { roles: this.selected };
				let result = await utils.api.post(`/admins/${this.admin_id}/roles/add`, data);
				this.load();
				if (result.success) {
					lib.toast.show('Save successful!');
				}
			},
			async del(role_id) {
				event.preventDefault();
				let confirm = await lib.confirm.show(`Are you sure?`);
				if (confirm) {
					let result = await utils.api.post(`/admins/${this.admin_id}/roles/delete`, {
						role_id: role_id,
					});
					this.load();
					if (result.success) {
						lib.toast.show('Delete successful!');
					}
				}
			},
		},
	};
</script>
