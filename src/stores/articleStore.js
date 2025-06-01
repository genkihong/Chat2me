import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { apiPopularArticleList, apiLatestArticleList } from '@/api/article'

export const useArticleStore = defineStore('article', () => {
  const articleList = reactive({
    popular: [],
    latest: [],
  })
  //熱門文章
  const getPopularArticleList = async (cursor = 1, limit = 20) => {
    try {
      const res = await apiPopularArticleList(cursor, limit)
      articleList.popular = res.data.data
    } catch (error) {}
  }
  //最新文章
  const getLatestArticleList = async (cursor = 1, limit = 20) => {
    try {
      const res = await apiLatestArticleList(cursor, limit)
      articleList.latest = res.data.data
    } catch (error) {}
  }
  return {
    articleList,
    getPopularArticleList,
    getLatestArticleList,
  }
})
