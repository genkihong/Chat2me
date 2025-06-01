<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/util'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isFllowed: {
    type: Boolean,
    default: false,
    required: false,
  },
})
const btnText = computed(() => {
  return props.isFllowed ? '已追蹤' : '追蹤'
})
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div class="rounded-circle bg-dark-subtle forum-icon d-flex align-items-center me-3">
      <img :src="getImageUrl(icon)" class="mx-auto" alt="image" width="24" height="24" />
    </div>
    <h6 class="text-secondary mb-0 me-auto">{{ title }}</h6>
    <button class="btn btn-sm" :class="[isFllowed ? 'btn-followed' : 'btn-custom']">
      {{ btnText }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.forum-icon {
  width: 32px;
  height: 32px;
}
</style>
