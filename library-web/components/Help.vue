<template>
	<div class="supportlink">
		<Popper v-bind="$attrs" openDelay="200" closeDelay="100" placement="left" @open:popper="load">
			<span class="icon iconWrapper">
				<i class="bx bx-question-mark"></i>
			</span>
			<template #content>
				<article class="tile box tooltiptext tooltipcard">
					<div v-if="showPopperLoader">Loading...</div>
					<div class="field tooltipcard" v-if="showPopperLoader === false">
						<p>{{ tooltipContent }} </p>
						<router-link :to="wiki_id" v-if="wiki_id" target="_blank" class="readMoreLink">Read More</router-link>
					</div>
				</article>
			</template>
		</Popper>
	</div>
</template>

<script>
import Popper from 'vue3-popper';
import utils from '@/utils';

export default {
	components: {
		Popper,
	},
	props: {
		help_id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			tooltipContent: '',
			wiki_id: '',
			showPopperLoader: true,
		};
	},
	methods: {
		async load() {
			const {
				support_link: { content, wiki_id },
			} = await utils.api.post(`/support_link/${this.help_id}`);
			this.tooltipContent = content;
			this.wiki_id = wiki_id;
			this.showPopperLoader = false;
		},
	},
};
</script>
<style scoped>
.supportlink {
	position: absolute;
	top: 10px;
	right: 10px;
}
.iconWrapper {
	border: solid #dbdbdb 2px;
	border-radius: 15px;
	font-size: 20px;
	padding: 10px;
	cursor: pointer;
	color: #8689af;
}
span:hover {
	border-color: #b5b5b5;
}

.tooltipcard {
	border-radius: 0px !important;
	max-width: 300px;
	min-width: 200px;
	text-align: justify;
}

.readMoreLink {
	float: right;
	margin-top: 10px;
}
</style>
