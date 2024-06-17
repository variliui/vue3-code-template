<template>
    自动生成VUE单文件模板
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const test = ref<string>('');

onMounted(() => {
    console.log(test.value);
});
</script>

<style scoped lang="scss">
</style>