<template>
	<div class="columns">
		<div class="column">
			<datepicker v-model="start" @select="change" class="full" />
		</div>
		<div class="column">
			<datepicker v-model="end" @select="change" class="full" />
		</div>
	</div>
</template>
<script>
	import Datepicker from 'vue3-datepicker';

	export default {
		components: {
			Datepicker,
		},
		name: 'DateRange',
		props: ['startDate', 'endDate'],
		emits: ['select'],
		data() {
			return {
				start: this.startDate,
				end: this.endDate,
			};
		},
		methods: {
			change() {
				this.$emit('select', {
					startDate: this.start,
					endDate: this.end,
				});
			},
		},
		watch: {
			startDate(val) {
				this.start = val;
			},
			endDate(val) {
				this.end = val;
			},
			start() {
				this.$emit('select', {
					startDate: this.start,
					endDate: this.end,
				});
			},
			end() {
				this.$emit('select', {
					startDate: this.start,
					endDate: this.end,
				});
			},
		},
	};
</script>

<style scoped></style>
