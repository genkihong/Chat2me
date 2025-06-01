<script setup>
import { getImageUrl } from '@/util'

const sidebarItems = [
  {
    title: '工作板',
    path: '#',
    icon: 'job',
  },
  {
    title: '美食板',
    path: '#',
    icon: 'food',
  },
  {
    title: 'Youtube板',
    path: '#',
    icon: 'youtube',
  },
  {
    title: '交友板',
    path: '#',
    icon: 'friends',
  },
  {
    title: '女孩板',
    path: '#',
    icon: 'girl',
  },
  {
    title: '感情板',
    path: '#',
    icon: 'love',
  },
  {
    title: '遊戲板',
    path: '#',
    icon: 'game',
  },
  {
    title: '閒聊板',
    path: '#',
    icon: 'chat',
  },
  {
    title: '3C板',
    path: '#',
    icon: '3c',
  },
  {
    title: 'Apple板',
    path: '#',
    icon: 'apple',
  },
]
</script>

<template>
  <section class="bg-dark" style="min-height: 100vh">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-2">
          <div class="list-group rounded-0">
            <router-link to="forums" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/board.png"
                class="me-2"
                alt="board"
                width="20"
                height="20"
              />
              <span class="align-middle">所有看板</span>
            </router-link>
            <router-link to="popular" class="list-group-item list-group-item-action p-3">
              <img src="@/assets/images/hot.png" class="me-2" alt="hot" width="20" height="20" />
              <span class="align-middle">即時熱門看板</span>
            </router-link>
          </div>

          <div class="p-3">
            <small class="text-secondary">即時熱門看板</small>
          </div>
          <!-- 看板選單 -->
          <div class="list-group rounded-0">
            <a
              href="#"
              class="list-group-item list-group-item-action p-3"
              v-for="item in sidebarItems"
              :key="item.title"
            >
              <img :src="getImageUrl(item.icon)" class="me-3" alt="icon" width="20" height="20" />
              <span class="align-middle">{{ item.title }}</span>
            </a>
            <!-- <router-link
              to="#"
              class="list-group-item list-group-item-action p-3"
              v-for="item in sidebarItems"
              :key="item"
            >
              <img :src="item.icon" class="me-2" alt="" width="20" />
              <span class="align-middle">{{ item.title }}</span>
            </router-link> -->
          </div>
        </div>
        <div class="col-lg-10">
          <RouterView />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
