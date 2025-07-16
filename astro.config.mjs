// @ts-check
import { defineConfig } from 'astro/config';
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/astro'
import Components from 'unplugin-vue-components/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import vue from '@astrojs/vue';
import react from '@astrojs/react';

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
            VueRouter({
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
        ]
    }
});