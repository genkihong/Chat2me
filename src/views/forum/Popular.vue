<script setup>
import ForumBoard from '@/components/ForumBoard.vue'
import { useAuthStore } from '@/stores/authStore'
import { useForumStore } from '@/stores/forumStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const forumStore = useForumStore()
const { forum } = storeToRefs(forumStore)

const addFollow = async (forumId) => {
  await forumStore.addFollow({ userId: userInfo.value.id, forumId })
  forumStore.getForumList()
}
onMounted(() => {
  forumStore.getPopular()
})
</script>

<template>
  <h4 class="fw-bold text-secondary mb-5">即時熱門看板</h4>
  <div class="card bg-dark">
    <div class="card-body">
      <ForumBoard
        v-for="item of forum.popular"
        :key="item.forum_id"
        :title="item.forum_name"
        :icon="item.icon"
        :is-fllowed="false"
        :id="item.forum_id"
        @add-follow="addFollow"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
