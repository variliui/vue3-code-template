import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore(
    'counter',
    () => {
        const isCollapse = ref<boolean>(false)
        const getCollapsed = computed(() => {
            return isCollapse.value
        })
        const changeCollapse = (collapsed: boolean) => {
            if (isCollapse.value !== collapsed) {
                isCollapse.value = collapsed
            }
        }
        return { isCollapse, getCollapsed, changeCollapse }
    },
    {
        persist: true
    }
)
