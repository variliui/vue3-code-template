<template>
    <!-- 使用 Element UI 的配置提供者组件 -->
    <el-config-provider>
        <!-- 主容器 -->
        <div class="main-container">
            <div class="header">
                <!-- 头部组件 -->
                <base-header></base-header>
            </div>

            <!-- 主体部分 -->
            <div class="body" v-if="userStore.getUserInfoLoading">
                <!-- 侧边栏组件，目前被注释掉 -->
                <!-- <base-side class="sidebar"></base-side> -->
                <!-- 主要内容组件 -->
                <base-main></base-main>
            </div>
        </div>
        <!-- 底部组件，目前被注释掉 -->
        <!-- <base-footer></base-footer> -->
    </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore'
import { toggleDark, isDark } from '@/composables'
import BaseHeader from '@/layout/BaseHeader/index.vue'
import BaseSide from '@/layout/BaseSide/index.vue'
import BaseMain from '@/layout/BaseMain/index.vue'
import BaseFooter from '@/layout/BaseFooter/index.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia';

const userStore = storeToRefs(useUserStore())
/**
 * 初始化 layoutStore
 */
const layoutStore = useLayoutStore()
/**
 * 定义最小窗口宽度和热键映射
 */
const minWindowWidth = 1600
/**
 * 定义热键映射
 */
const keyMap = new Set(['m', 'n', ' '])

/**
 * 在组件挂载时初始化主题、窗口大小调整和热键
 */
onMounted(() => {
    initTheme()
    initResize()
    initHotKeys()
})

/**
 * 初始化主题的函数
 */
const initTheme = () => {
    if (isDark.value) {
        toggleDark()
    }
}

/**
 * 初始化窗口大小调整的函数
 */
const initResize = () => {
    handleResize()
    window.addEventListener('resize', handleResize)
}

/**
 * 处理窗口大小调整的函数
 */
const handleResize = () => {
    const isCollapse = window.innerWidth < minWindowWidth
    layoutStore.changeCollapse(isCollapse)
}

/**
 * 处理按键按下的函数
 */
const handleKeyDown = (e) => {
    if (e.repeat) {
        return
    }
    const key = e.key.toLowerCase()
}

/**
 * 处理按键抬起的函数
 */
const handleKeyUp = (e) => {
    const key = e.key.toLowerCase()
    if (keyMap.has(key)) {
        switch (key) {
            case ' ':
                // toggleDark()
                break
        }
    }
}

/**
 * 初始化热键的函数
 */
const initHotKeys = () => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
}

/**
 * 在组件卸载时移除事件监听
 */
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('keyup', handleKeyUp)
})
</script>

<style>
/* 主容器样式 */
.main-container {
    /* max-width: 100vw !important; */
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

/* 头部样式 */
.header {
    width: 100%;
    height: 4rem;
}

/* 主体部分样式 */
.body {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

/* 侧边栏样式 */
/* .sidebar { */
    /* min-width: 4rem; */
    /* height: 100%; */
/* } */
</style>
