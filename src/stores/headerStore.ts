import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHeaderStore = defineStore(
    'header',
    () => {
        const defaultSelectId = ref<string>('')
        const getSelectId = computed(() => {
            return defaultSelectId.value
        })
        const changeSelectId = (selectId: string) => {
            defaultSelectId.value = selectId
        }
        return { defaultSelectId, getSelectId, changeSelectId }
    },
    { persist: true }
)
