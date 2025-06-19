import http from '@/service'

//首頁-熱門文章列表
export const apiPopularArticleList = (cursor, limit) => {
  return http.get('/article/popular', { params: { cursor, limit } })
}
//首頁-最新文章列表
export const apiLatestArticleList = (cursor, limit) => {
  return http.get('/article/latest', { params: { cursor, limit } })
}
//發表文章
export const apiAddArticle = (data) => http.post('/article', data)
//上傳文章圖片
export const apiUpload = (formData) => http.post('/article/upload', formData)
//單一文章
export const apiGetArticle = (id) => http.get(`/article/${id}`)
//修改文章
export const apiUpdateArticle = (id) => http.put(`/article/${id}`)
//刪除文章
export const apiDelArticle = (id) => http.delete(`/article/${id}`)
//按讚
export const apiAddLikeArticle = (data) => http.post('/article/like', data)
//取消讚
export const apiDelLikeArticle = (id) => http.delete(`/article/like/${id}`)
//收藏文章
export const apiAddFavorArticle = (data) => http.post('/article/like', data)
//取消收藏
export const apiDelFavorArticle = (id) => http.delete(`/article/like/${id}`)
//檢舉文章
export const apiReportArticle = (data) => http.post('/article/report', data)
//隱藏文章
export const apiHideArticle = (data) => http.post('/article/hide', data)
