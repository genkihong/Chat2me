<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticleStore } from '@/stores/articleStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const handleLike = async (id, toggleLike) => {
  if (toggleLike) {
    await articleStore.addLike(id)
  } else {
    await articleStore.deleteLike(id)
  }
}
const handleFavor = async (id, toggleFavor) => {
  if (toggleFavor) {
    await articleStore.addFavor(id)
  } else {
    await articleStore.deleteFavor(id)
  }
}
onMounted(async () => {
  await Promise.allSettled([
    articleStore.getPopularArticleList(),
    articleStore.getLatestArticleList(),
  ])
})
</script>

<template>
  <!-- 切換Tab -->
  <ul class="nav nav-underline position-sticky nav-tab bg-dark z-1">
    <li class="nav-item">
      <button type="button" class="nav-link active" data-bs-toggle="tab" data-bs-target="#hot">
        <div class="text-secondary">熱門</div>
      </button>
    </li>
    <li class="nav-item">
      <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#latest">
        <div class="text-secondary">最新</div>
      </button>
    </li>
  </ul>

  <div class="tab-content">
    <!-- 熱門 -->
    <div class="tab-pane active pt-3" id="hot" role="tabpanel" tabindex="0">
      <ArticleCard
        v-for="item of articleList.popular"
        :key="item.id"
        v-bind="item"
        :isLoggedIn="isLoggedIn"
        @handle-like="handleLike"
        @handle-favor="handleFavor"
      />
    </div>
    <!-- 最新 -->
    <div class="tab-pane pt-3" id="latest" role="tabpanel" tabindex="0">
      <ArticleCard
        v-for="item of articleList.latest"
        :key="item.id"
        v-bind="item"
        :isLoggedIn="isLoggedIn"
        @handle-like="handleLike"
        @handle-favor="handleFavor"
      />
    </div>
  </div>
</template>

<style scoped>
.nav-tab {
  top: 60px;
}
</style>
