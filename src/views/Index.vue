<script setup>
import { useForumStore } from '@/stores/forumStore'
import { getIconUrl } from '@/utils'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const forumStore = useForumStore()
const { forum } = storeToRefs(forumStore)

const sidebarList = [
  {
    forum_name: '工作板',
    path: '#',
    forum_icon: 'job',
  },
  {
    forum_name: '美食板',
    path: '#',
    forum_icon: 'food',
  },
  {
    forum_name: 'Youtube板',
    path: '#',
    forum_icon: 'youtube',
  },
  {
    forum_name: '交友板',
    path: '#',
    forum_icon: 'friends',
  },
  {
    forum_name: '女孩板',
    path: '#',
    forum_icon: 'girl',
  },
  {
    forum_name: '感情板',
    path: '#',
    forum_icon: 'love',
  },
  {
    forum_name: '遊戲板',
    path: '#',
    forum_icon: 'game',
  },
  {
    forum_name: '閒聊板',
    path: '#',
    forum_icon: 'chat',
  },
  {
    forum_name: '3C板',
    path: '#',
    forum_icon: '3C',
  },
  {
    forum_name: 'Apple板',
    path: '#',
    forum_icon: 'apple',
  },
]
onMounted(() => {
  forumStore.getForumList()
})
</script>

<template>
  <section class="bg-dark" style="min-height: 100vh">
    <div class="container">
      <div class="row">
        <!-- Sidemenu -->
        <div class="col-lg-2 d-none d-lg-block">
          <div class="sidemenu position-sticky">
            <div class="list-group rounded-0">
              <RouterLink to="/forum/all" class="list-group-item list-group-item-action p-3">
                <img
                  src="@/assets/images/board.png"
                  class="me-2"
                  alt="board"
                  width="20"
                  height="20"
                />
                <span class="align-middle">所有看板</span>
              </RouterLink>
              <RouterLink to="/forum/popular" class="list-group-item list-group-item-action p-3">
                <img src="@/assets/images/hot.png" class="me-2" alt="hot" width="20" height="20" />
                <span class="align-middle">即時熱門看板</span>
              </RouterLink>
            </div>
            <div class="p-3">
              <small class="text-secondary">即時熱門看板</small>
            </div>
            <!-- 看板選單 -->
            <div class="list-group rounded-0">
              <a
                href="#"
                class="list-group-item list-group-item-action p-3"
                v-for="item in forum.all"
                :key="item.forum_id"
              >
                <img :src="getIconUrl(item.icon)" class="me-3" alt="icon" width="20" height="20" />
                <span class="align-middle">{{ item.forum_name }}</span>
              </a>
              <!-- <RouterLink
                to="#"
                class="list-group-item list-group-item-action p-3"
                v-for="item in sidebarItems"
                :key="item"
              >
                <img :src="item.icon" class="me-2" alt="" width="20" />
                <span class="align-middle">{{ item.title }}</span>
              </RouterLink> -->
            </div>
          </div>
        </div>
        <div class="col-lg-10">
          <RouterView />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sidemenu {
  top: 60px;
}
</style>
