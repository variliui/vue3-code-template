<template>
  <div class="main-body">
    <router-view> </router-view>
  </div>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/stores/layoutStore';
import { storeToRefs } from 'pinia';
const store = useLayoutStore();
// 确保解构确保后的state具有响应式，要使用storeToRefs方法
const { getCollapsed } = storeToRefs(store);
</script>
<style lang="scss" scoped>
.main-body {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  background-color: #f1f3f6;
}
</style>
