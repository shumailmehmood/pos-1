<template>
	<div class="columns is-mobile">
		<div class="column">
			<Multiselect v-model="options" placeholder="Choose roles" :searchable="true" :filterResults="false" :minChars="1" :resolveOnLoad="true" :delay="0" :options="search"></Multiselect>
		</div>
		<div class="buttons">
			<div class="column"><button class="button" @click="add">Add</button></div>
		</div>
	</div>
	<table class="table is-hoverable is-fullwidth">
		<tbody>
			<tr v-for="role in list" :key="role">
				<td>{{ role.name }}</td>
				<td class="is-narrow"><a class="button" @click="remove(role.role_id)">Remove</a></td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	import _ from 'lodash';
	import utils from '@/utils';
	export default {
		name: 'Orgs',
		props: {
			selected: Array,
		},
		emits: ['changed'],
		data() {
			return {
				chosen: [],
				options: [],
				list: [],
			};
		},
		methods: {
			async search(query) {
				let roles = await utils.api.post(`/components/roles`, { query: query });
				return _.map(roles, (role) => {
					return { value: role.role_id, label: `${role.name}` };
				});
			},
			add() {
				this.chosen.push(this.options);
				this.chosen = _.uniq(this.chosen);
				this.options = [];
				this.onChange();
				this.load();
			},
			remove(role_id) {
				_.pull(this.chosen, role_id);
				this.options = [];
				this.onChange();
				this.load();
			},
			async load() {
				let roles = await utils.api.post(`/components/roles/list`, { roles: this.chosen });
				this.list = roles;
			},
			onChange() {
				this.$emit('changed', this.chosen);
			},
		},
		watch: {
			selected: function (newVal) {
				this.chosen = newVal;
				this.load();
			},
		},
	};
</script>
