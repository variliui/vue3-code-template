<template>
    <DragLayout :minSideWidth="minSideWidth" v-model:currentSideWidth="currentSideWidth" :maxSideWidth="maxSideWidth">
        <template #side>
            <div>{{ '拖拽框侧边内容' }}</div>
        </template>
        <template #main>
            <div class="bg-white w-full h-full">{{ '拖拽框主体内容' }}</div>
        </template>
    </DragLayout>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import DragLayout from '@/components/DragLayout/DragLayout.vue';

/**
 * 侧边栏宽度小于180时菜单变成收缩状态
 */
const isCollapsed = computed(() => {
    return currentSideWidth.value < 180;
});

/**
 * 侧边栏宽度
 */
const currentSideWidth = ref<number>(180);
/**
 * 侧边栏最小宽度
 */
const minSideWidth = ref<number>(60);
/**
 * 侧边栏最大宽度
 */
const maxSideWidth = ref<number>(300);
onMounted(() => {
});

</script>

<style scoped lang="scss">
.el-menu {
    border-right: 0px;
}
</style>
