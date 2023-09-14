<template>
	<span>{{ update(amount) }}</span>
</template>
<script>
export default {
	name: "Money",
	props: {
		amount: Number,
	},
	methods: {
		update() {
			return this.amount ? `$${this.amount.toFixed(2)}` : "$0.00";
		},
	},
};
</script>
