/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-04 19:20:38
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-12 13:36:54
 * @FilePath: \vue3-warter\vite.config.js
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import dnsPrefetchPlugin from './vite-plugin-dns-prefetch.js'

// https://vitejs.dev/config/

export default ({ command, mode }) => {
  return defineConfig({
    base: loadEnv(mode, process.cwd(), '').VITE_PUBLIC_PATH,
    server: {
      host: '192.168.8.14',
      port: '8081',
      cors: true,
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            navi: ['vue', 'naive-ui']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': ['NButton']
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      dnsPrefetchPlugin({})
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
