import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetUser,
  apiProfile,
  apiArticle,
  apiForum,
  apiMessage,
  apiUpdateUser,
  apiUpload,
} from '@/api/user'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: null,
    name: null,
    email: null,
    imageUrl: null,
    description: null,
  })
  //取得資料
  const getUser = async (id) => {
    try {
      const res = await apiGetUser(id)
      Object.assign(user, res.data.data)
      user.imageUrl = res.data.data.imageUrl.includes('uploads')
        ? import.meta.env.VITE_API_URL.concat(`/${res.data.data.imageUrl}`)
        : `https://placehold.co/150x150/png`
    } catch (error) {
      console.log(error)
    }
  }
  //更新資料
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
  //上傳圖片
  const uploadImage = async (formData) => {
    try {
      console.log(formData.get('image'))
      const res = await apiUpload(formData)
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  return { user, getUser, updateUser, uploadImage }
})
