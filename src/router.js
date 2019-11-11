import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('./view/main/LayoutSite.vue'),
			children: [
				{
					path: '',
					component: () => import('./components/main/PageMain.vue')
				},
			]
		},
		{
			path: '/dashboard',
			component: () => import('./view/admin/LayoutAdmin.vue'),
			children: [
				{
					path: '',
					component: () => import('./components/admin/Dashbard.vue')
				},
				{
					path: 'contents',
					component: () => import('./components/admin/Contents.vue')
				},
				{
					path: 'content/add',
					component: () => import('./components/admin/ContentDetail.vue')
				},
				{
					path: 'content/edit/id/:id',
					component: () => import('./components/admin/ContentDetail.vue')
				},
				{
					path: 'categories',
					component: () => import('./components/admin/Category.vue')
				},
				{
					path: 'category/add',
					component: () => import('./components/admin/CategoryDetail.vue')
				},
				{
					path: 'category/edit/id/:id',
					component: () => import('./components/admin/CategoryDetail.vue')
				},
				{
					path: 'users',
					component: () => import('./components/admin/User.vue')
				},
				{
					path: 'user/add',
					component: () => import('./components/admin/UserDetail.vue')
				},
				{
					path: 'user/edit/id/:id',
					component: () => import('./components/admin/UserDetail.vue')
				},
				{
					path: 'sliders',
					component: () => import('./components/admin/Slider.vue')
				},
				{
					path: 'slider/add',
					component: () => import('./components/admin/SliderDetail.vue')
				},
				{
					path: 'slider/type/:type/id/:id',
					component: () => import('./components/admin/SliderDetail.vue')
				},
				{
					path: 'slider/edit/slider_id/:slider_id',
					component: () => import('./components/admin/SliderDetail.vue')
				},
			]
		},
		{
			path: '/dashboard/login',
			component: () => import('./view/admin/LayoutLogin.vue'),
			children: [
				{
					path: '',
					component: () => import('./components/admin/Login.vue')
				},
			]
		}
	],
	scrollBehavior() {
		return {x: 0, y: 0};
	}
});
