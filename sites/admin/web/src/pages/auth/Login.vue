<template>
	<div id="login-container" class="has-text-centered is-vcentered">
		<img id="logo" :src="`/admin/images/logo.png`" />
		<Form @submit="submit" :validation-schema="schema">
			<div class="app-input">
				<Field name="email" type="text" placeholder="email" class="full" />
				<label for="email">Email</label>
				<ErrorMessage name="email" />
			</div>
			<div class="app-input">
				<button class="button is-primary full glow">Next</button>
			</div>
		</Form>
	</div>
	<div class="modal" :class="{ 'is-active': modal }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Oops, something's not right</p>
			</header>
			<section class="modal-card-body">{{ modal_message }}</section>
			<footer class="modal-card-foot">
				<button class="button is-primary" @click="start">Continue</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import lib from '!/library-web/lib';

export default {
	name: 'Login',
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			email: yup.string().email('Invalid email').required('Email is required'),
		});

		return {
			modal: false,
			modal_message: '',
			schema,
		};
	},
	methods: {
		async submit(user) {
			let result = await lib.http.post('/auth/login', {
				email: user.email,
			});
			if (!result.success) {
				if (result.inputs && result.inputs['email']) {
					this.modal_message = result.inputs['email'].message;
				}
				this.modal = true;
			} else {
				lib.store.saveSession('mfaid', result.mfaid);
				this.$router.push(`/mfa`);
			}
		},
		start() {
			this.modal = false;
		},
	},
};
</script>

<style>
#login-container {
	min-width: 350px;
}

#logo {
	width: 100px;
	margin-bottom: 30px;
}
</style>
