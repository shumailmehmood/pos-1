<template>
	<Multiselect v-model="selected" @select="onChange" @deselect="onChange" placeholder="Choose Organization" :searchable="true" :filterResults="false" :minChars="1" :resolveOnLoad="true" :delay="0" :options="search"></Multiselect>
</template>
<script>
	import _ from 'lodash';
	import lib from '!/library-web/lib';
	import utils from '@/utils';

	export default {
		name: 'Orgs',
		props: {
			org: String,
			remember: Boolean,
		},
		data() {
			return {
				selected: [],
			};
		},
		beforeCreate() {
			if (this.remember) {
				let org_id = lib.store.getSession('comp_org_org_id');
				if (!this.org && org_id) {
					this.selected = org_id;
					this.$emit('changed', org_id);
				}
			}
		},
		methods: {
			async search(query) {
				let orgs = await utils.api.post(`/components/orgs`, { query: query });
				return _.map(orgs, (org) => {
					return { value: org.org_id, label: `${org.name}` };
				});
			},
			onChange() {
				// console.log('change in comp', this.selected);
				this.$emit('changed', this.selected);
				if (this.remember) {
					lib.store.saveSession('comp_org_org_id', this.selected);
				}
			},
		},
	};
</script>
