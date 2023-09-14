<template>
	<Multiselect v-model="selected" @select="onChange" @deselect="onChange" mode="tags" placeholder="Choose Roles" :searchable="true" :createTag="true" :filterResults="false" :minChars="1" :resolveOnLoad="true" :delay="0" :options="search"></Multiselect>
</template>
<script>
	import _ from 'lodash';
	import utils from '@/utils';
	export default {
		name: 'Orgs',
		props: {
			roles: Array,
		},
		data() {
			return {
				selected: [],
			};
		},
		methods: {
			async search(query) {
				let roles = await utils.api.post(`/components/admin_roles`, { query: query });
				return _.map(roles, (role) => {
					return { value: role.role_id, label: `${role.name}` };
				});
			},
			onChange() {
				// console.log('change in comp', this.selected);
				this.$emit('changed', this.selected);
			},
		},
	};
</script>
