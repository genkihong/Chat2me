<script setup>
import { useArticleStore } from '@/stores/articleStore'
import { getIconUrl } from '@/utils'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleStore = useArticleStore()
const { article } = storeToRefs(articleStore)

const id = computed(() => route.params.id)
onMounted(() => {
  articleStore.getArticle(id.value)
})
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="d-flex align-items-center border-bottom border-1 pb-3 mb-4">
        <!-- 看板圖示 -->
        <div class="rounded-circle opacity-50 bg-dark icon-bg d-flex align-items-center me-3">
          <img :src="getIconUrl(article.icon)" class="mx-auto" alt="image" width="24" height="24" />
        </div>
        <div class="d-flex">
          <!-- 看板標題 -->
          <div class="me-3">
            <small class="text-secondary">{{ article.forumTitle }}</small>
          </div>
          <div>
            <small class="text-primary">{{ article.followed ? '已追蹤' : '追蹤' }}</small>
          </div>
        </div>
      </div>
      <!-- 文章標題 -->
      <h3 class="fw-bold text-light mb-3">{{ article.articleTitle }}</h3>
      <div class="d-flex align-items-center mb-3">
        <!-- 文章作者 -->
        <!-- <div class="fs-7 text-body-tertiary">文章作者</div> -->
        <!-- 發表日期 -->
        <small class="text-body-tertiary align-self-start">{{ article.postDate }}</small>
      </div>
      <!-- 文章內容 -->
      <div class="text-secondary mb-4" v-html="article.articleContent"></div>
      <div class="article-footer d-flex align-items-center text-secondary">
        <!-- 按讚數 -->
        <div class="d-flex align-items-center me-5" role="button">
          <img src="@/assets/images/heart-outline.png" class="me-1" alt="heart" width="20" />
          <span>{{ article.count.like }}</span>
        </div>
        <!-- 留言數 -->
        <div class="d-flex align-items-center me-5" role="button">
          <img src="@/assets/images/comment.png" class="me-1" alt="comment" width="20" />
          <span>{{ article.count.collect }}</span>
        </div>
        <!-- 收藏數 -->
        <div class="d-flex align-items-center" role="button">
          <img src="@/assets/images/bookmark-outline.png" class="me-1" alt="bookmark" width="20" />
          <span>{{ article.count.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
