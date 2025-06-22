<script setup>
const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
  forumTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['deleteFavor'])

const deleteFavor = async (id) => {
  emit('deleteFavor', id)
}
</script>

<template>
  <div class="d-flex align-items-center border-bottom border-2 mb-3">
    <div class="me-auto">
      <h4 class="mb-2">
        <span class="badge text-bg-secondary">{{ forumTitle }}</span>
      </h4>
      <p class="mb-3" v-html="content"></p>
    </div>
    <button class="btn border-dark-active" @click="deleteFavor(articleId)">
      <img src="@/assets/images/bookmark.png" alt="bookmark" width="24" height="24" />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
