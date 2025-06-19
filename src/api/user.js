import http from '@/service'

//取得個人資料
export const apiGetUser = (id) => http.get(`/user/${id}`)
//修改個人資料
export const apiUpdateUser = (id, data) => http.put(`/user/${id}`, data)
//上傳個人圖片
export const apiUpload = (formData) => http.post('/user/upload', formData)
//我的個人牆
export const apiProfile = () => http.get('/user/profile')
//我的訊息
export const apiMessage = (id) => http.get(`/user/message/${id}`)
//我的追蹤
export const apiForum = () => http.get('/user/forum/')
//我的收藏
export const apiArticle = () => http.get(`/user/article`)
