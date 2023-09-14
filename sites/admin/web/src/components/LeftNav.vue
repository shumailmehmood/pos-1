<template>
	<aside class="leftnav" :class="{ 'leftnav-collapse': collapse }">
		<div class="left-nav-header">
			<img id="logo" :src="'/admin/images/logo.png'" />
		</div>
		<div class="leftnav-item" v-for="item in menu" :key="item" @click="go(item)"
			:class="{ 'leftnav-item-active': item.active }">
			<span class="icon">
				<i class="bx" :class="'bx-' + item.icon"></i>
			</span>
			<span class="leftnav-item-text">{{ item.text }}</span>
		</div>
		<div class="leftnav-profile" @click="go({ path: '/profile' })">
			<i class="bx bx-user"></i>
			<span class="status"></span>
		</div>
		<div class="leftnav-closer" @click="close">
			<i class="bx bx-left-arrow-alt"></i>
		</div>
		<div class="leftnav-opener" @click="open">
			<i class="bx bx-right-arrow-alt"></i>
		</div>
	</aside>
</template>
<script>
import $ from 'jquery';
import _ from 'lodash';
import lib from '!/library-web/lib';
import utils from '@/utils';

export default {
	data: () => ({
		collapse: false,
		menu: [],
	}),
	created() {
		lib.emitter.on('route_change', () => {
			this.load();
		});
		this.load();
	},
	methods: {
		async load() {
			this.collapse = lib.store.get('left-nav-collapse');
			let menuItems = [
				{
					id: 'home',
					icon: 'home',
					text: 'Home',
					path: '/',
					active: false,
				},
				{
					id: 'teams',
					icon: 'buildings',
					text: 'Care Teams',
					path: '/teams',
					active: false,
				},
				{
					id: 'users',
					icon: 'user-circle',
					text: 'Care Staff',
					path: '/users',
					active: false,
				},
				{
					id: 'patients',
					icon: 'group',
					text: 'Patients',
					path: '/patients',
					active: false,
				},
				{
					id: 'reports',
					icon: 'line-chart',
					text: 'Reports',
					path: '/reports',
					active: false,
				},
				{
					id: 'providers',
					icon: 'file',
					text: 'Providers',
					path: '/providers',
					active: false,
				},
				{
					id: 'admins',
					icon: 'briefcase',
					text: 'Admins',
					path: '/admins',
					active: false,
				},
				{
					id: 'settings',
					icon: 'wrench',
					text: 'Settings',
					path: '/settings',
					active: false,
				},
			];
			let userRoles = utils.auth.getUserRoles();
			this.menu = _.filter(menuItems, (item) => {
				let route = _.find(this.$router.options.routes, { path: item.path });
				if (route && route.meta && route.meta.authorize) {
					return route.meta.authorize.some((record) => userRoles.includes(record));
				} else {
					return true;
				}
			});
			this.makeActive();

			this.checkMobile();
			window.addEventListener('resize', this.checkMobile);
		},
		close() {
			this.collapse = true;
			lib.store.save('left-nav-collapse', this.collapse);
			this.$emit('leftNavCollapse');
		},
		open() {
			this.collapse = false;
			lib.store.save('left-nav-collapse', this.collapse);
			this.$emit('leftNavCollapse');
		},
		async go(item) {
			await this.$router.push(item.path);
			this.makeActive();
		},
		makeActive() {
			_.each(this.menu, (item) => {
				if (item.path === '/') {
					item.active = this.$router.currentRoute.value.path === '/';
				} else {
					item.active = this.$router.currentRoute.value.path.startsWith(item.path);
				}
			});
		},
		checkMobile() {
			let width = $(window).width();
			if (width < 600) {
				this.close();
			}
		},
	},
};
</script>
<style>
#logo {
	max-width: 100px;
	max-height: 40px;
	margin: 20px 0px 20px 0px;
}

.leftnav {
	position: absolute;
	left: 0;
	top: 3px;
	background-color: #454747;
	position: absolute !important;
	z-index: 9001;
	height: calc(100% - 6px);
	width: 260px;
	max-width: 260px;
	border-radius: 0 30px 30px 0;
	padding: 15px 0px 0px 0px;
	transition: all 0.25s ease;
	box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
}

.leftnav-collapse {
	width: 50px;
	max-width: 500px;
}

.leftnav-collapse .leftnav-item-text {
	display: none;
}

.leftnav-collapse .icon:hover+.leftnav-item-text {
	/* display: block;
	margin-top: -22px;
	margin-left: 50px; */
}

.leftnav-collapse .leftnav-item,
.leftnav-collapse .leftnav-item-active,
.leftnav-collapse .leftnav-item:hover {
	padding: 0px 0px 0px 10px;
}

.leftnav-collapse .leftnav-closer {
	display: none;
}

.leftnav-collapse .leftnav-opener {
	display: block;
}

.leftnav-collapse .left-nav-header {
	display: none;
}

.left-nav-header {
	margin: 0px 0px 0px 0px;
	text-align: center;
}

.leftnav-item {
	padding: 6px 0px 0px 10px;
	margin: 0px 0px 10px 0px;
	height: 40px;
	border-left: 5px solid #454747;
	font-weight: 700;
	font-size: 15px;
	cursor: pointer;
	transition: all 0.25s ease;
}

.leftnav-item:hover {
	padding: 0px 0px 0px 10px;
	color: white;
}

.leftnav-item-active {
	padding: 0px 0px 0px 10px;
	color: white;
	border-left: 5px solid white;
	border-radius: 5px 0px 0px 5px;
}

.leftnav-item .bx {
	font-size: 20px;
	transition: all 0.25s ease;
}

.leftnav-item-text {
	margin: 0px 0px 0px 10px;
	transition: all 0.25s ease;
	color: #606060;
	font-size: 18px;
	text-transform: uppercase;
	font-weight: 550;
}

.leftnav-collapse .leftnav-profile {
	bottom: 60px;
}

.leftnav-profile {
	position: absolute;
	width: 30px;
	height: 30px;
	left: 10px;
	bottom: 30px;
	padding: 0px;
	border-radius: 15px;
	cursor: pointer;
	transition: all 0.25s ease;
}

.leftnav-profile .bx {
	font-size: 24px;
	padding-top: 2px;
	padding-left: 2px;
}

.leftnav-profile .status {
	position: absolute;
	background-color: rgb(8, 179, 8);
	width: 10px;
	height: 10px;
	bottom: -2px;
	right: -2px;
	border-radius: 15px;
}

.leftnav-closer {
	position: absolute;
	width: 30px;
	height: 30px;
	right: 10px;
	bottom: 25px;
	border-radius: 5px;
	padding: 0px;
	border-radius: 15px;
	cursor: pointer;
	transition: all 0.25s ease;
}

.leftnav-closer .bx {
	font-size: 24px;
	padding-top: 2px;
	padding-left: 2px;
}

.leftnav-opener {
	display: none;
	position: absolute;
	width: 30px;
	height: 30px;
	right: 9px;
	bottom: 25px;
	border-radius: 5px;
	padding: 0px;
	border-radius: 15px;
	cursor: pointer;
	transition: all 0.25s ease;
}

.leftnav-opener .bx {
	font-size: 24px;
	padding-top: 2px;
	padding-left: 2px;
}
</style>
<style scoped>
.bx {
	color: white;
}
</style>
