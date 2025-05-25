<template>
  <div class="col-lg-9">
    <h3 class="mb-5">我的收藏</h3>
    <div class="d-flex align-items-center border-bottom border-2 mb-3">
      <div class="me-auto">
        <h4 class="mb-2">
          <span class="badge text-bg-secondary">閒聊</span>
        </h4>
        <p class="mb-3">工作心得 31歲離職我才明白：工作不是用來討生活，而是為了好好生活！</p>
      </div>
      <button class="btn article-btn">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-bookmark"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"
          />
        </svg> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-bookmark-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
          />
        </svg>
      </button>
    </div>

    <div class="d-flex align-items-center border-bottom border-2 mb-3">
      <div class="me-auto">
        <h4 class="mb-2">
          <span class="badge text-bg-secondary">YouTuber</span>
        </h4>
        <p class="mb-3">稅捐處「彭家軍」首謀抓到 作弊程式近九成獎他拿走</p>
      </div>
      <button class="btn article-btn">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-bookmark"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"
          />
        </svg> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-bookmark-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.article-btn {
  &:active {
    border-color: #040811;
  }
}
</style>
