import { apiForumList } from '@/api/forum'
import { mapIcon } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useForumStore = defineStore('forum', () => {
  const forumList = ref([])

  //所有看板
  const getForumList = async () => {
    try {
      const res = await apiForumList()
      forumList.value = res.data.data.map((item) => {
        return {
          ...item,
          icon: mapIcon(item.forum_name),
        }
      })
    } catch (error) {}
  }
  return {
    forumList,
    getForumList,
  }
})
