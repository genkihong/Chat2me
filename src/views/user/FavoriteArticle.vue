<script setup>
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
      <div
        class="d-flex align-items-center border-bottom border-2 mb-3"
        v-for="item of user.articleList"
        :key="item.articleId"
      >
        <div class="me-auto">
          <h4 class="mb-2">
            <span class="badge text-bg-secondary">{{ item.forumTitle }}</span>
          </h4>
          <p class="mb-3" v-html="item.content"></p>
        </div>
        <button class="btn border-dark-active" @click="deleteFavor(item.articleId)">
          <img src="@/assets/images/bookmark.png" alt="bookmark" width="24" height="24" />
        </button>
      </div>

      <!-- <div class="d-flex align-items-center border-bottom border-2 mb-3">
        <div class="me-auto">
          <h4 class="mb-2">
            <span class="badge text-bg-secondary">YouTuber</span>
          </h4>
          <p class="mb-3">稅捐處「彭家軍」首謀抓到 作弊程式近九成獎他拿走</p>
        </div>
        <button class="btn border-dark-active">
          <img src="@/assets/images/bookmark.png" alt="bookmark" width="24" height="24" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
