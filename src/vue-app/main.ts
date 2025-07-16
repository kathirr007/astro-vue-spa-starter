import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import * as autoRoutes from 'vue-router/auto-routes'

const routes = autoRoutes.routes as readonly RouteRecordRaw[]

export default (app: App) => {
  if (!import.meta.env.SSR) {
    const pinia = createPinia()
    const head = createHead()

    const router = createRouter({
      history: createWebHistory('/vue-app'),
      routes,
    })

    app.use(head)
    app.use(pinia)
    app.use(router)
  }
}
