import {createRouter, createWebHistory} from 'vue-router';
import type { App } from 'vue'

// import Home from './pages/index.vue';
// import About from './pages/about.vue';
import { routes } from 'vue-router/auto-routes';
import { createPinia } from 'pinia';

export default (app: App) => {
	if (!import.meta.env.SSR) {

		const pinia = createPinia()

		const router = createRouter({
			history: createWebHistory("/vue-app"),
			routes,
			/* routes: [
				{
					path: '/',
					component: Home
				},
				{
					path: '/about',
					component: About
				},
				{
					path: '/blog',
					component: () => import('./pages/blog.vue')
				}
			] */
		});

		app.use(pinia);
		app.use(router);
	}
};