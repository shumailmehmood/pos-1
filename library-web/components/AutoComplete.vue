<template>
	<div class="autocomplete">
		<input type="text" placeholder="Phone or Email" @input="onChange" v-model="query" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" @keyup.enter="onEnter" />
		<ul ref="scrollContainer" id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
			<li class="loading" v-if="isLoading"> Loading results... </li>
			<li v-else-if="results.length" v-for="(result, i) in results" :key="i" ref="options" v-on:click="setResult(result, i)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
				{{ result?.label }}
			</li>
			<!-- <li v-else class="autocomplete-result">
				{{ 'No results found' }}
			</li> -->
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'AutoComplete',
		props: {
			items: {
				type: Array,
				required: false,
				default: () => [],
			},
			isAsync: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		data() {
			return {
				isOpen: false,
				results: [],
				search: { value: '', label: '', status: false },
				query: '',
				isLoading: false,
				arrowCounter: 0,
			};
		},
		watch: {
			items: function (value, oldValue) {
				if (value.length !== oldValue.length) {
					this.results = value;
					this.isLoading = false;
				}
			},
		},
		mounted() {
			document.addEventListener('click', this.handleClickOutside);
		},
		unmounted() {
			document.removeEventListener('click', this.handleClickOutside);
		},
		methods: {
			setResult(result, i) {
				this.arrowCounter = i;
				this.search = this.items[i];
				this.query = this.search?.label;
				this.isOpen = false;
				this.$emit('selected', this.search);
			},
			onEnter() {
				this.selectSearchQuery();
				this.isOpen = false;
				if (Object.values(this.results).length > 0) {
					this.search = this.results[this.arrowCounter];
					this.query = this.search?.label;
				} else {
					this.search = this.query;
				}
				// this.arrowCounter = -1;
				this.$emit('selected', this.search);
			},
			filterResults() {
				this.results = this.items.filter((item) => {
					return item?.label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
				});
			},
			selectSearchQuery() {
				if (this.search?.label == '' || this.query?.includes(this.search) || !this.search?.label?.includes(this.query)) {
					this.search = this.query;
					return;
				}
			},
			onChange() {
				if (this.isAsync) {
					this.isLoading = true;
				} else {
					this.filterResults();
					if(this.results.length === 0){
						this.isOpen = false;
					} else {
						this.isOpen = true;
					}	
				}
				this.selectSearchQuery();
				this.$emit('input', this.search);
			},
			handleClickOutside(event) {
				if (!this.$el.contains(event.target)) {
					this.isOpen = false;
					this.arrowCounter = -1;
				}
			},
			onArrowDown(ev) {
				ev.preventDefault();
				if (this.arrowCounter < this.results.length - 1) {
					this.arrowCounter = this.arrowCounter + 1;
					this.fixScrolling();
				}
			},
			onArrowUp(ev) {
				ev.preventDefault();
				if (this.arrowCounter >= 1) {
					this.arrowCounter = this.arrowCounter - 1;
					this.fixScrolling();
				}
			},
			fixScrolling() {
				const liH = this.$refs.options[this.arrowCounter].clientHeight;
				this.$refs.scrollContainer.scrollTop = liH * this.arrowCounter;
			},
			showAll() {
				this.isOpen = !this.isOpen;
				this.isOpen ? (this.results = this.items) : (this.results = []);
			},
		},
	};
</script>

<style scoped>
	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: rgb(183, 183, 183);
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: rgb(183, 183, 183);
	}

	::-ms-input-placeholder {
		/* Microsoft Edge */
		color: rgb(183, 183, 183);
	}
	.autocomplete {
		position: relative;
	}

	.autocomplete input {
		width: 100%;
		height: 50px;
		font-weight: 600;
		font-size: 1rem;
	}

	.autocomplete ul {
		position: absolute;
		width: 100%;
		background-color: white;
		z-index: 9999;
		scroll-behavior: smooth; /* nice smooth movement */
		overflow: hidden;
	}

	.autocomplete-results {
		padding: 0;
		margin: 0;
		border: 1px solid #eeeeee;
		height: 100px;
		overflow: auto;
	}

	.autocomplete-result {
		list-style: none;
		text-align: left;
		padding: 4px 2px;
		cursor: pointer;
	}

	.autocomplete-result.is-active,
	.autocomplete-result:hover {
		background-color: blueviolet;
		color: white;
	}
</style>
