import http from '@/service'

//首頁-所有看板分類(未登入)
export const apiForumList = () => http.get('/forum/classification')
//首頁-熱門即時看板(未登入)
export const apiPopular = () => http.get('/forum/popular')
//首頁-使用者最近造訪看版(已登入)
export const apiVisitedForumList = () => http.get(`/forum/visited/${userId}`)
//首頁-使用者追蹤的看版(已登入)
export const apiFollowedForumList = () => http.get(`/forum/followed/${userId}`)
//追蹤看板
export const apiFollow = (data) => http.post('/forum/follow', data)
//取消追蹤
export const apiDelFollow = (id) => http.delete(`/forum/follow/${id}`)
