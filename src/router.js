import Vue from 'vue';
import Router from 'vue-router';
import {appOptions} from "./model/Variables";

Vue.use(Router);

// const authRequired = !publicPages.includes(to.path);
var loggedIn = false;
if (localStorage.token !== undefined) {
	loggedIn = true;
}

export default new Router({
	// data:{
	// 	loggedIn: true
	// },
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
			path: appOptions.adminPath,
			component: () => import('./view/admin/LayoutAdmin.vue'),
			children: [
				{
					path: '',
					component: () => import('./components/admin/Dashboard.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'contents',
					component: () => import('./components/admin/Contents.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'content/add',
					component: () => import('./components/admin/ContentDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'content/edit/id/:id',
					component: () => import('./components/admin/ContentDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'categories',
					component: () => import('./components/admin/Category.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'category/add',
					component: () => import('./components/admin/CategoryDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'category/edit/id/:id',
					component: () => import('./components/admin/CategoryDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'sliders',
					component: () => import('./components/admin/Slider.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'slider/add',
					component: () => import('./components/admin/SliderDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'slider/type/:type/id/:id',
					component: () => import('./components/admin/SliderDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
				},
				{
					path: 'slider/edit/slider_id/:slider_id',
					component: () => import('./components/admin/SliderDetail.vue'),
					beforeEnter: (to, from, next) => {
						if (loggedIn){
							return next();
						} else {
							return next({ path: appOptions.loginPath });
						}
					}
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
				{
					path: 'exit',
					component: () => import('./components/admin/Logout.vue')
				},
			]
		},
	],
	scrollBehavior() {
		return {x: 0, y: 0};
	}
});