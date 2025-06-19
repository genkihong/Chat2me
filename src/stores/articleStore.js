import {
  apiAddArticle,
  apiGetArticle,
  apiLatestArticleList,
  apiPopularArticleList,
  apiUpload,
} from '@/api/article'
import { mapIcon } from '@/utils'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useArticleStore = defineStore('article', () => {
  const router = useRouter()
  const imageUrl = ref('')
  const article = reactive({
    forumTitle: '看板標題',
    followed: false,
    articleTitle: '文章標題',
    articleContent: [],
    tag: [],
    postDate: '',
    count: {
      like: 0,
      collect: 0,
      comment: 0,
    },
    comments: [],
  })
  const newArticle = reactive({
    forum_id: 1,
    title: '測試文章標題',
    content: '測試文章內容',
    image_url: [],
    tag: [],
  })
  const articleList = reactive({
    popular: [],
    latest: [],
  })
  const title = ['youtube', 'netflix', 'apple']

  //清除資料
  const resetData = () => {
    newArticle.forum_id = 1
    newArticle.title = null
    newArticle.content = null
    newArticle.image_url.length = 0
    newArticle.tag.length = 0
  }
  //熱門文章
  const getPopularArticleList = async (cursor = 1, limit = 20) => {
    try {
      const res = await apiPopularArticleList(cursor, limit)
      articleList.popular = res.data.data.map((item) => {
        if (!title.includes(item.forumTitle)) {
          item.icon = mapIcon(item.forumTitle)
        }
        return item
      })
    } catch (error) {}
  }
  //最新文章
  const getLatestArticleList = async (cursor = 1, limit = 20) => {
    try {
      const res = await apiLatestArticleList(cursor, limit)
      articleList.latest = res.data.data.map((item) => {
        if (!title.includes(item.forumTitle)) {
          item.icon = mapIcon(item.forumTitle)
        }
        return item
      })
    } catch (error) {}
  }
  //發表文章
  const postNewArticle = async (data) => {
    try {
      const res = await apiAddArticle(data)
      if (res.data.status) {
        toast.success(res.data.message, {
          theme: 'colored',
        })
        resetData()
        router.push('/')
      }
    } catch (error) {}
  }
  //單一文章
  const getArticle = async (id) => {
    try {
      const res = await apiGetArticle(id)
      Object.assign(article, res.data.data)
      article.icon = mapIcon(article.forumTitle)
    } catch (error) {}
  }
  //上傳圖片
  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    try {
      // console.log(formData.get('image'))
      const res = await apiUpload(formData)
      if (res.data.status) {
        article.image_url.push(res.data.data.imageUrl[0])
      }
      imageUrl.value = import.meta.env.VITE_API_URL.concat(`/${res.data.data.imageUrl[0]}`)
      return imageUrl.value
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  return {
    imageUrl,
    article,
    newArticle,
    articleList,
    getArticle,
    uploadImage,
    getPopularArticleList,
    getLatestArticleList,
    postNewArticle,
  }
})
