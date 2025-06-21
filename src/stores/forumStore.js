import { apiDelFollow, apiFollow, apiForumList, apiPopular } from '@/api/forum'
import { mapIcon } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'

export const useForumStore = defineStore('forum', () => {
  const forum = reactive({
    all: [],
    popular: [],
  })

  //所有看板
  const getForumList = async () => {
    try {
      const res = await apiForumList()
      forum.all = res.data.data.map((item) => {
        return {
          ...item,
          icon: mapIcon(item.forum_name),
        }
      })
    } catch (error) {}
  }
  //所有看板
  const getPopular = async () => {
    try {
      const res = await apiPopular()
      forum.popular = res.data.data.map((item) => {
        return {
          ...item,
          icon: mapIcon(item.forum_name),
        }
      })
    } catch (error) {}
  }
  //追蹤看板
  const addFollow = async ({ userId, forumId }) => {
    try {
      const res = await apiFollow({ userId, forumId })
      toast.success(res.data.message, {
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
      })
    }
  }
  //取消追蹤
  const deleteFollow = async (id) => {
    try {
      const res = await apiDelFollow(id)
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
    forum,
    getPopular,
    getForumList,
    addFollow,
    deleteFollow,
  }
})
