import http from '@/service'

//註冊
export const apiSignup = (data) => http.post('/auth/signup', data)
//登入
export const apiLogin = (data) => http.post('/auth/login', data)
//忘記密碼
export const apiForgetPassword = (data) => http.post('/auth/forget-password', data)
//重設密碼
export const apiResetPassword = (data) => http.post('/auth/reset-password', data)
