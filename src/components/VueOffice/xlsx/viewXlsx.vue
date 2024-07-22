<template>
    <div id="docx-demo" class="w-full h-full! xlsx">
        <vue-office-excel :src="src" class="h-full!"/>
    </div>
</template>

<script setup lang="ts">
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
import { ElMessage } from 'element-plus';
import { ref, onMounted, toRefs } from 'vue';

type TProps = {
    src: string | ArrayBuffer,
}

const props = defineProps<TProps>()
const { src } = toRefs(props);
</script>

<style lang="scss" scoped>
.xlsx {
    :deep(.x-spreadsheet-overlayer ) {
        height: 100% !important;
    }
    :deep(.x-spreadsheet-sheet) {
        height: 100% !important;
    }
}
</style>