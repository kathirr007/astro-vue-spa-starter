import react from '@astrojs/react'
import vue from '@astrojs/vue'
import { unheadVueComposablesImports } from '@unhead/vue'
// @ts-check
import { defineConfig } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'
import Components from 'unplugin-vue-components/vite'

import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoRoute from 'unplugin-vue-router/vite'

export default defineConfig({
    integrations: [
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                '@vueuse/core',
                VueRouterAutoImports,
                unheadVueComposablesImports,
                {
                    // add any other imports you were relying on
                    'vue-router/auto': ['useLink'],
                },
            ],
            dts: true,
            dirs: [
                './src/vue-app/composables',
            ],
            vueTemplate: true,
        }),
        vue({
            appEntrypoint: '/src/vue-app/main.ts',
            devtools: {
                componentInspector: true,
                launchEditor: 'code'
            },
        }),
        react(),
    ],
    vite: {
        plugins: [
            AutoRoute({
                logs: true,
                dts: true,
                routesFolder: [
                    {
                        src: 'src/vue-app/pages',
                        path: '',
                    },
                ],
            }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        directoryAsNamespace: true,
        deep: true,
        dirs: [
          './src/vue-app/components',
        ],
      }),
    ],
  },
})
