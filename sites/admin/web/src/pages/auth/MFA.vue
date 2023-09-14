<template>
	<div id="login-container" class="has-text-centered is-vcentered">
		<h1 class="center">Please check your email</h1>
		<p class="center">Enter the code from email below</p>
		<Form @submit="submit" :validation-schema="schema">
			<div class="app-input">
				<Field name="code" type="text" placeholder="code" maxlength="6" class="full" autocomplete="off" />
				<label for="code">Code</label>
				<ErrorMessage name="code" />
			</div>
			<div class="app-input">
				<button class="button is-primary full glow">Login</button>
			</div>
		</Form>
	</div>
	<div class="modal" :class="{ 'is-active': modal }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Invalid Code</p>
			</header>
			<section class="modal-card-body">{{ modal_message }}. <br />Please make sure the correct code is used otherwise your account will be locked.</section>
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
		created() {
			if (!lib.store.getSession('mfaid')) {
				this.$router.push(`/login`);
			}
		},
		data() {
			const schema = yup.object().shape({
				code: yup.string().required('Code is required').length(6, 'Must be 6 digits'),
			});

			return {
				modal: false,
				modal_message: '',
				schema,
			};
		},
		methods: {
			async submit(form) {
				let result = await lib.http.post('/auth/mfa', {
					mfaid: lib.store.getSession('mfaid'),
					code: form.code,
				});
				if (!result.success) {
					if (result.inputs && result.inputs['code']) {
						this.modal_message = result.inputs['code'].message;
					}
					this.modal = true;
				} else {
					lib.store.save('token', result.token);
					lib.emitter.emit('login');
					this.$router.push(`/`);
				}
			},
			start() {
				this.$router.push(`/login`);
			},
		},
	};
</script>

<style>
	#login-container {
		min-width: 350px;
	}
</style>
