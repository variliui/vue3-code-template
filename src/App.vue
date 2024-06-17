<template>
  <el-config-provider>
    <div class="main-container">
      <!-- <base-header class="header"></base-header> -->
      <div class="body">
        <base-side class="sidebar"></base-side>
        <base-main class="w-100%! h-100%!"></base-main>
      </div>
    </div>
  </el-config-provider>
  <!-- <base-footer></base-footer> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
import { toggleDark, isDark } from "@/composables";

const layoutStore = useLayoutStore();

const minWindowWidth = 1600;
// 确保解构确保后的state具有响应式，要使用storeToRefs方法
onMounted(() => {
  if(isDark.value) {
    toggleDark();
  }
  handleResize();
  addHotKeys();
  window.addEventListener('resize', handleResize);
});

const handleResize = () => {
  const isCollapse = document.body.clientWidth < minWindowWidth;
  layoutStore.changeCollapse(isCollapse);
};

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
/**
 * 添加快捷键
 * 使用方式说明：在keymap中添加对应快捷键的名称,在键盘事件中添加对应条件响应的事件
*/
const addHotKeys = () => {
  const keyMap = ['m', 'n', ' '];
  document.onkeydown = function (e) {
    /**
     * 按下会被快速响应多次，加上这个防止此情况
     */
    if (e.repeat) {
      return;
    }
    const key = e.key.toLowerCase();
  };

  document.onkeyup = function (e) {
    const key = e.key.toLowerCase();
    if (keyMap.indexOf(key) > -1) {
      switch (key) {
        case ' ':
          toggleDark();
          break;
      }
    }
  };
};
</script>

<style>
.main-container {
  max-width: 100vw !important;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 8rem;
}

.body {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.sidebar {
  min-width: 4rem;
  height: 100%;
}

</style>
