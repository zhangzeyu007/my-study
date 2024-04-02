/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 10:40:34
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 15:27:27
 * @FilePath: \vue3ts\vite.config.ts
 */

import type { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite'


const CWD = process.cwd();
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);
  console.log(command, 'command');
  // const isBuild = command === 'build';
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        }
      ],
    },
    server: {
      port: 8888,
      // proxy: {
      //   '/api': {
      //     // 免费的在线REST API
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    build: {
      minify: 'terser',
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: Object.is(VITE_DROP_CONSOLE, 'true'),
        },
      },
    },
    optimizeDeps: {
      include: ['vant', '@vant/touch-emulator'],
      exclude: ['vue-demi'],
    },
    plugins: [
      vue(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: 'src/types/auto-imports.d.ts',
        resolvers: [VantResolver()],
      })
    ]
  }
}