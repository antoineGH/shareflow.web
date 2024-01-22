import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import envCompatible from 'vite-plugin-env-compatible'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    base: '/shareflow',
    assetsInclude: ['**/*.svg'],
    plugins: [
      checker({
        typescript: true,
        enableBuild: false,
        eslint: {
          lintCommand: 'eslint --ext .js,.tsx,.ts" ',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
      react(),
      svgr(),
      envCompatible(),
      viteTsconfigPaths(),
      polyfillNode(), // Add this line
      basicSsl(),
    ],
    optimizeDeps: {
      esbuildOptions: {},
    },
    server: {
      host: 'localhost',
      port: 3000,
      // https: true,
      open: true,
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 3000,
      minify: true, // Change this line
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        cache: false,
        output: [
          {
            sourcemapIgnoreList: relativeSourcePath =>
              relativeSourcePath.includes('node_modules'),
          },
        ],
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'], // Change this line
    },
  }
})
