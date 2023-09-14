<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<article class="tile is-child box">
				<Roles :selected="roles" @changed="changed" />
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
	import Roles from '@/components/Roles.vue';

	export default {
		components: {
			Roles,
		},
		data() {
			return {
				user_id: '',
				roles: [],
			};
		},
		async created() {
			this.user_id = this.$route.params.user_id;
			let data = await utils.api.post(`/users/${this.user_id}/roles`);
			this.roles = data.roles;
		},
		methods: {
			async save() {
				let data = { roles: this.roles };
				let result = await utils.api.post(`/users/${this.user_id}/roles/save`, data);
				if (result.success) {
					lib.toast.show('Save successful!');
				}
			},
			async changed(selected) {
				this.roles = selected;
			},
		},
	};
</script>
