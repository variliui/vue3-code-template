<template>
    <div id="docx-demo" class="w-full h-full">
        <vue-office-docx :src="src" class="w-full h-full!" />
    </div>
</template>

<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css';
import { ref, onMounted, toRefs, watch } from 'vue';

type TProps = {
    src: string | ArrayBuffer,
}

const props = defineProps<TProps>()
const { src } = toRefs(props);

watch(src, (newVal) => {
    console.log(newVal)
})
</script>