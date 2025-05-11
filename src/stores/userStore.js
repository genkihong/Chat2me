import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { apiUser, apiProfile, apiArticle, apiForum, apiMessage, apiUpdateUser } from '@/api/user'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: null,
    name: null,
    email: null,
    imageUrl: null,
    description: null,
  })

  const getUser = async (id) => {
    try {
      const res = await apiUser(id)
      Object.assign(user, res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const updateUser = async ({ id, name, description }) => {
    try {
      const res = await apiUpdateUser(id, { name, description })
      toast.success(res.data.message, {
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  return { user, getUser, updateUser }
})
