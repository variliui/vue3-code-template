<template>
    <div id="docx-demo" class="w-full h-full">
        <vue-office-pdf :src="src" @rendered="renderedHandler" @error="errorHandler" class="h-full" />
    </div>
</template>

<script setup lang="ts">
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf';
import { ref, onMounted, toRefs } from 'vue';

type TProps = {
    src: string | ArrayBuffer,
}

const props = defineProps<TProps>()
const { src } = toRefs(props);

const renderedHandler = () => {
    console.log("渲染完成");
};
const errorHandler = () => {
    console.log("渲染失败");
};
</script>