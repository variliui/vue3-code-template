import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore(
  'counter',
  () => {
    const isCollapse = ref(false)
    const getCollapsed = computed(() => {
      return isCollapse.value
    })
    function changeCollapse(collapsed: boolean) {
      if (isCollapse.value !== collapsed) {
        isCollapse.value = collapsed
      }
    }
    return { isCollapse, getCollapsed, changeCollapse }
  },
  {
    persist: {
      // storage: localStorage,//sessionStorage,
    }
  }
)
