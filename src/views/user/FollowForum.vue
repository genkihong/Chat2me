<script setup>
import FollowForumItem from '@/components/FollowForumItem.vue'
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
      <FollowForumItem
        v-for="item of user.forumList"
        :key="item.forumId"
        v-bind="item"
        @delete-follow="deleteFollow"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
