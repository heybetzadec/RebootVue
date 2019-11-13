import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// const authRequired = !publicPages.includes(to.path);
const loggedIn = true//localStorage.getItem('user');

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
			path: '/dashboard',
			component: () => import('./view/admin/LayoutAdmin.vue'),
			children: [
				{
					path: '',
					component: () => import('./components/admin/Dashboard.vue'),
					beforeEnter: (to, from, next) => {
						if (!loggedIn){
							return next({ path: '/dashboard' });
						} else {
							return next({ path: '/dashboard/login' });
						}

					}
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

// router.beforeEach((to, from, next) => {
// 	// redirect to login page if not logged in and trying to access a restricted page
// 	const publicPages = ['/dashboard/login'];
// 	const authRequired = !publicPages.includes(to.path);
// 	const loggedIn = localStorage.getItem('user');
//
// 	if (authRequired && !loggedIn) {
// 		return next({
// 			path: '/dashboard/login',
// 			query: { returnUrl: to.path }
// 		});
// 	}
//
// 	next();
// });
