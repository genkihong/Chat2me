<script setup></script>

<template>
  <section class="bg-dark" style="min-height: 100vh">
    <div class="container">
      <div class="row">
        <!-- side menu -->
        <div class="col-lg-2 d-none d-lg-block">
          <div class="list-group rounded-0 sidemenu position-sticky">
            <RouterLink to="/user/profile" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/wall.png"
                class="me-2"
                alt="profile"
                width="24"
                height="24"
              />
              <span class="align-middle">我的個人牆</span>
            </RouterLink>
            <!-- <RouterLink to="/user/message" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/comment.png"
                class="me-2"
                alt="message"
                width="24"
                height="24"
              />
              <span class="align-middle">我的訊息</span>
            </RouterLink> -->
            <RouterLink to="/user/follow" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/followed.png"
                class="me-2"
                alt="followed"
                width="24"
                height="24"
              />
              <span class="align-middle">我的追蹤</span>
            </RouterLink>
            <RouterLink to="/user/favorite" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/bookmark-outline.png"
                class="me-2"
                alt="favorite"
                width="24"
                height="24"
              />
              <span class="align-middle">我的收藏</span>
            </RouterLink>
            <RouterLink to="/user/settings" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/setting.png"
                class="me-2"
                alt="settings"
                width="24"
                height="24"
              />
              <span class="align-middle">個人設定</span>
            </RouterLink>
          </div>
        </div>
        <!-- user page -->
        <div class="col-lg-10 py-3">
          <RouterView />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sidemenu {
  top: 60px;
}
</style>
