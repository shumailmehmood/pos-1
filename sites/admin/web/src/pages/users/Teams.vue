<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<article class="tile is-child box">
				<Teams :selected="teams" @changed="changed" />
			</article>
		</div>
	</div>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<article class="tile is-child box">
				<div class="columns is-mobile">
					<div class="column">
						<button class="button is-primary" @click="save">Save</button>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
	import lib from '!/library-web/lib';
	import utils from '@/utils';
	import Teams from '@/components/Teams.vue';

	export default {
		components: {
			Teams,
		},
		data() {
			return {
				user_id: '',
				teams: [],
			};
		},
		async created() {
			this.user_id = this.$route.params.user_id;
			let data = await utils.api.post(`/users/${this.user_id}/teams`);
			this.teams = data.teams;
		},
		methods: {
			async save() {
				let data = { teams: this.teams };
				let result = await utils.api.post(`/users/${this.user_id}/teams/save`, data);
				if (result.success) {
					lib.toast.show('Save successful!');
				}
			},
			async changed(selected) {
				this.teams = selected;
			},
		},
	};
</script>
