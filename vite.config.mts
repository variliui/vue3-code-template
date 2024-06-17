import * as path from 'path'
import { defineConfig, loadEnv, UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from 'vite-plugin-babel'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
//引入
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html';
import ElementPlus from 'unplugin-element-plus/vite'

const pathSrc = path.resolve(__dirname, 'src');
const getViteEnv = (mode: string, target: string) => {
	return loadEnv(mode, process.cwd())[target];
};

export default defineConfig(({ command, mode }: ConfigEnv):UserConfig => {
  const isBuild = command === 'build'
  const commonConfig = {
    resolve: {
      alias: {
        '@/': `${pathSrc}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        },
        less: {
          math: 'always',
          globalVars: {}
        }
      }
    },
    plugins: [
      vue(),
      babel(),
      vueJsx(),
      ElementPlus({
        // options
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        dirs: [`./src/components/`, './src/views/', './assets/icons/', './src/layout/'],
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
        ],
        dts: 'src/components.d.ts'
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        configFile: './uno.config.ts'
      }),
      //在plugins配置数组里添加gzip插件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      createHtmlPlugin({
				inject: {
					data: {
						logo: getViteEnv(mode, 'VITE_APP_LOGO'),
						title: getViteEnv(mode, 'VITE_APP_TITLE'),
					},
				},
			}),

      viteMockServe({
        mockPath: 'mock',
        enable: true,
        watchFiles: true,
      }),
    ],
    build: {
      target: 'esnext',
      minify: 'esbuild',
      outDir: 'dist',
      assetsDir: 'assets', //指定静态资源存放路径
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: false,
      // sourcemap: false, //是否构建source map 文件
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id: any) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
  }
  let finalConfig = {}
  if (!isBuild) {
    // dev 独有配置
    finalConfig = {
      ...commonConfig,
      server: {
        open: true,
        port: 9521,
        proxy: {
          // Using the proxy instance
          '/api': {
            // kq: 48 zh: 60
            // target: 'https://192.168.1.60:443/internal',
            target: 'https://192.168.0.155:443/internal',
            // target: 'https://192.168.0.170:443/internal',
            ws: true,
            // log: "debug",
            secure: false,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, '')
          }
        }
      }
    }
  } else {
    // prod 独有配置
    finalConfig = {
      ...commonConfig,
      base: './'
    }
  }
  return finalConfig
})
