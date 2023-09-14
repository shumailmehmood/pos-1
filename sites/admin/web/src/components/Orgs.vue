<template>
	<div class="columns is-mobile">
		<div class="column">
			<Multiselect v-model="options" placeholder="Choose Orgs" :searchable="true" :filterResults="false" :minChars="1" :resolveOnLoad="true" :delay="0" :options="search"></Multiselect>
		</div>
		<div class="buttons">
			<div class="column"><button class="button" @click="add">Add</button></div>
		</div>
	</div>
	<table class="table is-hoverable is-fullwidth">
		<tbody>
			<tr v-for="org in list" :key="org">
				<td>{{ org.name }}</td>
				<td class="is-narrow"><a class="button" @click="remove(org.org_id)">Remove</a></td>
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
				let orgs = await utils.api.post(`/components/orgs`, { query: query });
				return _.map(orgs, (org) => {
					return { value: org.org_id, label: `${org.name}` };
				});
			},
			add() {
				this.chosen.push(this.options);
				this.chosen = _.uniq(this.chosen);
				this.options = [];
				this.onChange();
				this.load();
			},
			remove(org_id) {
				_.pull(this.chosen, org_id);
				this.options = [];
				this.onChange();
				this.load();
			},
			async load() {
				let orgs = await utils.api.post(`/components/orgs/list`, { orgs: this.chosen });
				this.list = orgs;
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
