<template>
    <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
    />
</template>

<script setup lang="ts">
import './WangEditor.scss'
import { shallowRef } from 'vue'
import { toolbarConfig } from './WangEditorHelper'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
type TEditor = InstanceType<typeof Editor>
/**
 * 编辑器实例，必须用 shallowRef!
 */
const editorRef = shallowRef<TEditor>()
const initEditRef = (editor: TEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
defineExpose({
    initEditRef
})
</script>

<style scoped lang="scss">
:deep(.w-e-drop-panel) {
    z-index: 9999;
}

:deep(.w-e-bar-item-menus-container) {
    z-index: 9999;
}

:deep(.w-e-menu-tooltip-v5:before) {
    z-index: 9999;
}

:deep(.w-e-select-list) {
    z-index: 9999;
}
</style>
