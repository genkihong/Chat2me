<script setup>
import ForumBoard from '@/components/ForumBoard.vue'
</script>

<template>
  <h4 class="fw-bold text-secondary mb-5">看板分類</h4>
  <div class="accordion">
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
  </div>
</template>

<style lang="scss" scoped></style>
