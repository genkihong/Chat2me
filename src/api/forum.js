import http from '@/service'

//取得所有看板
export const apiForumList = () => http.get('/forum/classification')
