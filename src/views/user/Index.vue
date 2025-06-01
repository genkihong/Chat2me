<script setup></script>

<template>
  <section class="bg-dark vh-100">
    <div class="container">
      <div class="row">
        <!-- side menu -->
        <div class="col-lg-2 d-none d-lg-block">
          <div class="list-group rounded-0">
            <router-link to="/user/profile" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/wall.png"
                class="me-2"
                alt="profile"
                width="24"
                height="24"
              />
              <span class="align-middle">我的個人牆</span>
            </router-link>
            <router-link to="/user/message" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/comment.png"
                class="me-2"
                alt="message"
                width="24"
                height="24"
              />
              <span class="align-middle">我的訊息</span>
            </router-link>
            <router-link to="/user/follow" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/followed.png"
                class="me-2"
                alt="followed"
                width="24"
                height="24"
              />
              <span class="align-middle">我的追蹤</span>
            </router-link>
            <router-link to="/user/favorite" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/bookmark-outline.png"
                class="me-2"
                alt="favorite"
                width="24"
                height="24"
              />
              <span class="align-middle">我的收藏</span>
            </router-link>
            <router-link to="/user/settings" class="list-group-item list-group-item-action p-3">
              <img
                src="@/assets/images/setting.png"
                class="me-2"
                alt="settings"
                width="24"
                height="24"
              />
              <span class="align-middle">個人設定</span>
            </router-link>
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

<style lang="scss" scoped></style>
