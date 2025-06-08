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
