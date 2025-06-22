<script setup>
import FavoriteArticleItem from '@/components/FavoriteArticleItem.vue'
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const articleStore = useArticleStore()

const deleteFavor = async (id) => {
  await articleStore.deleteFavor(id)
  userStore.getArticle()
}
onMounted(() => {
  userStore.getArticle()
})
</script>

<template>
  <div class="card bg-dark">
    <div class="card-body">
      <h4 class="mb-5">我的收藏</h4>
      <FavoriteArticleItem
        v-for="item of user.articleList"
        :key="item.articleId"
        v-bind="item"
        @delete-favor="deleteFavor"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
