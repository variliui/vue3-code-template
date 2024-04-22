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
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import { createHtmlPlugin } from 'vite-plugin-html';
import ElementPlus from 'unplugin-element-plus/vite'

// 图标集合请前往 https://icones.netlify.app/
// 使用方式：
// 选中需要的图标，在 Components 标签集合中 点击 VUE TS 即可将图标的vue文件内容复制,
// 然后在/src/assets/icons/ 目录下创建vue文件，将复制的内容粘贴进去。即可当作icon使用。
// 例子: import EpInfoFilled from '~icons/ep/info-filled'
// 然后按照icon变量进行bind即可在模板标签中使用
// -----------以下内容ts报错但是可以用------------------
// 选中需要的图标，在 Components 标签集合中 点击 Unplugin Icons 即可将图标引入
// 例子: import EpInfoFilled from '~icons/ep/info-filled'
// 然后按照icon变量进行bind即可在模板标签中使用

const pathSrc = path.resolve(__dirname, 'src');
const getViteEnv = (mode: string, target: string) => {
	return loadEnv(mode, process.cwd())[target];
};

export default defineConfig(({ command, mode }: ConfigEnv):UserConfig => {
  const isBuild = command === 'build'
  const commonConfig = {
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
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
        dirs: [`./src/components/`, './src/views/', './assets/icons/'],
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          IconsResolver({
            prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
            // alias: { park: 'icon-park' } 集合的别名
            // this is optional, default enabling all the collections supported by Iconify
            enabledCollections: ['ep', 'pixelarticons'], // iconify的集合名称
            customCollections: ['my']
          })
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

      Icons({
        autoInstall: true,
        scale: 1.2, // Scale of icons against 1em
        defaultStyle: '', // Style apply to icons
        defaultClass: '', // Class names apply to icons
        compiler: 'vue3',
        customCollections: {
          my: FileSystemIconLoader('src/assets/icons') //配置自定义集合的路径, 更详细的配置可参考插件仓库
        }
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
      target: 'es2015',
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
  let result = {}
  if (!isBuild) {
    // dev 独有配置
    result = {
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
    result = {
      ...commonConfig,
      base: './'
    }
  }
  return result
})
