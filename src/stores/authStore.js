import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { apiSignup, apiLogin, apiForgetPassword, apiResetPassword } from '@/api/auth'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref(localStorage.getItem('token') ?? null)
  const user = reactive({
    id: JSON.parse(localStorage.getItem('user'))?.id || null,
    name: JSON.parse(localStorage.getItem('user'))?.name || null,
    // email: JSON.parse(localStorage.getItem('user'))?.email || null,
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
      }, 1500)
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
      //取得使用者資訊
      const payload = JSON.parse(window.atob(token.value.split('.')[1]))

      user.id = payload.id
      user.name = payload.name
      // user.email = payload.email

      //寫入 localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user))

      toast.success(res.data.message, {
        theme: 'colored',
      })

      setTimeout(() => {
        router.push('/')
      }, 1000)
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //登出
  const logout = () => {
    token.value = null
    user.id = null
    user.name = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
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
    user,
    token,
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
  }
})
