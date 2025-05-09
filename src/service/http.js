import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

// axios.defaults.baseURL = 'http://chat2me.ubddns.org/api/v1';
const instance = axios.create({
  baseURL: 'http://chat2me.ubddns.org:3000/api/v1',
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore().logout()
    }
    return Promise.reject(error)
  },
)

export default instance
