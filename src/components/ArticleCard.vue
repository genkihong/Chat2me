<script setup>
import { getIconUrl } from '@/utils'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'

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
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['handleLike', 'handleFavor'])

const toggleLike = ref(false)
const toggleFavor = ref(false)

const like = computed(() => {
  return toggleLike.value ? getIconUrl('heart') : getIconUrl('heart-outline')
})
const bookmark = computed(() => {
  return toggleFavor.value ? getIconUrl('bookmark') : getIconUrl('bookmark-outline')
})
const handleLike = (id) => {
  if (!props.isLoggedIn) {
    toast.info('請先登入', {
      theme: 'colored',
    })
    return
  }
  toggleLike.value = !toggleLike.value
  emit('handleLike', id, toggleLike.value)
}
const handleFavor = (id) => {
  if (!props.isLoggedIn) {
    toast.info('請先登入', {
      theme: 'colored',
    })
    return
  }
  toggleFavor.value = !toggleFavor.value
  emit('handleFavor', id, toggleFavor.value)
}
</script>

<template>
  <div class="card border-0 mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-4">
        <!-- 看板圖示 -->
        <div class="rounded-circle opacity-50 bg-dark icon-bg d-flex align-items-center me-3">
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
      <RouterLink :to="`article/${id}`" class="text-decoration-none">
        <!-- 文章標題 -->
        <h5 class="fw-bold text-light">{{ articleTitle }}</h5>
        <!-- 文章內容 -->
        <div class="text-secondary mb-4" v-html="articleContent"></div>
      </RouterLink>
      <div class="article-footer d-flex align-items-center text-secondary">
        <!-- 按讚數 -->
        <div class="d-flex align-items-center me-5" role="button" @click="handleLike(id)">
          <img :src="like" class="me-1" alt="heart" width="20" />
          <span>{{ count.like }}</span>
        </div>
        <!-- 留言數 -->
        <div class="d-flex align-items-center me-5" role="button">
          <img src="@/assets/images/comment.png" class="me-1" alt="comment" width="20" />
          <span>{{ count.collect }}</span>
        </div>
        <!-- 收藏數 -->
        <div class="d-flex align-items-center" role="button" @click="handleFavor(id)">
          <img :src="bookmark" class="me-1" alt="bookmark" width="20" />
          <span>{{ count.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
