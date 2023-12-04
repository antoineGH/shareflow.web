import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'

export default defineConfig(({ mode }) => {
  const processEnv = loadEnv(mode, process.cwd(), '')

  return {
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
      envCompatible(),
      viteTsconfigPaths(),
      svgrPlugin(),
      basicSsl(),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          polyfillNode({
            globals: {
              buffer: false,
              process: false,
              __dirname: false,
            },
            polyfills: {
              fs: true,
              crypto: true,
            },
          }),
        ],
      },
    },
    server: {
      host: 'localhost',
      port: 3000,
      https: true,
      open: true,
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 3000,
      minify: processEnv.MINIFY_FRONT === 'true',
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
      setupFiles: './src/setupTests.ts',
    },
  }
})
