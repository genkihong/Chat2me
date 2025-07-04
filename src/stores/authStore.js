import { apiForgetPassword, apiLogin, apiResetPassword, apiSignup } from '@/api/auth'
import { useUserStore } from '@/stores/userStore'
import { jwtDecode } from 'jwt-decode'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const route = useRoute()
  const router = useRouter()
  const token = ref(localStorage.getItem('token') ?? null)
  const userInfo = reactive({
    id: JSON.parse(localStorage.getItem('userInfo'))?.id || null,
    name: JSON.parse(localStorage.getItem('userInfo'))?.name || null,
    imageUrl: JSON.parse(localStorage.getItem('userInfo'))?.imageUrl || null,
  })

  const isLoggedIn = computed(() => {
    return !!token.value
  })
  //註冊
  const signup = async (data) => {
    try {
      const res = await apiSignup(data)
      toast.success(res.data.message, {
        theme: 'colored',
      })
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //登入
  const login = async (data) => {
    try {
      const res = await apiLogin(data)
      token.value = res.data.data.token
      //寫入 localStorage
      localStorage.setItem('token', token.value)
      //取得使用者資訊
      const payload = jwtDecode(token.value)
      // const payload = JSON.parse(window.atob(token.value.split('.')[1]))
      userInfo.id = payload.id
      userInfo.name = payload.name
      await userStore.getUser(userInfo.id)
      userInfo.imageUrl = user.value.imageUrl

      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      toast.success(res.data.message, {
        theme: 'colored',
      })
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          theme: 'colored',
        })
      } else {
        console.log(error)
      }
    }
  }
  //登出
  const logout = () => {
    token.value = null
    userInfo.id = null
    userInfo.name = null
    userInfo.imageUrl = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/')
  }
  //忘記密碼
  const forgetPassword = async (email) => {
    try {
      const res = await apiForgetPassword(email)
      console.log(res)
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //重設密碼
  const resetPassword = async (data) => {
    try {
      const res = await apiResetPassword(data)
      console.log(res)
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  return {
    userInfo,
    token,
    isLoggedIn,
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
  }
})
