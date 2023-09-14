<template>
	<div class="wrapper">
		<div v-for="(character, index) in code" :key="index">
			<input @paste="handlePaste($event, index)" :name="`code-${index}`" :id="`code-${index}`" class="code-input" autocomplete="off" maxlength="1" :value="code[index]" v-on:input="handleInput($event, index)" @keydown="removeVal($event, index)" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'MFAInput',
	data() {
		return {
			code: new Array(6).fill(''),
		};
	},
	props: {
		handleSubmit: {
			type: Function,
			required: true,
		},
	},
	methods: {
		handleInput(e, index) {
			this.code[index] = e.target.value;
			if (index < 5 && this.code[index]) {
				const ele = this.$el.querySelector(`#code-${index + 1}`);
				ele.focus();
			}
			this.submit();
		},
		submit() {
			const isSixDigitCode = this.code.every((digit) => digit.length);
			if (isSixDigitCode) {
				const parsedCode = this.code.join('');

				this.handleSubmit(parsedCode);
			}
		},
		handlePaste(e, index) {
			e.preventDefault();
			const data = e.clipboardData.getData('text').split('');

			data.map((ele, i) => {
				if (index + i < 6) {
					this.code[index + i] = ele;
				}
			});
			this.submit();
		},
		removeVal(e, index) {
			if (e.keyCode === 8 && !e.target.value && index !== 0) {
				const ele = this.$el.querySelector(`#code-${index - 1}`);
				ele.focus();
			}
		},
	},
};
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
}

.wrapper > div {
	margin-right: 16px;
}

input.code-input {
	font-size: 1.5em;
	width: 2.1em;
	text-align: center;
}

input {
	padding: 10px;
	border-radius: 4px;
	color: #4a4a4a;
	border: 0;
	border: 1px solid #ececec;
}

input:invalid {
	box-shadow: none;
}
input:focus {
	outline: none;
	border: solid 2px purple;
}
</style>
