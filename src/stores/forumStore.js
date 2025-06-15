import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiForumList } from '@/api/forum'
import { mapIcon } from '@/utils'

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
