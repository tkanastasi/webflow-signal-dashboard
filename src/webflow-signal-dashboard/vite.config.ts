import { defineConfig, withFilter } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        withFilter(
            svgr(),
            { load: { id: /\.svg\?react$/ } },
        ),
        checker({
            eslint: {
                useFlatConfig: true,
                lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
            },
        }),
    ],
    build: {
        sourcemap: true,
        outDir: "build",
        emptyOutDir: true,
        chunkSizeWarningLimit: 1024,
        assetsInlineLimit: 0,
    },
    server: {
        open: '/',
        port: 3079,
        host: true,
    },
    preview: {
        port: 3079,
    }
})

