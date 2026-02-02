import path from 'node:path';
import Vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
    const env = { ...process.env, ...loadEnv(mode, `${process.cwd()}`, '') };
    const port = !Number.isNaN(Number(env.VITE_APP_PORT)) ? Number(env.VITE_APP_PORT) : 8002;

    return {
        plugins: [
            Vue(),
            VueDevTools(),
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
    };
});
