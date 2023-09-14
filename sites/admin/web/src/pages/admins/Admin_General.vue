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

	export default {
		data() {
			const schema = yup.object().shape({
				email: yup.string().email('Invalid email').required('Email is required'),
				first_name: yup.string().required('First name is required'),
				last_name: yup.string().required('Last name is required'),
			});
			return {
				admin_id: '',
				first_name: '',
				last_name: '',
				email: '',
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
				this.admin_id = this.$route.params.admin_id;
				if (this.admin_id !== '-') {
					let data = await utils.api.post(`/admins/${this.admin_id}/general`);
					this.first_name = data.admin.first_name;
					this.last_name = data.admin.last_name;
					this.email = data.admin.email;
					this.is_locked = data.admin.login_attempts > 3;
					this.is_new = false;
				} else {
					this.is_new = true;
				}
			},
			async submit(form) {
				form.sendinvite = this.sendinvite;
				let result = await utils.api.post(`/admins/${this.admin_id}/general/save`, form);
				if (result.success) {
					if (this.admin_id === '-') {
						this.$router.push(`/admins`);
					}
					lib.toast.show('Save successful!');
				}
			},
			async unlock() {
				event.preventDefault();
				let result = await utils.api.post(`/admins/${this.admin_id}/general/unlock`);
				if (result.success) {
					lib.toast.show('Unlock successful!');
				}
			},
			async invite() {
				event.preventDefault();
				let result = await utils.api.post(`/admins/${this.admin_id}/general/invite`);
				if (result.success) {
					lib.toast.show('Invite successful!');
				}
			},
		},
	};
</script>
