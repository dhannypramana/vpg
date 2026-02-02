import path from 'node:path';
import TailwindCSS from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import fg from 'fast-glob';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig, loadEnv } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
    const env = { ...process.env, ...loadEnv(mode, `${process.cwd()}`, '') };
    const port = !Number.isNaN(Number(env.VITE_APP_PORT)) ? Number(env.VITE_APP_PORT) : 8002;

    return {
        plugins: [
            VueRouter({
                extensions: ['.vue'],
                dts: 'src/typed-router.d.ts',
                routesFolder: [
                    'src/common/pages',
                    ...fg.sync(
                        'src/features/**/pages',
                        { onlyDirectories: true },
                    ),
                ],
            }),
            Vue(),
            VueDevTools(),
            TailwindCSS(),
            AutoImport({
                imports: [
                    'vue',
                    'pinia',
                    '@vueuse/core',
                    'vee-validate',
                    VueRouterAutoImports,
                    {
                        'axios': [['default', 'axios']],
                        'vue-router/auto': ['createRouter', 'createWebHistory', 'createWebHashHistory'],
                        '@unhead/vue': ['useHead', 'useSeoMeta'],
                        'vee-validate': ['useForm'],
                        '@vee-validate/yup': ['toTypedSchema'],
                        'yup': ['object', 'string', 'number', 'array', 'mixed', 'date', 'boolean', 'tuple', 'setLocale', ['ref', 'yupRef'], 'addMethod', 'setLocale'],
                        'vue-sonner': ['toast'],
                        '@tanstack/vue-query': ['useQuery', 'useMutation', 'useQueryClient', 'QueryClient', 'QueryClientProvider'],
                        'clsx': ['clsx'],
                        'tailwind-merge': ['twMerge'],
                        'class-variance-authority': ['cva'],
                    },
                ],
                dts: 'src/auto-imports.d.ts',
                dirs: [
                    'src/common/builders/**',
                    'src/common/composables/**',
                    'src/common/constants/**',
                    'src/common/endpoints/**',
                    'src/common/exceptions/**',
                    'src/common/services/**',
                    'src/common/stores/**',
                    'src/common/types/**',
                    'src/common/utils/**',

                    'src/features/**/builders/**',
                    'src/features/**/composables/**',
                    'src/features/**/constants/**',
                    'src/features/**/endpoints/**',
                    'src/features/**/exceptions/**',
                    'src/features/**/services/**',
                    'src/features/**/stores/**',
                    'src/features/**/types/**',
                    'src/features/**/utils/**',
                ],
                vueTemplate: true,
            }),
            Components({
                extensions: ['vue'],
                include: [/\.vue$/, /\.vue\?vue/],
                dts: 'src/components.d.ts',
                dirs: [
                    'src/common/components',
                    'src/features/**/components',
                ],
            }),
        ],

        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@root': path.resolve(__dirname),
                '@common': path.resolve(__dirname, 'src/common'),
                '@features': path.resolve(__dirname, 'src/features'),
            },
        },

        server: {
            port,
            strictPort: true,
        },

        test: {
            environment: 'node',
            globals: true,
            include: ['src/**/*.test.ts'],
        },
    };
});
