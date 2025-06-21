<script setup>
import { useForumStore } from '@/stores/forumStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const forumStore = useForumStore()

const deleteFollow = async (id) => {
  await forumStore.deleteFollow(id)
  userStore.getForum()
}
onMounted(() => {
  userStore.getForum()
})
</script>

<template>
  <div class="card bg-dark">
    <div class="card-body">
      <h4 class="mb-5">我的追蹤</h4>
      <div
        class="d-flex align-items-center border-bottom border-2 pb-2 mb-3"
        v-for="item of user.forumList"
        :key="item.forumId"
      >
        <h6 class="text-light mb-0 me-auto">{{ item.forumId }}.{{ item.forumTitle }}</h6>
        <button class="btn btn-followed btn-sm" @click="deleteFollow(item.forumId)">已追蹤</button>
      </div>

      <!-- <div class="d-flex align-items-center border-bottom border-2 pb-2 mb-3">
        <h6 class="text-light mb-0 me-auto">2.工作</h6>
        <button class="btn btn-followed btn-sm">已追蹤</button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
