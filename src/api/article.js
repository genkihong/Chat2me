import http from '@/service'

//首頁-熱門文章列表
export const apiPopularArticleList = (cursor, limit) => {
  return http.get('/article/popular', { params: { cursor, limit } })
}
//首頁-最新文章列表
export const apiLatestArticleList = (cursor, limit) => {
  return http.get('/article/latest', { params: { cursor, limit } })
}
