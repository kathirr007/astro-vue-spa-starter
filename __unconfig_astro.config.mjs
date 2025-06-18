
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
// @ts-check
import { defineConfig } from 'astro/config';
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/astro'
import Components from 'unplugin-vue-components/vite'

import vue from '@astrojs/vue';

import react from '@astrojs/react';


const __unconfig_default =  defineConfig({
    // output: 'server',
    integrations: [
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                '@vueuse/core',
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
if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;