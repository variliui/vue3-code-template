<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu router :default-active="router.currentRoute.value.path" :collapse="getCollapsed" @open="handleOpen" @close="handleClose"
      :class="getCollapsed ? '' : `w-13rem!`">
      <el-menu-item v-for="(route) in routes" v-show="route.meta.isShow" :key="route.name"
        :index="route.path">
        <Icon class="mr-1rem min-w-1.5rem min-h-1.5rem" :icon="(route.meta.icon as string)" />
        <template #title> {{ sliceName(route.meta.title as string).displayName }}</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores/layoutStore';
import { storeToRefs } from 'pinia';
import { sliceName } from '@/utils/util';
import { Icon } from '@iconify/vue';
import { mainBodyWidth } from '@/components/PublicHelper';

const router = useRouter();
const routes = router.getRoutes();
const store = useLayoutStore();
// 确保解构确保后的state具有响应式，要使用storeToRefs方法
const { getCollapsed } = storeToRefs(store);

const handleOpen = (key: string, keyPath: string[]) => {

};
const handleClose = (key: string, keyPath: string[]) => {

};
</script>

<style scoped>
.scrollbar-wrapper {
  height: 100%;
}
</style>
