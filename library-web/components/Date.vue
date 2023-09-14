<template>
	<span>{{ update(timestamp) }}</span>
</template>
<script>
import moment from "moment";
export default {
	name: "Date",
	props: {
		timestamp: Number,
	},
	methods: {
		update() {
			return moment(parseInt(this.timestamp)).local().format("MM/DD/YYYY");
		},
	},
};
</script>
