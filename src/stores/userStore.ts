import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com'
    })
    const getUser = computed(() => {
      return user.value
    })

    function changeUser(userName: string, userAge: number, userEmail: string) {
      user.value.name = userName
      user.value.age = userAge
      user.value.email = userEmail
    }
    return { user, getUser, changeUser }
  },
  {
    persist: [
      {
        paths: ['user'],
        storage: localStorage
      }
    ]
  }
)
