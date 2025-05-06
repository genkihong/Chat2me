import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { apiSignup, apiLogin, apiForgetPassword, apiResetPassword } from '@/api/auth'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref(localStorage.getItem('token') || '')
  const name = ref(localStorage.getItem('name') || '')

  //註冊
  const signup = async (user) => {
    try {
      const res = await apiSignup(user)
      if (res.status) {
        router.push('/login')
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message, {
          theme: 'colored',
        })
      } else if (error.response.status === 409) {
        toast.error(error.response.data.message, {
          theme: 'colored',
        })
      }
    }
  }
  //登入
  const login = async (user) => {
    try {
      const res = await apiLogin(user)
      token.value = res.data.token
      name.value = res.data.user.name

      //寫入 localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('name', name.value)

      router.push('/')
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //登出
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
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
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
  }
})
