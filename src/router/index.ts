import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/MyWorkSpace',
		},
		{
			path: '/MyWorkSpace',
			name: 'MyWorkSpace',
			component: () => import('@/views/MyWorkSpace/MyWorkSpace.vue'),
			meta: {
				keepAlive: true, // 需要被keep-alive
			},
		},
	],
});

export default router
