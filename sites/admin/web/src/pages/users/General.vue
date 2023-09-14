<template>
	<Form @submit="submit" :validation-schema="schema">
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<article class="tile is-child box">
					<div class="app-input">
						<Field name="email" type="text" placeholder="email" class="full" v-model="email" />
						<label for="email">Email</label>
						<ErrorMessage name="email" />
					</div>
					<div class="app-input">
						<Field name="first_name" type="text" placeholder="first_name" class="full" v-model="first_name" />
						<label for="first_name">First Name</label>
						<ErrorMessage name="first_name" />
					</div>
					<div class="app-input">
						<Field name="last_name" type="text" placeholder="last_name" class="full" v-model="last_name" />
						<label for="last_name">Last Name</label>
						<ErrorMessage name="last_name" />
					</div>
					<div class="app-input" v-if="is_new">
						<Team v-model="team_id" @changed="onChange" />
					</div>
					<div class="app-input" v-if="is_new">
						<Role v-model="role_id" @changed="onChangeRole" />
					</div>
					<div class="field" :class="{ 'is-hidden': !is_new }">
						<input id="sendinvite" type="checkbox" name="sendinvite" class="switch is-rounded" v-model="sendinvite" />
						<label for="sendinvite">Send Invite Email</label>
					</div>
				</article>
			</div>
		</div>
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<article class="tile is-child box">
					<div class="columns is-mobile">
						<div class="column">
							<button class="button is-primary">Save</button>
						</div>
						<div class="column">
							<div class="buttons is-right">
								<button class="button is-outlined" @click="invite" :class="{ 'is-hidden': is_new }">Send Invite</button>
								<button class="button is-outlined" @click="unlock" :class="{ 'is-hidden': !is_locked }">Unlock</button>
								<button class="button is-outlined" @click="impersonate" :class="{ 'is-hidden': is_new }">Impersonate</button>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	</Form>
</template>

<script>
	import * as yup from 'yup';
	import lib from '!/library-web/lib';
	import utils from '@/utils';
	import Team from '@/components/Team.vue';
	import Role from '@/components/Role.vue';

	export default {
		components: {
			Team,
			Role,
		},
		data() {
			const schema = yup.object().shape({
				email: yup.string().email('Invalid email').required('Email is required'),
				first_name: yup.string().required('First name is required'),
				last_name: yup.string().required('Last name is required'),
			});
			return {
				user_id: '',
				first_name: '',
				last_name: '',
				email: '',
				team_id: '',
				role_id: '',
				schema,
				sendinvite: false,
				is_locked: false,
				is_new: false,
			};
		},
		async created() {
			await this.load();
		},
		methods: {
			async load() {
				this.user_id = this.$route.params.user_id;
				if (this.user_id !== '-') {
					let user = await utils.api.post(`/users/${this.user_id}/general`);
					this.first_name = user.first_name;
					this.last_name = user.last_name;
					this.email = user.email;
					this.is_locked = user.login_attempts > 3;
					this.is_new = false;
				} else {
					this.is_new = true;
				}
			},
			async submit(form) {
				form.sendinvite = this.sendinvite;
				form.team_id = this.team_id;
				form.role_id = this.role_id;
				let result = await utils.api.post(`/users/${this.user_id}/general/save`, form);
				if (result.success) {
					if (this.user_id === '-') {
						this.$router.push(`/users`);
					}
					lib.toast.show('Save successful!');
				} else {
					lib.toast.showError(result.message);
				}
			},
			async unlock() {
				event.preventDefault();
				let result = await utils.api.post(`/users/${this.user_id}/general/unlock`);
				if (result.success) {
					lib.toast.show('Unlock successful!');
				}
			},
			async invite() {
				event.preventDefault();
				let result = await utils.api.post(`/users/${this.user_id}/general/invite`);
				if (result.success) {
					lib.toast.show('Invite successful!');
				}
			},
			async impersonate() {
				event.preventDefault();
				let result = await utils.api.post(`/users/${this.user_id}/general/impersonate`);
				// window.open(result.link, '_blank');
				navigator.clipboard.writeText(result.link);
				lib.toast.show('Link copied to clipboard');
			},
			async onChange(selected) {
				this.team_id = selected;
			},
			async onChangeRole(selected) {
				this.role_id = selected;
			},
		},
	};
</script>
