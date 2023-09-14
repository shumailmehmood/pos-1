
<template>
	<Multiselect v-model="selected" @select="onChange" @deselect="onChange" placeholder="Choose Role" :searchable="true" :filterResults="false" :minChars="1" :resolveOnLoad="true" :delay="0" :options="search"></Multiselect>
</template>
<script>
	import _ from 'lodash';
	import utils from '@/utils';

	export default {
		name: 'Team',
		props: {
			team: String,
			remember: Boolean,
		},
		data() {
			return {
				selected: [],
			};
		},
		methods: {
			async search(query) {
				let roles = await utils.api.post(`/components/roles`, { query: query });
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
