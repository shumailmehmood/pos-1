<template>
	<span>{{ update(timestamp) }}</span>
</template>
<script>
import moment from "moment";
export default {
	name: "TimeIn",
	props: {
		timestamp: Number,
	},
	methods: {
		update() {
			if (moment(parseInt(this.timestamp)).isValid()) {
				return moment(parseInt(this.timestamp)).fromNow();
			}
		},
	},
};
</script>
