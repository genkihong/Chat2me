import {
  apiGetArticle,
  apiGetForum,
  apiGetProfile,
  apiGetUser,
  apiUpdateUser,
  apiUpload,
} from '@/api/user'
import { getImageUrl } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: null,
    name: null,
    email: null,
    imageUrl: null,
    description: null,
    forumList: [
      {
        forumId: 1,
        forumTitle: '',
      },
    ],
    articleList: [
      {
        articleId: 1,
        forumTitle: '',
        content: '',
      },
    ],
  })
  const profile = reactive({
    id: 1,
    articleCount: 0,
    articleList: [
      {
        forumTitle: '',
        articleTitle: '',
        articleContent: '',
        count: {
          collect: 0,
          comment: 0,
          like: 0,
        },
        forumTitle: '',
        icon: '',
        name: '',
        postDate: '',
      },
    ],
    followedCount: 0,
    imageUrl: '',
    name: '',
  })

  //個人牆
  const getProfile = async () => {
    const title = ['youtube', 'netflix', 'apple']
    try {
      const res = await apiGetProfile()
      Object.assign(profile, res.data.data.user)
      profile.imageUrl = getImageUrl(res.data.data.user.imageUrl)
      // profile.articleList = profile.articleList.map((item) => {
      //   if (!title.includes(item.forumTitle)) {
      //     item.icon = mapIcon(item.forumTitle)
      //   }
      //   return item
      // })
    } catch (error) {}
  }
  //我的追蹤
  const getForum = async () => {
    try {
      const res = await apiGetForum()
      user.forumList = res.data.data.forumList
    } catch (error) {}
  }
  //我的收藏
  const getArticle = async () => {
    try {
      const res = await apiGetArticle()
      user.articleList = res.data.data.articleList
    } catch (error) {}
  }
  //個人設定
  const getUser = async (id) => {
    try {
      const res = await apiGetUser(id)
      Object.assign(user, res.data.data)
      user.imageUrl = getImageUrl(res.data.data.imageUrl)
    } catch (error) {
      console.log(error)
    }
  }
  //更新資料
  const updateUser = async ({ id, name, description }) => {
    try {
      const res = await apiUpdateUser(id, { name, description })
      toast.success(res.data.message, {
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //上傳圖片
  const uploadImage = async (formData) => {
    try {
      // console.log(formData.get('image'))
      const res = await apiUpload(formData)
      toast.success(res.data.message, {
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  return {
    profile,
    user,
    getProfile,
    getForum,
    getArticle,
    getUser,
    updateUser,
    uploadImage,
  }
})
