<script setup>
import { getIconUrl } from '@/utils'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
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
const emit = defineEmits(['addFollow'])
const addFollow = (id) => {
  emit('addFollow', id)
}
const btnText = computed(() => {
  return props.isFllowed ? '已追蹤' : '追蹤'
})
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div class="rounded-circle bg-dark-subtle icon-bg d-flex align-items-center me-3">
      <img :src="getIconUrl(icon)" class="mx-auto" alt="image" width="24" height="24" />
    </div>
    <h6 class="text-secondary mb-0 me-auto">{{ title }}</h6>
    <button
      class="btn btn-sm"
      :class="[isFllowed ? 'btn-followed' : 'btn-custom']"
      @click="addFollow(id)"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.icon-bg {
  width: 32px;
  height: 32px;
}
</style>
