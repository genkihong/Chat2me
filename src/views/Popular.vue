<script setup>
import ForumBoard from '@/components/ForumBoard.vue'
</script>

<template>
  <h4 class="fw-bold text-secondary mb-5">即時熱門看板</h4>
  <div class="card bg-dark">
    <div class="card-body">
      <ForumBoard title="閒聊" icon="chat" :is-fllowed="true" />
      <ForumBoard title="Apple" icon="apple" />
      <ForumBoard title="遊戲" icon="game" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
