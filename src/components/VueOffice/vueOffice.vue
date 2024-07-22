<template>
    <ViewDocx class="h-full!" v-if="currentFileType === EFileType.DOCX" :src="fileSrc" />
    <ViewPdf class="h-full!" v-else-if="currentFileType === EFileType.PDF" :src="fileSrc" />
    <ViewXlsx class="h-full!" v-else-if="currentFileType === EFileType.XLSX" :src="fileSrc" />
</template>

<script setup lang="ts">
// TODO 入参为 objectId, fileName, 然后根据文件名判断类型，使用不同的组件展示。
import { ref, onMounted, toRefs, computed } from 'vue'
import ViewDocx from './docx/viewDocx.vue'
import ViewPdf from './pdf/viewPdf.vue'
import ViewXlsx from './xlsx/viewXlsx.vue'
import { EFileType, EPreviewType, IRawFile, ISaveFile } from '@/components/VueOffice/helper'
import { getFileFromServer } from '@/api/OfficeApi/officeApi'
import { ElMessage } from 'element-plus'
import { awaitToGo } from '@/utils/util'


type TProps = {
    fileType: EPreviewType
    fileObj: ISaveFile | IRawFile
}

const props = defineProps<TProps>()
const { fileType, fileObj } = toRefs(props)
const fileSrc = ref()

const currentFileType = computed(() => {
    return (fileObj.value as IRawFile).name.split('.').pop() as EFileType
})

const initFile = async () => {
    if (fileType.value === EPreviewType.RAW) {
        handleRawFile((fileObj.value as IRawFile).raw)
    } else {
        const [err, data] = await awaitToGo(getFileFromServer((fileObj.value as ISaveFile).id))
        if (err) {
            ElMessage.error(err)
            return
        }
        fileSrc.value = data
    }
}

const handleRawFile = (file: File) => {
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (loadEvent) => {
        if (loadEvent) {
            let arrayBuffer = loadEvent.target!.result
            fileSrc.value = arrayBuffer as ArrayBuffer
        }
    }
    reader.onerror = (error) => {
        ElMessage({ message: '文件读取出错:' + error, type: 'error' })
    }
    return false
}

onMounted(() => {
    initFile()
})
</script>

<style scoped lang="scss"></style>
