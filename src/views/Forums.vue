<script setup>
import { onMounted } from 'vue'
import ForumBoard from '@/components/ForumBoard.vue'
import { useForumStore } from '@/stores/forumStore'
import { storeToRefs } from 'pinia'
import { getIconUrl } from '@/utils'

const forumStore = useForumStore()
const { forumList } = storeToRefs(forumStore)

onMounted(() => {
  forumStore.getForumList()
})
</script>

<template>
  <h4 class="fw-bold text-secondary mb-5">看板分類</h4>
  <div class="card bg-dark">
    <div class="card-body">
      <ForumBoard
        v-for="item of forumList"
        :key="item.forum_id"
        :title="item.forum_name"
        :icon="item.icon"
        :is-fllowed="false"
      />
    </div>
  </div>

  <!-- <div class="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#3c"
          aria-expanded="true"
          aria-controls="3c"
        >
          3C數位
        </button>
      </h2>
      <div id="3c" class="accordion-collapse collapse show">
        <div class="accordion-body">
          <ForumBoard title="3C產品" icon="3c" :is-fllowed="true" />
          <ForumBoard title="Apple" icon="apple" />
          <ForumBoard title="遊戲" icon="game" />
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped></style>
