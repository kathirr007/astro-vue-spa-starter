import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import type { App } from 'vue'

import Home from './pages/index.vue';
import About from './pages/about.vue';
import * as autoRoutes from 'vue-router/auto-routes';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client'


const routes = autoRoutes.routes as readonly RouteRecordRaw[]

export default (app: App) => {
	if (!import.meta.env.SSR) {
		const pinia = createPinia()
		const head = createHead()

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

		app.use(head);
		app.use(pinia);
		app.use(router);
	}
};