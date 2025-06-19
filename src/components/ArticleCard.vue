<script setup>
import { getIconUrl } from '@/utils'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  forumTitle: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleContent: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  count: {
    type: Object,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="card border-0 mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-4">
        <!-- 看板圖示 -->
        <div class="rounded-circle opacity-50 bg-dark forum-icon d-flex align-items-center me-3">
          <img :src="getIconUrl(icon)" class="mx-auto" alt="image" width="24" height="24" />
        </div>
        <div class="me-auto">
          <!-- 看板標題 -->
          <div class="mb-1">
            <small class="text-secondary">{{ forumTitle }}</small>
          </div>
          <!-- 文章作者 -->
          <div class="fs-7 text-body-tertiary">{{ name }}</div>
        </div>
        <!-- 發表日期 -->
        <small class="text-body-tertiary align-self-start">{{ postDate }}</small>
      </div>
      <router-link :to="`article/${id}`">
        <!-- 文章標題 -->
        <h5 class="fw-bold text-light">{{ articleTitle }}</h5>
        <!-- 文章內容 -->
        <div class="text-secondary mb-4" v-html="articleContent"></div>
        <div class="article-footer d-flex align-items-center text-secondary">
          <!-- 按讚數 -->
          <div class="d-flex align-items-center me-5" role="button">
            <img src="@/assets/images/heart-outline.png" class="me-1" alt="heart" width="20" />
            <span>{{ count.like }}</span>
          </div>
          <!-- 留言數 -->
          <div class="d-flex align-items-center me-5" role="button">
            <img src="@/assets/images/comment.png" class="me-1" alt="comment" width="20" />
            <span>{{ count.collect }}</span>
          </div>
          <!-- 收藏數 -->
          <div class="d-flex align-items-center" role="button">
            <img
              src="@/assets/images/bookmark-outline.png"
              class="me-1"
              alt="bookmark"
              width="20"
            />
            <span>{{ count.comment }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
.forum-icon {
  width: 50px;
  height: 50px;
}
.image_resized,
.image_resized > img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: left center;
}
</style>
