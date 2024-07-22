<template>
    <div class="b-[solid] b-[1px] b-[#ccc] mt-10px">
        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            class="border-b-[1px] border-b-[solid] border-b-[#ccc]"
        />
        <Editor
            :defaultConfig="editorConfig"
            :mode="mode"
            v-model="richContent"
            class="h-25rem overflow-y-hidden"
            @onCreated="handleCreated"
            @onChange="handleChange"
            @onDestroyed="handleDestroyed"
            @onFocus="handleFocus"
            @onBlur="handleBlur"
            @customPaste="customPaste"
        />
    </div>
</template>

<script setup lang="ts">
import './WangEditor.scss'
// import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, toRefs } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolbarConfig, editorConfig } from './WangEditorHelper'

defineOptions({
    name: 'WangEditor'
})
type TEditor = InstanceType<typeof Editor>
type TProps = {
    row: any
    column: any
}

const props = defineProps<TProps>()
const { row, column } = toRefs(props)
const richContent = defineModel<string>('richContent')

const mode = 'default'
/**
 * 编辑器实例，必须用 shallowRef!
 */
const editorRef = shallowRef<TEditor>()

/**
 * 内容 HTML
 */
const valueHtml = ref<string>('')

// 编辑器回调函数
const handleCreated = (editor: TEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor: TEditor) => {}

const handleDestroyed = (editor: TEditor) => {}

const handleFocus = (editor: TEditor) => {}

const handleBlur = (editor: TEditor) => {
    emits('blurInput', row.value, column.value)
}

const customPaste = (editor: TEditor, event: Event, callback: Function) => {
    // 自定义插入内容
    editor.insertText()
    // 返回值（注意，vue 事件的返回值，不能用 return）
    //callback(false); // 返回 false ，阻止默认粘贴行为
    callback(true) // 返回 true ，继续默认的粘贴行为
}

const insertText = () => {
    // const editor = editorRef.value;
    // if (editor == null) return;
    // editorRef.value.insertText('hello world');
}
const printHtml = () => {
    // const editor = editorRef.value;
    // if (editor == null) return;
}

const disable = () => {
    // const editor = editorRef.value;
    // if (editor == null) return;
    editorRef.value.disable()
}

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    editorRef.value?.destroy()
})

// 模拟 ajax 异步获取内容
onMounted(() => {})

const emits = defineEmits(['blurInput'])

defineExpose({
    valueHtml
})
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
