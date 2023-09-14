import { createWebHistory, createRouter } from 'vue-router';
import lib from '!/library-web/lib';
import utils from '@/utils';

const routes = [
	{
		path: '/',
		component: () => import('@/pages/_Console.vue'),
		children: [
			{
				path: '/',
				component: () => import('@/pages/Home.vue'),
			},
			{
				path: '/teams',
				component: () => import('@/pages/teams/Index.vue'),
				children: [
					{
						path: '/teams',
						component: () => import('@/pages/teams/Teams.vue'),
					},
					{
						path: '/teams/:team_id',
						component: () => import('@/pages/teams/Team.vue'),
						children: [
							{
								path: '/teams/:team_id',
								component: () => import('@/pages/teams/General.vue'),
							}
						],
					},
				],
				meta: {
					authorize: ['super', 'teams'],
				},
			},
			{
				path: '/users',
				component: () => import('@/pages/users/Index.vue'),
				children: [
					{
						path: '/users',
						component: () => import('@/pages/users/Users.vue'),
					},
					{
						path: '/users/:user_id',
						component: () => import('@/pages/users/User.vue'),
						children: [
							{
								path: '/users/:user_id',
								component: () => import('@/pages/users/General.vue'),
							},
							{
								path: '/users/:user_id/teams',
								component: () => import('@/pages/users/Teams.vue'),
							},
							{
								path: '/users/:user_id/roles',
								component: () => import('@/pages/users/Roles.vue'),
							},
						],
					},
				],
				meta: {
					authorize: ['super', 'teams'],
				},
			},
			{
				path: '/patients',
				component: () => import('@/pages/patients/Index.vue'),
				children: [
					{
						path: '/patients',
						component: () => import('@/pages/patients/Patients.vue'),
					},
					{
						path: '/patients/:patient_id',
						component: () => import('@/pages/patients/Patient.vue'),
						children: [
							{
								path: '/patients/:patient_id',
								component: () => import('@/pages/patients/General.vue'),
							}
						],
					},
				],
				meta: {
					authorize: ['super', 'patients'],
				},
			},
			{
                path: '/providers',
                component: () => import('@/pages/providers/Index.vue'),
                children: [
                    {
                        path: '/providers',
                        component: () => import('@/pages/providers/Providers.vue'),
                        
                    },
                    {
                        path: '/providers/:provider_id',
                        component: () => import('@/pages/providers/Provider.vue'),
                        children: [
                            {
                                path: '/providers/:provider_id',
								component: () => import('@/pages/providers/General.vue'),
                            },
							{
								name: 'upload',
                                path: '/upload/:provider_id',
								component: () => import('@/pages/providers/UploadRecords.vue'),
                            },
                            
                        ],
                    },
                    
                ],
                meta: {
                    authorize: ['super', 'providers'],
                },
            },
			{
				path: '/reports',
				component: () => import('@/pages/Reports.vue'),
				meta: {
					authorize: ['super', 'reports'],
				},
			},
			{
				path: '/admins',
				component: () => import('@/pages/admins/Index.vue'),
				meta: {
					authorize: ['super', 'enterprises'],
				},
				children: [
					{
						path: '/admins',
						component: () => import('@/pages/admins/Admins.vue'),
					},
					{
						path: '/admins/:admin_id',
						component: () => import('@/pages/admins/Admin.vue'),
						children: [
							{
								path: '/admins/:admin_id',
								component: () => import('@/pages/admins/Admin_General.vue'),
							},
							{
								path: '/admins/:admin_id/roles',
								component: () => import('@/pages/admins/Admin_Roles.vue'),
							},
						],
					},
				],
			},
			
			{
				path: '/settings',
				name: 'Settings',
				component: () => import('@/pages/settings/Layout.vue'),
				children: [
					{
						path: '/settings',
						component: () => import('@/pages/settings/Index.vue'),
					},
				],
			},
			{
				path: '/profile',
				component: () => import('@/pages/Profile.vue'),
			},
			{
				path: '/database',
				component: () => import('@/pages/Database.vue'),
			}
		],
		meta: {
			guest: false,
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/pages/_Login.vue'),
		children: [
			{
				path: '/login',
				component: () => import('@/pages/auth/Login.vue'),
				meta: {
					guest: true,
				},
			},
			{
				path: '/mfa',
				component: () => import('@/pages/auth/MFA.vue'),
				meta: {
					guest: true,
				},
			},
		],
		meta: {
			guest: true,
		},
	},
	{
		path: '/not_supported',
		component: () => import('@/pages/Not_Supported.vue'),
		meta: {
			guest: true,
		},
	},
];

const router = createRouter({
	history: createWebHistory('/admin/'),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (!to.meta) {
		next();
	} else {
		if (to.matched.some((record) => record.meta.guest)) {
			next();
		} else {
			if (utils.auth.isAuthenticated()) {
				if (to.meta.authorize) {
					let userRoles = await utils.auth.getUserRoles();
					if (to.meta.authorize.some((record) => userRoles.includes(record))) {
						next();
					} else {
						next('/');
					}
				} else {
					next();
				}
			} else {
				console.log('route logout');
				next(`/login?r=${encodeURIComponent(to.fullPath)}`);
			}
		}
	}
});

router.beforeResolve((to, from, next) => {
	lib.progress.start();
	next();
});

router.afterEach(() => {
	if (utils.auth.isAuthenticated()) {
		lib.emitter.emit('route_change');
	}
	lib.progress.stop();
});

export default router;
