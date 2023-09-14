<template>
	<span>{{ text }}</span>
</template>
<script>
	import moment from 'moment';
	export default {
		name: 'TimeAgo',
		props: {
			timestamp: Number,
			seconds: Boolean,
		},
		data() {
			return {
				// timestamp: 0,
			};
		},
		computed: {
			text() {
				if (moment(parseInt(this.timestamp)).isValid()) {
					if (this.seconds) {
						let seconds = moment().diff(moment(parseInt(this.timestamp)), 'seconds');
						if (seconds > 60) {
							return moment(parseInt(this.timestamp)).fromNow(true) + ' ago';
						} else {
							return seconds + ' seconds ago';
						}
					} else {
						return moment(parseInt(this.timestamp)).fromNow(true) + ' ago';
					}
				} else {
					return '';
				}
			},
		},
	};
</script>
