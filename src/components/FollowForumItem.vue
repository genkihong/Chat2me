<script setup>
const props = defineProps({
  forumId: {
    type: Number,
    required: true,
  },
  forumTitle: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['deleteFollow'])

const deleteFollow = (id) => {
  emit('deleteFollow', id)
}
</script>

<template>
  <div class="d-flex align-items-center border-bottom border-2 pb-2 mb-3">
    <h6 class="text-light mb-0 me-auto">{{ forumId }}.{{ forumTitle }}</h6>
    <button class="btn btn-followed btn-sm" @click="deleteFollow(forumId)">已追蹤</button>
  </div>
</template>

<style lang="scss" scoped></style>
