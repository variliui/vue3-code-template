<template>
    <Editor
        :defaultConfig="editorConfig"
        mode="default"
        v-model="richContent"
        class="h-25rem"
        @onCreated="handleCreated"
        @onBlur="handleBlur"
        @customPaste="customPaste"
    />
</template>

<script setup lang="ts">
import './WangEditor.scss'
import { onBeforeUnmount, shallowRef, toRefs } from 'vue'
import { editorConfig } from './WangEditorHelper'
import { Editor } from '@wangeditor/editor-for-vue'
type TEditor = InstanceType<typeof Editor>
const richContent = defineModel<string>('richContent')
type TProps = {
    row: any
    column: any
}
const props = defineProps<TProps>()
const { row, column } = toRefs(props)
/**
 * 编辑器实例，必须用 shallowRef!
 */
const editorRef = shallowRef<TEditor>()
// 编辑器回调函数
const handleCreated = (editor: TEditor) => {
    emits('createEditor', editor)
    console.log(editor.getAllMenuKeys())
    editorRef.value = editor // 记录 editor 实例，重要！
}

const handleBlur = () => {
    emits('blurInput', row.value, column.value)
}

const customPaste = (editor: TEditor, event: Event, callback: Function) => {
    // 自定义插入内容
    editor.insertText()
    // 返回值（注意，vue 事件的返回值，不能用 return）
    //callback(false); // 返回 false ，阻止默认粘贴行为
    callback(true) // 返回 true ，继续默认的粘贴行为
}
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    editorRef.value?.destroy()
})
const emits = defineEmits(['createEditor', 'blurInput'])
</script>

<style scoped lang="scss">
#editor—wrapper {
    border: 1px solid #ccc;
    z-index: 100;
}

#toolbar-container {
    border-bottom: 1px solid #ccc;
}

#editor-container {
    height: 100px;
}
</style>
