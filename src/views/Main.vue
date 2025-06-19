<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticleStore } from '@/stores/articleStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

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
      <ArticleCard v-for="article of articleList.popular" :key="article.id" v-bind="article" />
    </div>
    <!-- 最新 -->
    <div class="tab-pane pt-3" id="latest" role="tabpanel" tabindex="0">
      <ArticleCard v-for="article of articleList.latest" :key="article.id" v-bind="article" />
    </div>
  </div>
</template>

<style scoped>
.nav-tab {
  top: 60px;
}
</style>
