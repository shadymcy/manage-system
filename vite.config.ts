import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// 解放双手，自动导入composition api 和 生成全局typescript说明
// 不用import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
    // 解决vue3下 script setup语法糖 下 ，手动设置组件name不方便的问题
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({ // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
			resolvers: [ElementPlusResolver({ importStyle: 'css', ssr: true })]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	}
});
