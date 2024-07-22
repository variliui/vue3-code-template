import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ISearchMenuAccess } from '@/views/HeaderMenu/HeaderMenuHelper'

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref<ISearchMenuAccess>()
        const userInfoLoading = ref<boolean>(true)
        const getUserInfo = computed(() => {
            return userInfo.value
        })
        const getUserInfoLoading = computed(() => {
            return userInfoLoading.value
        })
        const changeUser = (newInfo: ISearchMenuAccess) => {
            if (newInfo) {
                userInfoLoading.value = false
                userInfo.value = newInfo
            } else {
                userInfoLoading.value = true
            }
        }
        return { userInfo, getUserInfo, getUserInfoLoading, changeUser }
    },
    {
        persist: true
    }
)
